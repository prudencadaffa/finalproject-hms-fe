import React from "react";
import { useState } from "react";
import "./sidebar.css"
import {NavLink} from "react-router-dom"

export default function MenuItem(props) {
  const { name, subMenus, icon, to, iconOpened} = props;
  const [expand, setExpand] = useState(false)

  return (
    <li onClick={props.onClick}>
      <NavLink exact to={to} onClick={()=>  setExpand(!expand)} className="sidebarListItem">
        <img src={icon} className="sidebarIcon" alt="" />
        <span>{name}</span>
        <img src={iconOpened} className="dropdownIcon" alt=""/>
      </NavLink>
      {subMenus && subMenus.length > 0 ? (
        <ul className={`subList ${expand ? "active" : ""}`}>
            {subMenus.map((menu, index) => (
                <li key={index}>
                    <NavLink to={menu.to} >{menu.name}</NavLink>
                </li>
            ))}
        </ul>
      ) : null}
    </li>
  );
};
