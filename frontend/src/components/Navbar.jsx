import { Link, NavLink } from "react-router-dom";
import { SiGooglehome } from "react-icons/si"; // Home icon
import { BsCollectionFill } from "react-icons/bs"; // Shopping bag icon
import { SiAtlassian } from "react-icons/si"; // Info icon for About
import { SiMaildotcom } from "react-icons/si";
import { FaRegWindowClose } from "react-icons/fa";


const navItems = [
  { to: "/", label: "Home", icon: <SiGooglehome /> },
  {
    to: "/collection",
    label: "Collection",
    icon: <BsCollectionFill />,
  },
  { to: "/about", label: "About", icon: <SiAtlassian /> },
  {
    to: "mailto:inquiries.codeatusman@gmail.com",
    label: "Contact",
    icon: <
      SiMaildotcom />,
  },
];

const Navbar = ({ containerStyles, toggleMenu, menuOpened }) => {
  return (
    <nav className={containerStyles}>
      {/* Close Button Inside Navbar */}
      {menuOpened && (
        <>
          <FaRegWindowClose
            onClick={toggleMenu}
            className={"text-2xl self-end cursor-pointer relative left-8 text-secondary"}
          />
          {/* Logo */}
          <Link to="/" className="bold-24 mb-10">
            <h4>
              Shop<span className="text-secondary">pire</span>
            </h4>
          </Link>
        </>
      )}
      {navItems.map(({ to, label, icon }) => (
        <div key={label} className="inline-flex">
          <NavLink
            to={to}
            className={({ isActive }) =>
              isActive
                ? "active-link flexCenter gap-x-2"
                : "flexCenter gap-x-2 "
            }
            onClick={menuOpened && toggleMenu} // Close menu when link is clicked
          >
            {icon}
            <h5 className="medium-16">{label}</h5>
          </NavLink>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
