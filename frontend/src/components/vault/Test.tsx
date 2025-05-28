import PasswordStrengthChecker from "../../ui/PasswordStrength"
import GeneratePassword from "./GeneratePassword"


function Test() {
  return (
    <div className="bg-gray-50 flex w-full h-fit gap-4">
      <GeneratePassword/>
      <PasswordStrengthChecker/>
    </div>
  )
}

export default Test
