import { IoIosArrowDown } from "react-icons/io";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const SubMenu = ({ data }) => {
  const { pathname } = useLocation();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  return (
    <>
      <li
        className={`link ${pathname.includes(data.name) && "active"}`}
        onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
      >
        <data.icon size={23} className="min-w-max" />
        <p className="flex-1">{data.name}</p>
        <IoIosArrowDown
          className={`${isSubMenuOpen ? "rotate-180" : "rotate-0"}`}
        />
      </li>
      <motion.ul
        animate={isSubMenuOpen ? { height: "fit-content" } : { height: 0 }}
        className="flex flex-col gap-1 pl-14 text-[0.8rem] font-normal overflow-hidden"
      >
        {data.menus.map((menu) => (
          <li key={menu}>
            <NavLink
              to={`/${data.name}/${menu}`}
              className="link !bg-transparent"
            >
              {menu}
            </NavLink>
          </li>
        ))}
      </motion.ul>
    </>
  );
};

export default SubMenu;
