import HomeComponent from ".";
import Sidebar from "./SideBar";
import "./Main.css"

const  Main=(props)=> {
    return (
      <div >
        <HomeComponent {...props}/>
      </div>
    );
  }
  
  export default Main;
  