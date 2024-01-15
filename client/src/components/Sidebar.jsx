import { motion } from "framer-motion";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";

// react icons
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineAppstore } from "react-icons/ai";
import { GrDocumentUser } from "react-icons/gr";
import { LiaUserNurseSolid } from "react-icons/lia";
import { PiUsersThree } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";

import SubMenu from "./SubMenu";

const Sidebar = () => {
  const sidebar_animation_obj = {
    open: {
      width: "16rem",
      transition: {
        damping: 40,
      },
    },
    closed: {
      width: "4rem",
      transition: {
        damping: 40,
      },
    },
  };

  const [isOpen, setIsOpen] = useState(true);

  const subMenuList = [
    {
      name: "Bookings",
      icon: GrDocumentUser,
      menus: ["Bookings Form", "All Bookings"],
    },
    {
      name: "Nurses",
      icon: LiaUserNurseSolid,
      menus: ["Nurse Form", "Nurse Action"],
    },
    {
      name: "Patients",
      icon: PiUsersThree,
      menus: ["Patient Form", "Patient Action"],
    },
  ];

  return (
    <div>
      <motion.div
        variants={sidebar_animation_obj}
        animate={isOpen ? "open" : "closed"}
        className="w-[16rem] max-w-[16rem] z-[999] bg-white shadow-xl text-gray h-screen overflow-hidden md:relative fixed"
      >
        {/* control button */}
        <motion.div
          animate={isOpen ? { x: 0, rotate: 0 } : { x: -10, rotate: 180 }}
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-2 cursor-pointer w-fit h-fit z-50 md:block hidden"
        >
          <IoIosArrowBack size={25} />
        </motion.div>

        {/* menu items */}
        <div className="flex flex-col h-full mt-2">
          <ul className="whitespace-pre px-2.5 py-5 text-[0.9rem] flex flex-col gap-1 font-medium overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100">
            <li>
              <NavLink to={"/"} className="link">
                <AiOutlineAppstore size={23} className="min-w-max" />
                Dashboard
              </NavLink>
            </li>
            {subMenuList.map((menuItem, index) => (
              <SubMenu data={menuItem} key={index} />
            ))}
            <NavLink to={"/settings"} className="link">
              <IoSettingsOutline size={23} className="min-w-max" />
              Settings
            </NavLink>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
