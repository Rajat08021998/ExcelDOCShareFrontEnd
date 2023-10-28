import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ReactComponent as Register } from "./../../images/addUser.svg";
import { getApiUrl } from "../../apiUtils";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "150px",
    alignItems: "center",
    justifyContent:"center",
    padding: "20px",
    marginTop: "50px",
    marginLeft:"80px"
  },
  textField: {
    marginBottom: "10px",
  },
  button: {
    marginTop: "10px",
  },
}));

const apiUrl = getApiUrl();
function RegisterForm(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(`Email: ${email}, Password: ${password} UserId: ${userId}, DOB: ${dob}`);
    const body = {
      userId:userId,
      password:password,
      email:email,
      dob:dob,
    };
    if (
      body.userId && body.password
    ) {
      axios
        .post(`${apiUrl}/register`, body).then(res=>res.data)
        .then((res) => {
          if (res.status === "success" && res.result) {
            // console.log("===========>data",res.result);
            localStorage.setItem("LoginUser",JSON.stringify({userId:res.result.USERID,loggedIn:true,loggedOn:new Date()}))
            alert("Registraton Successful");
            history.push("/view");
          } else {
            localStorage.setItem("LoginUser",JSON.stringify({userId:null,loggedIn:false,loggedOn:new Date()}))
            alert("Registraton Unsuccessful! Enter ID already Exist");
          }
        })
        .catch((err) => alert("Something went wrong" + err));
    } else {
      alert("No Data to Save");
    }
  };

  return (
    <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      alignItems:"center",
      justifyContent:"center",
      marginTop:"100px",
      "& > :not(style)": {
        m: 1,
        alignContent: "center",
        width: "400px",
        height: "500px",
      },
    }}
    >
      <Paper elevation={3}>
      <IconButton
          aria-label="Register"
          title="Register"
          // onClick={(e) => {
          //   handleDelete(i._id);
          // }}
        >
          <Register />
          Register
        </IconButton>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            className={classes.textField}
            label="Email"
            variant="outlined"
            size="small"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="User Id"
            variant="outlined"
            size="small"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="D.O.B."
            variant="outlined"
            size="small"
            
            value={dob}
            onChange={(event) => setDob(event.target.value)}
          />
          <TextField
            className={classes.textField}
            label="Password"
            variant="outlined"
            size="small"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          

          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
          >
            Register
          </Button>
          <p>
            Already Sign Up?
            <span
              variant="outlined"
              style={{ color: "blue", cursor: "pointer" }}
              onClick={(e) => {
                history.push("/login");
              }}
            >
              Login
            </span>
          </p>
          
        </form>
      </Paper>
    </Box>
  );
}

export default RegisterForm;
