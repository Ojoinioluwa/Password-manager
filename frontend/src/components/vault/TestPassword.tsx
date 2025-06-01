import PasswordStrengthChecker from "../../ui/PasswordStrength";
import GeneratePassword from "./GeneratePassword";

function Test() {
  return (
    <div className="bg-gray-100 flex flex-col  lg:flex-row gap-4 w-full h-fit">
      <GeneratePassword />
      <PasswordStrengthChecker />
    </div>
  );
}

export default Test;
