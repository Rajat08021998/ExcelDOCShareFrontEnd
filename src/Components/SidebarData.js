import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { ReactComponent as Excel } from "./../images/excelIcon.svg";
import { ReactComponent as History } from "./../images/update.svg";

export const SidebarData = [
  {
    title: "DashBoard",
    path: "/view",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Shared Doc as View",
    path: "/sharedView",
    icon: <Excel style={{ fill: "white" }} />,
  },
  {
    title: "Shared Doc as Edit",
    path: "/sharedEdit",
    icon: <Excel style={{ fill: "white" }} />,
  },
  {
    title: "History",
    path: "/history",
    icon: <History style={{ fill: "white" }} />,
  },
  {
    title: "About Us",
    path: "/about",
    icon: <IoIcons.IoMdHelpCircle />,
  },
  {
    title: "Contact",
    path: "/contact",
    icon: <FaIcons.FaPhone />,
  },
];
