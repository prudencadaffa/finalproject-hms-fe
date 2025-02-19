import React, { useEffect } from "react";
import "./sidebar.css";
import MenuIcon from "@material-ui/icons/Menu";
import { useState } from "react";
import MenuItem from "./MenuItem";

const menuItems = [
  {
    name: "Dashboard",
    to: "/",
    exact: true,
    icon: "/assets/img/icon/HomeIcon.png",
  },
  {
    name: "Patients",
    to: `/patients`,
    icon: "/assets/img/icon/patientIcon.png",
  },
  { name: "Doctors", to: `/doctors`, icon: "/assets/img/icon/doctorIcon.png" },
  {
    name: "Manage",
    to: `#`,
    icon: "/assets/img/icon/manageIcon.png",
    iconOpened: "/assets/img/icon/dropdown.png",
    subMenus: [
      { name: "Doctor Schedule", to: `/manage/drschedule` },
      { name: "Patient Schedule", to: `/manage/patientschedule` },
      { name: "Outpatient Session", to: `/manage/outpatient` },
    ],
  },
  {
    name: "FAQ",
    to : `/faq`,
    icon : "/assets/img/icon/faq.png",
  }
];

const Sidebar = (props) => {
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    if (inactive) {
      document.querySelectorAll(".subList").forEach((el) => {
        el.classList.remove("active");
      });
    }
    props.onCollapse(inactive);
  }, [inactive]);

  return (
    <div className={`sidebar ${inactive ? "inactive" : ""}`}>
      <div className="sidebarWrapper">
        <div className="toggle-menu-btn" onClick={() => setInactive(!inactive)}>
          <MenuIcon />
        </div>
      </div>
      <div className="sidebarMenu">
        <ul className="sidebarList">
          {menuItems.map((menuItem, index) => (
            <MenuItem
              key={index}
              name={menuItem.name}
              to={menuItem.to}
              exact={menuItem.exact}
              subMenus={menuItem.subMenus || []}
              icon={menuItem.icon}
              iconOpened={menuItem.iconOpened}
              onClick={() => {
                if (inactive) {
                  setInactive(false);
                }
              }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
