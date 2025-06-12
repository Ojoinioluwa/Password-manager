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
  salt: string; // salt passed as hex string
}): Promise<CryptoKey> {
  const { masterSecret, userId, salt } = params;

  if (!masterSecret) {
    throw new Error("masterSecret must be a non-empty string");
  }
  if (!salt || salt.length < 32) { // 32 hex chars = 16 bytes
    throw new Error("salt must be a hex string of at least 32 characters");
  }
  if (!userId.trim()) {
    throw new Error("userId must be a non-empty string");
  }

  // Convert hex string salt to Uint8Array
  const saltBytes = new Uint8Array(hex2ab(salt));
  if (saltBytes.byteLength < 16) {
    throw new Error("salt Uint8Array must be at least 16 bytes");
  }

  const encoder = new TextEncoder();

  const masterKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(masterSecret),
    { name: 'HKDF' },
    false,
    ['deriveKey']
  );

  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: 'HKDF',
      hash: 'SHA-256',
      salt: saltBytes,
      info: encoder.encode(userId),
    },
    masterKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );

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
