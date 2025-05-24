// Convert string to Uint8Array (ArrayBuffer view)
function str2ab(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

// Convert ArrayBuffer to hex string
function ab2hex(buffer: ArrayBufferLike): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Convert hex string to ArrayBuffer
function hex2ab(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  return bytes.buffer;
}

export async function generateUserKey(params: {
  masterSecret: string;
  userId: string;
  salt: Uint8Array; // Expect salt as a raw byte array, not a string
}): Promise<CryptoKey> {
  const { masterSecret, userId, salt } = params;

  // Input validation
  if (!masterSecret.trim()) {
    throw new Error("masterSecret must be a non-empty string");
  }
  if (!(salt instanceof Uint8Array) || salt.byteLength < 16) {
    throw new Error("salt must be a Uint8Array of at least 16 bytes");
  }
  if (!userId.trim()) {
    throw new Error("userId must be a non-empty string");
  }

  const encoder = new TextEncoder();

  let masterKey: CryptoKey;
  try {
    // Import the master secret as HKDF input keying material
    masterKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(masterSecret), // consider pre-hashing if masterSecret is a passphrase
      { name: 'HKDF' },
      false,
      ['deriveKey']
    );
  } catch (err: any) {
    throw new Error(`Failed to import masterSecret for HKDF: ${err.message}`);
  }

  let derivedKey: CryptoKey;
  try {
    derivedKey = await crypto.subtle.deriveKey(
      {
        name: 'HKDF',
        hash: 'SHA-256',
        salt: salt,                   // raw random bytes
        info: encoder.encode(userId), // context info
      },
      masterKey,
      { name: 'AES-GCM', length: 256 },
      false,                           // mark as non-extractable unless you need to export it
      ['encrypt', 'decrypt']
    );
  } catch (err: any) {
    throw new Error(`Failed to derive AES-GCM key: ${err.message}`);
  }

  return derivedKey;
}



export async function encrypt(params: { password: string; key: CryptoKey }): Promise<{ iv: string; data: string }> {
  const { password, key } = params;
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encoded = str2ab(password);

  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    encoded
  );

  return {
    iv: ab2hex(iv.buffer),
    data: ab2hex(encrypted),
  };
}

export async function decrypt(params: { encryptedHex: string; key: CryptoKey; ivHex: string }): Promise<string> {
  const { encryptedHex, key, ivHex } = params;
  const iv = new Uint8Array(hex2ab(ivHex));
  const encrypted = hex2ab(encryptedHex);

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv,
    },
    key,
    encrypted
  );

  return new TextDecoder().decode(decrypted);
}
