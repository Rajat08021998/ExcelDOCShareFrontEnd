import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom";
import { ReactComponent as Login } from "./../../images/user.svg";
import axios from "axios";
import { getApiUrl } from "../../apiUtils";

const apiUrl = getApiUrl();
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

function ForgetPassword(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [dob, setDob] = useState("");
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(`Email: ${email}, DOB: ${dob}`);
    const body = {
      userId: userId,
      email:email,
      dob: dob,
    };
    if (body.userId && body.email && body.dob) {
      axios
        .post(`${apiUrl}/login`, body)
        .then((res) => res.data)
        .then((res) => {
          if (res.status === "success" && res.result) {
            // console.log("===========>data", res.result);
            localStorage.setItem(
              "LoginUser",
              JSON.stringify({
                userId: res.result.USERID,
                loggedIn: true,
                loggedOn: new Date(),
              })
            );
            alert("Login Successful");
            history.push("/view");
          } else {
            localStorage.setItem(
              "LoginUser",
              JSON.stringify({
                userId: null,
                loggedIn: false,
                loggedOn: new Date(),
              })
            );
            alert("Login Unsuccessful! Please Enter Valid UserId,Email Id and D.O.B. ");
          }
        })
        .catch((err) => alert("Something went wrong" + err));
    } else {
      alert("Please Enter the Value in the Fields");
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
        height: "400px",
      },
    }}
    >
      <Paper elevation={3}>
      <IconButton
          aria-label="Forget Password"
          title="Forget Password"
          // onClick={(e) => {
          //   handleDelete(i._id);
          // }}
        >
          <Login />
          Forget Password
        </IconButton>
        <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
            className={classes.textField}
            label="UserId"
            variant="outlined"
            size="small"
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
          />
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
            label="DOB"
            variant="outlined"
            size="small"
            value={dob}
            onChange={(event) => setDob(event.target.value)}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
          >
            Login
          </Button>
          <p>
            New User?
            <span
              variant="outlined"
              style={{ color: "blue", cursor: "pointer" }}
              onClick={(e) => {
                history.push("/register");
              }}
            >
              Register
            </span>
          </p>
        </form>
      </Paper>
    </Box>
  );
}

export default ForgetPassword;
