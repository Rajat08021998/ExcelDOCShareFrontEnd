import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Box, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ReactComponent as Login } from "./../../images/user.svg";
import { getApiUrl } from "../../apiUtils";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "150px",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    marginTop: "50px",
    marginLeft: "80px",
  },
  textField: {
    marginBottom: "10px",
  },
  button: {
    marginTop: "10px",
  },
}));

const apiUrl = getApiUrl();
function LoginForm(props) {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(`Email: ${email}, Password: ${password}`);
    const body = {
      userId: email,
      password: password,
    };
    if (body.userId && body.password) {
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
            alert("Login Unsuccessful! Please Enter Valid Id and Password");
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
        alignItems: "center",
        justifyContent: "center",
        marginTop: "100px",
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
          aria-label="Login"
          title="Login"
          // onClick={(e) => {
          //   handleDelete(i._id);
          // }}
        >
          <Login />
          Login
        </IconButton>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            className={classes.textField}
            label="UserID"
            variant="outlined"
            size="small"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
          <p>
            <span
              variant="outlined"
              style={{ color: "blue", cursor: "pointer" }}
              onClick={(e) => {
                history.push("/forgotPassword");
              }}
            >
              Forgot Password
            </span>
          </p>
        </form>
      </Paper>
    </Box>
  );
}

export default LoginForm;
