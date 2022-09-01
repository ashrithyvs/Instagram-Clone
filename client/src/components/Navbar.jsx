import React from "react";
import { InstagramLogo } from "../assets";
import { HiHome } from "react-icons/hi";
import { RiMessengerLine } from "react-icons/ri";
import { MdOutlineAddBox } from "react-icons/md";
import { ImCompass2 } from "react-icons/im";
import { FiHeart } from "react-icons/fi";
function Navbar() {
  function toggleModal(modalID) {
    document.getElementById(modalID).classList.toggle("hidden");
    // document.getElementById(modalID + "-backdrop").classList.toggle("hidden");
    // document.getElementById(modalID).classList.toggle("flex");
    // document.getElementById(modalID + "-backdrop").classList.toggle("flex");
  }
  return (
    <div className="bg-[#fff] border-[0.25px] border-slate-200 shadow-md mx-auto w-full px-6 py-2">
      <div className="lg:w-4/5 lg:mx-auto w-full flex justify-between  items-center">
        <img
          src={InstagramLogo}
          className="w-1/3 mx-auto xs:w-[120px]"
          alt="Instagram Logo"
        />
        <div className="flex  justify-around items-center px-6 lg:w-4/6">
          <input
            placeholder="Search"
            className="hidden sm:block custom-input"
          />
          <div className="hidden xs:flex space-x-5 pl-6">
            <HiHome size={28} className="navbar-icon" />
            <RiMessengerLine size={28} className="navbar-icon" />
            <MdOutlineAddBox
              onClick={() => {
                toggleModal("create-post");
              }}
              size={28}
              className="navbar-icon"
            />
            <FiHeart size={28} className="navbar-icon" />
            <ImCompass2 size={27} className="navbar-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
