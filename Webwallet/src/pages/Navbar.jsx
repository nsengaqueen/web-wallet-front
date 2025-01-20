import React, { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json"

const IconCreditCard = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 animate-bounce"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <line x1="2" y1="10" x2="22" y2="10" />
  </svg>
);

const SignUpModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Form submitted:", formData);

    setSuccessMessage("Registered successfully!");
    setTimeout(() => {
      setSuccessMessage("");
      onClose();
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Your Account
        </h2>

        {successMessage && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FADADD] text-gray-800 py-2 rounded-lg hover:bg-pink-200 transition-all font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-pink-500 hover:text-pink-600">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-lg p-6 hover:shadow-lg transition-all">
    <div className="space-y-4">
      <Icon />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const LandingPage = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const features = [
    {
      icon: IconCreditCard,
      title: "Track All Transactions",
      description:
        "Monitor all incoming and outgoing transactions across your bank accounts, mobile money, and cash in real-time.",
    },
    {
      icon: IconCreditCard,
      title: "Budget Effectively",
      description:
        "Set budgets and track your expenses against your financial goals seamlessly.",
    },
    {
      icon: IconCreditCard,
      title: "Analyze Spending",
      description:
        "Gain insights with detailed analytics on your spending patterns to make informed decisions.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 scroll-smooth">
      {/* Navbar */}
      <nav className="bg-[#FADADD] text-gray-800 shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-semibold hover:text-pink-500 transition-all"
          >
            <span className="text-pink-500">Wallet</span>App
          </a>

          <div className="flex items-center space-x-6">
            <a
              href="#features"
              className="text-gray-800 hover:text-pink-500 transition-all"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-800 hover:text-pink-500 transition-all"
            >
              About
            </a>
            <a
              href="/login"
              className="bg-[#f0b6bc] hover:bg-pink-200 font-bold px-6 py-2 rounded-full transition-all"
            >
              Login
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Animation */}
      <div className="pt-24 pb-12 px-6 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left order-2 md:order-1">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Take Control of Your Finances
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              Track, budget, and analyze your spending across all your accounts
              in one place. Make smarter financial decisions with WalletApp.
            </p>
            <button
              onClick={() => setIsSignUpOpen(true)}
              className="bg-[#FADADD] text-gray-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-200 transition-all inline-block"
            >
              Get Started Free
            </button>
          </div>

          {/* Lottie Animation */}
          <div className="order-1 md:order-2 flex justify-center items-center">
            <Lottie
              animationData={animationData}
              loop={true}
              autoplay={true}
              className="w-full max-w-md"
              style={{ height: "400px" }}
            />
          </div>
        </div>
      </div>

      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
      />

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="bg-pink-60 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold">Step 1</h3>
              <p>Sign up for a free account in minutes.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Step 2</h3>
              <p>Connect your accounts and set budgets.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Step 3</h3>
              <p>Track, analyze, and make better decisions.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#FADADD] text-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Wallet</h3>
            <p>
              Smart financial management for everyone. Track, budget, and grow
              your wealth.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Related Links</h3>
            <div className="space-y-2">
              <p>
                <a href="/help" className="hover:text-gray-600">
                  Help (FAQ)
                </a>
              </p>
              <p>
                <a href="/blog" className="hover:text-gray-600">
                  Blog
                </a>
              </p>
              <p>
                <a href="/contact" className="hover:text-gray-600">
                  Contact
                </a>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Resources</h3>
            <div className="space-y-2">
              <p>
                <a href="/privacy" className="hover:text-gray-600">
                  Privacy Policy
                </a>
              </p>
              <p>
                <a href="/partners" className="hover:text-gray-600">
                  Partner Directory
                </a>
              </p>
              <p>
                <a href="/affiliate" className="hover:text-gray-600">
                  Affiliate Program
                </a>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p>+25078890408</p>
              <p>Eric@gmail.com</p>
              <p>KG 15 Av, Kigali, Rwanda</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} WalletApp. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
