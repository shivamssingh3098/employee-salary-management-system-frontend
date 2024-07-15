import React, { useState } from "react";

import axios from "axios";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

// import SnackbarComp from "./reusableComponent/Snackbar";

const SignUp = ({}) => {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    number: "",
    fullName: "",
    password: "",
  });
  // const [number, setNumber] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState(false);

  const onChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
    console.log(userDetails);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await axios.post(`/api/v1/employee/register`, {
        ...userDetails,
      });
      console.log(res);
      setMsg(res.data.message);
      setOpen(true);
      setUserDetails({
        userName: "",
        email: "",
        number: "",
        fullName: "",
        password: "",
        department: "",
      });
      setTimeout(() => {
        setOpen(false);
      }, [1000]);
    } catch (error) {
      console.log(error);

      //   setLoading(false);
    }
  };

  const addressTxt = {
    width: { xs: "100%", sm: "80%" },

    borderRadius: "10px",
    // background: "rgba(255, 255, 255, 0.31)",
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
            alignItems: "center",
          }}
        >
          <Grid item xs={12} sm={8} md={6}>
            <form style={{ width: "100%" }} onSubmit={(e) => handleSubmit(e)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    fontWeight={500}
                    fontSize="16px"
                    sx={{ color: "grey.main" }}
                  >
                    Name*
                  </Typography>

                  <TextField
                    name="fullName"
                    value={userDetails.fullName}
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
                    Email*
                  </Typography>

                  <TextField
                    name="email"
                    value={userDetails.email}
                    // defaultValue={restaurantDetails.bankDetail.branch}
                    onChange={(e) => onChange(e)}
                    size="small"
                    type="email"
                    required
                    sx={addressTxt}
                  />

                  <Typography
                    variant="h6"
                    fontWeight={500}
                    fontSize="16px"
                    sx={{ color: "grey.main", mt: 2 }}
                  >
                    Mobile Number*
                  </Typography>

                  {/* <PhoneInput
                    country={"us"}
                    value={number}
                    onChange={() => setNumber("+" + number)}
                  /> */}

                  <TextField
                    name="number"
                    value={userDetails.number}
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
                    User Name*
                  </Typography>

                  <TextField
                    name="userName"
                    value={userDetails.userName}
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
                    Department Name*
                  </Typography>

                  <TextField
                    name="department"
                    value={userDetails.department}
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
                  <Typography color={"red"}>{open ? msg : ""}</Typography>

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
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignUp;
