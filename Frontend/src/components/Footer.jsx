import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className=" mx-auto  pt-2 flex flex-col items-center justify-center gap-2 lg:shadow-md lg:flex-row lg:justify-between lg:px-10 font-bold">
      <p>&copy; 2024 Blinkit. All rights reserved.</p>

      <ul className="flex  gap-3">
        <li>About</li>
        <li>Help</li>
        <li>Contact</li>
      </ul>

      <div className=" flex gap-4 text-2xl ">
        <a
          href="https://www.facebook.com/BlinkitApp/"
          className="hover:text-primary-100"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.instagram.com/blinkitapp/"
          className="hover:text-primary-100"
        >
          <FaInstagram />
        </a>
        <a href="#" className="hover:text-primary-100">
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
