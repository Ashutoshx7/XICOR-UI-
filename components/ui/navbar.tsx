"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full flex flex-col items-center relative">
      {/* Top Navbar */}
      <nav className="w-full bg-black text-white py-4 flex justify-center relative z-20">
        <ul className="flex space-x-8 font-medium items-center">
         
          <li><Link href="#">Pricing</Link></li>
        

          <li>
            <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">R</span>
            </div>
          </li>

          <li><Link href="#">Blog</Link></li>
          <li><Link href="#">Contact</Link></li>

          <li>
            <Link
              href="#"
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full text-white font-semibold shadow-md hover:scale-105 transition"
            >
              Log In
            </Link>
          </li>
        </ul>
      </nav>

      {/* Bottom Gradient Bar */}
      <div className="relative w-full h-14 bg-gradient-to-r from-indigo-200 via-blue-200 to-indigo-200">
        <svg
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-[500px] h-[140px] z-10"
          viewBox="0 0 500 140"
          preserveAspectRatio="none"
        >
          <path
            d="M0,140 C120,0 380,0 500,140 L500,140 L0,140 Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );
}
