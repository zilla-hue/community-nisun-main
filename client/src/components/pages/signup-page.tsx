import Input from "@/animate/Input";
import PasswordStrengthMeter from "@/animate/PasswordStrength";
import { useUser } from "@/api/user.api";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Loader, Lock, Mail, Phone, User } from "lucide-react";
import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";


const SignUpPage: React.FC = () => {
  const { toast } = useToast()
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [privacyPolicyAccepted, setprivacyPolicyAccepted] = useState<boolean>(false);
  const navigate = useNavigate();

  const { signup, error, isLoading } = useUser();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!termsAccepted || !privacyPolicyAccepted) {
      // Show error message
      return;
    }

    try {
      await signup(email, password, firstName, lastName, phoneNumber, termsAccepted, privacyPolicyAccepted);
      navigate("/");
    } catch (error) {
      // Error is already handled in the useUser hook
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden mt-20 mx-auto mb-20'
    >
      <div className='p-8'>
        <h2 className='text-3xl font-bold mb-6 text-center text-red-700 bg-clip-text'>
          Create Account
        </h2>

        <form onSubmit={handleSignUp}>
          <Input
            icon={User}
            type='text'
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            icon={User}
            type='text'
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            icon={Phone}
            type='text'
            placeholder='Phone Number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <Input
            icon={Mail}
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Lock}
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className='text-red-500 font-semibold mt-2'>{error}</p>}
          <PasswordStrengthMeter password={password} />

          <div className='mt-4'>
            <label className='flex items-center mb-3'>
              <input
                type='checkbox'
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className='hidden'
              />
              <span
                className={`h-4 w-4 border-2 rounded mr-2 flex items-center justify-center ${termsAccepted ? 'bg-green-600 border-transparent' : 'border-gray-300'
                  }`}
              >
                {termsAccepted && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.293 9.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
              <span className='text-gray-300'>
                I accept the{" "}
                <Link to="/terms-and-conditions" className='text-red-400 hover:underline'>
                  Terms and Conditions
                </Link>
              </span>
            </label>
            <label className='flex items-center'>
              <input
                type='checkbox'
                checked={privacyPolicyAccepted}
                onChange={(e) => setprivacyPolicyAccepted(e.target.checked)}
                className='hidden'
              />
              <span
                className={`h-4 w-4 border-2 rounded mr-2 flex items-center justify-center ${privacyPolicyAccepted ? 'bg-green-600 border-transparent' : 'border-gray-300'
                  }`}
              >
                {privacyPolicyAccepted && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.293 9.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
              <span className='text-gray-300'>
                I accept the{" "}
                <Link to="/privacy-policy" className='text-red-400 hover:underline'>
                  Privacy Policy
                </Link>
              </span>
            </label>
          </div>

          <motion.button
            className='mt-5 w-full py-3 px-4 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
          </motion.button>
        </form>
      </div>
      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
        <p className='text-sm text-gray-400'>
          Already have an account?{" "}
          <Link to={"/auth/login"} className='text-red-400 hover:underline'>
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignUpPage;
