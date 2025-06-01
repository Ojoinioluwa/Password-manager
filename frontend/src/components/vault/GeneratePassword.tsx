import React, { useState } from "react";

const charset = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+[]{}|;:,.<>?",
};

function generatePassword(
  length: number,
  useUppercase: boolean,
  useLowercase: boolean,
  useNumbers: boolean,
  useSymbols: boolean
): string {
  let allowedChars = "";
  if (useLowercase) allowedChars += charset.lowercase;
  if (useUppercase) allowedChars += charset.uppercase;
  if (useNumbers) allowedChars += charset.numbers;
  if (useSymbols) allowedChars += charset.symbols;

  if (!allowedChars) return "";

  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);

  return Array.from(array, (x) => allowedChars[x % allowedChars.length]).join(
    ""
  );
}

const GeneratePassword: React.FC = () => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const handleGenerate = () => {
    const newPassword = generatePassword(
      length,
      includeUppercase,
      includeLowercase,
      includeNumbers,
      includeSymbols
    );
    setPassword(newPassword);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-2xl font-bold text-center">🔐 Password Generator</h2>

      <label className="block">
        Length: {length}
        <input
          type="range"
          min="6"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full"
        />
      </label>

      <div className="flex flex-col gap-3">
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          <span className="ml-2">Include Uppercase</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={(e) => setIncludeLowercase(e.target.checked)}
          />
          <span className="ml-2">Include Lowercase</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          <span className="ml-2">Include Numbers</span>
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          <span className="ml-2">Include Symbols</span>
        </label>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Generate Password
      </button>

      {password && (
        <div className="mt-4 bg-gray-100 p-3 rounded text-center font-mono break-all">
          <strong>Your Password:</strong> <br /> {password}
        </div>
      )}
    </div>
  );
};

export default GeneratePassword;
