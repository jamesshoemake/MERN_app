import React from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";

import jwt_decode from "jwt-decode";

import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import Input from "./Input";
import { signin, signup } from "../../actions/auth";
import useStyles from "./styles";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const Auth = () => {
  const user = false;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [formData, setFormData] = React.useState(initialState);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSignup, setIsSignup] = React.useState(false);
  const history = useHistory();

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const data = jwt_decode(res.credential);

    history.push("/");
    try {
      dispatch({ type: "AUTH", data });
    } catch (error) {
      console.log(error.message);
    }
  };

  const googleFailure = (error) => {
    console.log("Google Sign In unsuccessful", error);
  };

  React.useEffect(() => {});

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
              type={showPassword ? "text" : "password"}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign in"}
          </Button>
          <div id="signInDiv">
            {user ? (
              <div>Logged In</div>
            ) : (
              <GoogleLogin
                render={(renderProps) => (
                  <Button
                    className={classes.googleButton}
                    color="primary"
                    fullWidth
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    variant="contained"
                  >
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onError={googleFailure}
              />
            )}
          </div>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have account? Sign in"
                  : "No account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
