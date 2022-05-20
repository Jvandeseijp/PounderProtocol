import React from 'react';
import  { useState } from 'react';
import { Link } from "react-router-dom";

function Header() {

  const [isActive, setActive] = useState("false");
  const handleToggle = () => {
    setActive(!isActive);
  };

  
  return (
    <div className="Header">
      <div className="w-full text-white bg-[#232323] dark-mode:text-gray-200 dark-mode:bg-gray-800">
        <div className="container mx-auto lg:max-w-5xl">
          <div
            x-data="{ open: false }"
            className="flex flex-col mx-auto md:items-center md:justify-between md:flex-row "
          >
            <div className="p-4 xl:pl-0 flex flex-row items-center justify-between">
              <Link
                to="/"
                className="text-lg font-semibold tracking-widest text-white uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
              >
                <img className="w-40" src="images/logo.svg" alt="" />
              </Link>
              <button className="md:hidden rounded-lg hover:scale-105 transition transform duration-500 focus:outline-none focus:shadow-outline" onClick={handleToggle} >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-6 h-6"
                >
                  <path
                    x-show="!open"
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                  {/* <path
                    x-show="open"
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  /> */}
                </svg>
              </button>
            </div>
            <nav className={isActive ? "flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row md:pr-0 pr-3" : "flex-col flex-grow pb-4 md:pb-0 flex md:flex md:justify-end md:flex-row  pr-3"}>
              <a
                className="px-4 py-2 text-gray-300 hover:text-white text-sm font-medium"
                href="https://pounder-protocol.gitbook.io/docs/" target="_blank"
              >
                Documentation
              </a>
              <a
                className="px-4 py-2 text-gray-300 hover:text-white text-sm font-medium"
                href="/#faqs"
              >
                FAQ's
                </a>
              <a
                className="px-4 py-2 text-gray-300 hover:text-white text-sm font-medium"
                href="https://discord.gg/4mTPwy9j4y" target="_blank"
              >
                Discord
              </a>
              <a
                className="px-4 py-2 text-gray-300 hover:text-white text-sm font-medium"
                href="https://t.me/PounderProtocol" target="_blank"
              >
                Telegram
              </a>
              <a href="https://github.com/KISHIELD/Audits/blob/main/KISHIELD_PounderProtocol_Audit_20220427.pdf" target="_blank" className="p-[1px] max-w-[150px] text-center bg-gradient-to-r from-[#6760CF] to-[#00CAA4] rounded-full bg-opacity-20 ml-4 md:mb-0 mb-3">
                <div className='bg-[#232323] px-5 py-1 rounded-3xl'>
                  <img src="/images/audit-btn-text.svg" className='w-[80px] mx-auto' />
                </div>
              </a>
              <Link
                to="/dashboard"
                className="text-white hover:text-white hover:no-underline hover:scale-105 transition transform duration-500 text-sm font-medium rounded-full px-4 py-2 ml-4 border border-white max-w-[150px]"
                style={{
                  background:
                    "linear-gradient(90deg, #992BD4 0%, #00CAA4 99.94%, #00CAA4 100.01%)",
                }}
              >
                Open Dashboard
              </Link>
              
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
