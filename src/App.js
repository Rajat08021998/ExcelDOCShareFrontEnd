import { useState } from "react";
import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import About from "./Components/About.js";
import Card from "./Components/Card";
import Contact from "./Components/Contact.js";
import EditUpdatePage from "./Components/editUpdatePage";
import LoginForm from "./Components/login";
import ForgetPassword from "./Components/login/ForgetPassword";
import RegisterForm from "./Components/login/RegisterForm";
import Main from "./Components/Main.js";
import PageNotFound from "./Components/PageNotFound.js";
import FormDialog from "./Components/popupBox";
import SideBar from "./Components/SideBar";
import ViewDocList from "./Components/viewDocList";
import SharedUserEdit from "./Components/viewDocList/SharedUserEdit";
import SharedUserView from "./Components/viewDocList/SharedUserView";
import { socket, SocketContext } from "./socket/socket";
import UpdateTableData from "./Components/updateTableData";
import History from "./Components/history";
const App = () => {
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   let unmounted = false;
  //   if (!unmounted) {
  //     setSocket(io("http://localhost:5000"));
  //     // console.log("test====>", socket.on("firstEvent", (msg) => {
  //     //   console.log("MSG===>", socket.id,socket, msg);
  //     // }));

  //   }
  //   return () => {
  //     unmounted = true
  //   }
  // }, [])

  // useEffect(() => {
  //   let unmounted = false;
  //   let obj = localStorage.getItem("LoginUser");
  //   let userObj = JSON.parse(obj);

  //   if (!unmounted  && userObj && userObj.loggedIn === true && userObj.userId) {
  //     setUser(userObj.userId)
  //     socket?.emit("newUser", userObj.userId)
  //   }
  //   return () => {
  //     unmounted = true
  //   }
  // }, [socket, user, localStorage])

  return (
    <>
      <div className="AppClass">
        <header className="App-header">
          <SocketContext.Provider value={socket}>
            <SideBar />
          </SocketContext.Provider>
        </header>
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/forgotPassword" component={ForgetPassword} />
          <Route exact path="/add" component={Main} />
          <SocketContext.Provider value={socket}>
            <Route path="/view" component={ViewDocList} />
            <Route exact path="/sharedView" component={SharedUserView} />
            <Route exact path="/sharedEdit" component={SharedUserEdit} />
            <Route exact path="/updateTable/:id" component={UpdateTableData} />
            <Route exact path="/history" component={History} />
            <Route exact path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </SocketContext.Provider>
          <Route path="/edit" component={EditUpdatePage} />{" "}
          {/* <Route path="/card" component={Card}  /> */}
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </>
  );
};

export default App;
