export async function deriveMasterSecretFromPassword(password: string, saltHex: string): Promise<string> {
    // Convert hex string to Uint8Array
    function hexToBytes(hex: string): Uint8Array {
        if (hex.length % 2 !== 0) {
            throw new Error("Invalid hex string");
        }
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < hex.length; i += 2) {
            bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
        }
        return bytes;
    }

    const saltBytes = hexToBytes(saltHex);

    // Encode password as ArrayBuffer
    const enc = new TextEncoder();
    const passwordBuffer = enc.encode(password);

    // Import password as a crypto key
    const key = await crypto.subtle.importKey(
        "raw",
        passwordBuffer,
        { name: "PBKDF2" },
        false,
        ["deriveBits"]
    );

    // Derive bits using PBKDF2
    const derivedBits = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt: saltBytes,
            iterations: 100_000,
            hash: "SHA-256",
        },
        key,
        256 // derive 256 bits = 32 bytes
    );

    // Convert derived bits to hex
    const derivedKeyBytes = new Uint8Array(derivedBits);
    const hexKey = Array.from(derivedKeyBytes)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    return hexKey;
}
