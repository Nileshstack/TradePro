"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaLinkedin, FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  const {  user } = useAuth();
  return (
    <footer className="bg-black text-gray-300">
 
     {!user && ( <div className="bg-blue-600 text-center py-12 rounded-b-3xl">
        <h2 className="text-3xl font-bold text-white mb-3">Ready to Start Trading?</h2>
        <p className="text-gray-100 mb-6">
          Join thousands of traders and start your journey to financial success.
        </p>
        <button className="bg-white text-blue-600 px-6 py-2 font-semibold rounded-md hover:bg-gray-200 transition">
          <Link href="/login">Sign Up Now</Link>
        </button>
      </div>)}

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
      
        <div>
          <p className="font-semibold mb-3">ABCD Tech Park, 3rd Floor</p>
          <p>Abch Road, Bangalore</p>
          <p>Bangalore - 560103</p>
          <a
            href="#"
            className="text-blue-400 hover:text-blue-500 mt-3 inline-block"
          >
            Contact Us
          </a>
          <div className="flex items-center gap-4 mt-4">
            <FaFacebook className="hover:text-white cursor-pointer" />
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaYoutube className="hover:text-white cursor-pointer" />
            <FaInstagram className="hover:text-white cursor-pointer" />
            <FaLinkedin className="hover:text-white cursor-pointer" />
            <FaTelegramPlane className="hover:text-white cursor-pointer" />
          </div>
        </div>

       
        <div>
          <h3 className="font-semibold text-white mb-3">Products</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Stocks</a></li>
            <li><a href="#" className="hover:text-white">Futures & Options</a></li>
            <li><a href="#" className="hover:text-white">IPO</a></li>
            <li><a href="#" className="hover:text-white">Mutual Funds</a></li>
          </ul>
        </div>

       
        <div>
          <h3 className="font-semibold text-white mb-3">Products</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Pricing</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Career</a></li>
            <li><a href="#" className="hover:text-white">Help & Support</a></li>
          </ul>
        </div>

       
        <div>
          <h3 className="font-semibold text-white mb-3">Products</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">AMC Mutual Funds</a></li>
            <li><a href="#" className="hover:text-white">Calculators</a></li>
            <li><a href="#" className="hover:text-white">Glossary</a></li>
            <li><a href="#" className="hover:text-white">TradePro Digest</a></li>
            <li><a href="#" className="hover:text-white">Help & Support</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
