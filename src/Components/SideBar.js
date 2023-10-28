import React, { useContext, useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { Alert, AlertTitle, Button, IconButton } from "@mui/material";
import { useEffect } from "react";
import { ReactComponent as View } from "./../images/notification.svg"
import "./SideBar.css";
import { SocketContext } from "../socket/socket";
import { positions, Stack } from "@mui/system";

const Nav = styled.div`
  background: lightseagreen;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: lightseagreen;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const SideBar = (props) => {
  const [sidebar, setSidebar] = useState(false);
  const history = useHistory()
  const socket = useContext(SocketContext)
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("LoginUser")))
  const [notifications, setNotifications] = useState([])
  const showSidebar = () => setSidebar(!sidebar);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("LoginUser")))
  }, [localStorage])

  useEffect(() => {
    socket.on("getNotification", data => {
      if (user && data && user.loggedIn === true) {
        if (data.receiverName && data.receiverName.length > 0) {
          let showNotificaton = data.receiverName.some(i=>i===user.userId);
          if(showNotificaton){
            setNotifications([data])
          }
        }
      }
      
    })
  }, [socket])

  const displayNotificaton = (obj) => {
    // console.log("====User", user, obj);
    if (user && obj && user.loggedIn === true) {
      if (obj.receiverName && obj.receiverName.length > 0) {
        let showNotificaton = obj.receiverName.some(i=>i===user.userId);
        // console.log("============notificationStatus",showNotificaton);
        return showNotificaton === true ? 
        <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert severity="info"  variant="filled"
          action={
            <Button color="inherit" size="small" onClick={(e)=>window.location.reload(true)}>
              Refresh
            </Button>
          }
        >
          
         <strong> {obj.message}</strong> 
        </Alert> </Stack>: <></>
      }
    }
  }

  const handleLogOut = () => {
    localStorage.setItem("LoginUser", JSON.stringify({ userId: null, loggedIn: false, loggedOn: new Date() }))
    setUser({ userId: null, loggedIn: false, loggedOn: new Date() })
    history.push("/")

  }
  console.log("=========Notification=====>", notifications);
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }} >
        <Nav>
          <NavIcon to="#">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <h1
            style={{ textAlign: "center", marginLeft: "200px", color: "white" }}
          >
            ExcelDocShare
          </h1>
          {/*           
          <Button style={{ position: "absolute", right: "18px" }} color="inherit" onClick ={props.login}>
          LogIn
        </Button> */}
          {/* <div className="icons">
            <div className="icon">
              <IconButton
                aria-label="Notification"
              // onClick={(e) => {
              //   handleLabelOpen();
              //   handleViewLabel(
              //     e,
              //     i.DOC_LABEL,
              //     index
              //   );
              // }}
              >
                <View title="View Label" style={{ fill: "white" }} />
                <div className="counter">2</div>
              </IconButton>

            </div>
          </div> */}
          <div className="notificatons">
            {notifications && notifications.map(i => {
              return displayNotificaton(i);
            })}
          </div>
        </Nav>
        {user && user.loggedIn === true ?
          <SidebarNav sidebar={sidebar}>
            <SidebarWrap>
              <NavIcon to="#">
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </NavIcon>
              {SidebarData.map((item, index) => {
                return <SubMenu item={item} key={index} />;
              })}
            </SidebarWrap>
          </SidebarNav> : <></>}
      </IconContext.Provider>
    </>
  );
};

export default SideBar;
