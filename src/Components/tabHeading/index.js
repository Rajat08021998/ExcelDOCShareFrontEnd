import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import "./index.css";

const useStyles = makeStyles(() => ({
  tabsHeadingContainer: {
    border: `1px solid green`,
    background: "lightseagreen",
    cursor: "pointer",
    "& .scrollableTabImageCell": {
      fill: "white",
      color: `purple !important`,
      height: "20px",
      width: "20px",
    },
    "& .scrollableTabs-textBox": {
      color: "white",
      fontWeight: "bold",
    },
  },
}));
const TabsHeading = ({
  icon,
  style,
  text,
  handleAction,
  styleOptions,
  ...props
}) => {
  const classes = useStyles();
  const StyleCell = icon;
  return (
    <div
      style={{ ...style }}
      onClick={props?.onClick ? props.onClick : () => {}}
      className={clsx(
        "scrollableTabs-container",
        classes.tabsHeadingContainer,
        props.className
      )}
    >
      <div
        style={styleOptions?.imageContainerStyle}
        className="scrollableTabs-imageBox"
      >
        <StyleCell
          style={styleOptions?.imageStyle}
          className={"scrollableTabImageCell"}
        />
      </div>
      <div
        style={styleOptions?.textContainerStyle}
        className="scrollableTabs-textBox"
        title={props.title ? props.title : ""}
      >
        {text}
      </div>
    </div>
  );
};

export default TabsHeading;
