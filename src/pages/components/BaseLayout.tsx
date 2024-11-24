import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import logo from "../../logo.svg";
import "../../App.css";

export const BaseLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { pathname } = useLocation();
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} className="h-8 w-8 mr-2" alt="logo" />
          <h1 className="text-xl font-bold">KH</h1>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => {
              setShowMobileMenu(!showMobileMenu);
            }}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          {showMobileMenu && (
            <nav className="absolute top-0 left-0 w-full bg-gray-900 text-white p-4 flex flex-col space-y-4">
              <button
                onClick={() => {
                  setShowMobileMenu(false);
                }}
                className="self-end text-white focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <Link to="/" className="hover:text-gray-400">
                Home
              </Link>
              <Link to="/files" className="hover:text-gray-400">
                Files
              </Link>
              <Link to="/system" className="hover:text-gray-400">
                System
              </Link>
            </nav>
          )}
        </div>

        <nav className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-gray-400">
            Home
          </a>
          <a href="#" className="hover:text-gray-400">
            About
          </a>
          <a href="#" className="hover:text-gray-400">
            Contact
          </a>
        </nav>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
};
export default BaseLayout;
