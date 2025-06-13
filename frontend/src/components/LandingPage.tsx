import KeyIcon from "@mui/icons-material/Key";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SecurityIcon from "@mui/icons-material/Security";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddBoxIcon from "@mui/icons-material/AddBox";
import GroupIcon from "@mui/icons-material/Group";
import { Link, useNavigate } from "react-router-dom";

// FeatureCard component, now styled with Tailwind CSS
const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  description: string;
  title: string;
  icon: React.ElementType;
}) => (
  <div className="bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl">
    {/* Material UI Icon rendered directly */}
    <Icon className="text-blue-400 mb-4" style={{ fontSize: 60 }} />
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter">
      {/* Header */}
      <header className="py-6 px-4 md:px-8 bg-gray-900 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-blue-500">
            Vaulter
          </a>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#features"
                  className="hover:text-blue-400 transition duration-200"
                >
                  Features
                </a>
              </li>
              <li>
                <Link
                  to="/Login"
                  className="hover:text-blue-400 transition duration-200"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/Register"
                  className="hover:text-blue-400 transition duration-200"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen bg-gradient-to-br from-purple-800 to-indigo-900 text-center py-20 px-4 overflow-hidden">
        {/* Background elements - Blobs */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 text-white drop-shadow-lg">
            Your Ultimate Password Manager. Secure. Simple. Smart.
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10">
            Effortlessly manage, secure, and share your credentials with peace
            of mind.
          </p>
          <button
            onClick={() => navigate("/Register")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
          >
            Get Started Free
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 md:px-8 bg-gray-900">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-12">
            Powerful Features for Uncompromised Security
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={AddBoxIcon}
              title="Add & Organize Passwords"
              description="Securely store all your passwords with custom notes and easy access."
            />
            <FeatureCard
              icon={GroupIcon}
              title="Create & Manage Groups"
              description="Organize your team or family members into secure groups for shared access."
            />
            <FeatureCard
              icon={PeopleAltIcon}
              title="Group Authorization"
              description="Grant entire groups access to specific passwords, simplifying team collaboration."
            />
            <FeatureCard
              icon={KeyIcon}
              title="User-Level Authorization"
              description="Finely control who can access which password on an individual basis."
            />
            <FeatureCard
              icon={SecurityIcon}
              title="Password Strength Tester"
              description="Instantly check the strength of your passwords and get recommendations for improvement."
            />
            <FeatureCard
              icon={FlashOnIcon}
              title="Advanced Password Generator"
              description="Generate strong, random, and unique passwords with customizable lengths and parameters."
            />
            <FeatureCard
              icon={VisibilityIcon}
              title="View Shared Passwords"
              description="Easily view passwords that other users have authorized for you, all in one place."
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        id="cta"
        className="py-20 px-4 md:px-8 bg-gradient-to-r from-blue-700 to-indigo-800 text-center"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience True Password Security?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of users who trust Vaulter to protect their digital
            lives. Get started in seconds.
          </p>
          <button
            onClick={() => navigate("/Register")}
            className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-4 px-10 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
          >
            Sign Up for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 bg-gray-900 text-center text-gray-400">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} Vaulter. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="hover:text-white mx-2">
              Privacy Policy
            </a>{" "}
            |
            <a href="#" className="hover:text-white mx-2">
              Terms of Service
            </a>
          </p>
        </div>
      </footer>

      {/* Custom CSS for blob animation and font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        @keyframes blob {
          0%, 100% {
            transform: translateY(0) scale(1) rotate(0deg);
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          33% {
            transform: translateY(-20px) scale(1.1) rotate(15deg);
            border-radius: 30% 70% 60% 40% / 40% 60% 30% 70%;
          }
          66% {
            transform: translateY(20px) scale(0.9) rotate(-15deg);
            border-radius: 70% 30% 40% 60% / 70% 40% 60% 30%;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
