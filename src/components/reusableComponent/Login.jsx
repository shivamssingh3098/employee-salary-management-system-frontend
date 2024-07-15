import React, { useContext, useState } from "react";

import axios from "axios";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AdminDataContext } from "./AdminContext";

const Login = ({}) => {
  const { setIsAuthenticated } = useContext(AdminDataContext);
  const [userDetails, setUserDetails] = useState({
    userName: "",
    password: "",
  });

  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpInput, setOtpInput] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    console.log(userDetails);
  };

  // const sendOtp = async (n) => {
  //   try {
  //     console.log("mob number ", n);
  //     const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
  //     const confirmation = await signInWithPhoneNumber(
  //       auth,
  //       `+91${n}`,
  //       recaptcha
  //     );
  //     console.log(confirmation);

  //     setUser(confirmation);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const verifyOtp = async () => {
  //   try {
  //     const res = await user.confirm(otp);
  //     console.log("OTP confirmation", res);

  //     const res2 = await axios.post(
  //       `/api/v1/users/otp-authentication/${userId}`
  //     );
  //     console.log("token created", res2);
  //     setIsAuthenticated(true);
  //     navigate("/");
  //     setOtpInput(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(`/api/v1/employee/login`, {
        ...userDetails,
      });

      console.log("Login ress", res);

      // console.log("token created", res2);

      navigate("/");

      localStorage.setItem("currentUser", res.data.user._id);

      setUserDetails({
        userName: "",
        password: "",
      });
    } catch (error) {
      alert("Invalid credentials");
      navigate("/login");
      console.log(error);
    }
  };

  const addressTxt = {
    width: { xs: "100%", sm: "80%" },

    borderRadius: "10px",
    color: "rgba(255, 255, 255, 0.96)",
    border: "1px solid black",
    "& fieldset": {
      border: "none",
      color: "rgba(255, 255, 255, 0.96);",
    },
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "center",
            //   flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid item xs={12} sm={8} md={6}>
            <form style={{ width: "100%" }} onSubmit={(e) => handleSubmit(e)}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sx={{ display: otpInput ? "none" : "block" }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={500}
                    fontSize="16px"
                    sx={{ color: "grey.main" }}
                  >
                    Enter username
                  </Typography>

                  <TextField
                    name="userName"
                    value={userDetails.userName}
                    //  defaultValue={restaurantDetails.bankDetail.bankName}

                    onChange={(e) => onChange(e)}
                    size="small"
                    required
                    sx={addressTxt}
                  />

                  <Typography
                    variant="h6"
                    fontWeight={500}
                    fontSize="16px"
                    sx={{ color: "grey.main", mt: 2 }}
                  >
                    Password*
                  </Typography>

                  <TextField
                    name="password"
                    value={userDetails.password}
                    // defaultValue={restaurantDetails.bankDetail.accountNumber}
                    onChange={(e) => onChange(e)}
                    size="small"
                    type="password"
                    required
                    sx={addressTxt}
                  />
                  <br />

                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: { xs: "center" },
                    }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        mt: 4,
                        background: `linear-gradient(180deg, #FF9B25 0%, rgba(189, 50, 20, 0.76) 100%)`,
                        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.25)",
                        color: "white.main",
                        me: 5,
                      }}
                    >
                      Login
                    </Button>
                  </Box>
                </Grid>

                {/* <Grid
                  item
                  xs={12}
                  sx={{ display: otpInput ? "block" : "none" }}
                >
                  <div id="recaptcha"></div>
                  <Typography
                    variant="h6"
                    fontWeight={500}
                    fontSize="16px"
                    sx={{ color: "grey.main" }}
                  >
                    Enter OTP
                  </Typography>

                  <TextField
                    name="otp"
                    value={otp}
                    //  defaultValue={restaurantDetails.bankDetail.bankName}

                    onChange={(e) => setOtp(e.target.value)}
                    size="small"
                    sx={addressTxt}
                  />
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: { xs: "center" },
                    }}
                  >
                    <Button
                      onClick={verifyOtp}
                      variant="contained"
                      color="primary"
                      sx={{
                        mt: 4,
                        background: `linear-gradient(180deg, #FF9B25 0%, rgba(189, 50, 20, 0.76) 100%)`,
                        boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.25)",
                        color: "white.main",
                        me: 5,
                      }}
                    >
                      Verify OTP
                    </Button>
                  </Box>
                </Grid> */}

                {/* {otpInput ? (
                  <Grid item xs={12}>
                    <div id="recaptcha"></div>
                    <Typography
                      variant="h6"
                      fontWeight={500}
                      fontSize="16px"
                      sx={{ color: "grey.main" }}
                    >
                      Enter OTP
                    </Typography>

                    <TextField
                      name="otp"
                      value={otp}
                      //  defaultValue={restaurantDetails.bankDetail.bankName}

                      onChange={(e) => setOtp(e.target.value)}
                      size="small"
                      sx={addressTxt}
                    />
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: { xs: "center" },
                      }}
                    >
                      <Button
                        onClick={verifyOtp}
                        variant="contained"
                        color="primary"
                        sx={{
                          mt: 4,
                          background: `linear-gradient(180deg, #FF9B25 0%, rgba(189, 50, 20, 0.76) 100%)`,
                          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.25)",
                          color: "white.main",
                          me: 5,
                        }}
                      >
                        Verify OTP
                      </Button>
                    </Box>
                  </Grid>
                ) : (
                  <></>
                )} */}
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;
