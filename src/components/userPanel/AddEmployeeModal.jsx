import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";

import Modal from "@mui/material/Modal";

const AddEmployeeModal = (props) => {
  const matches = useMediaQuery("(min-width:1100px)");
  const matchesDown = useMediaQuery("(min-width:646px)");

  const onChangeHandler = (e) => {
    props.setEmpData({ ...props.empData, [e.target.name]: e.target.value });
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: matches ? "30%" : matchesDown ? "60%" : "90%",
    bgcolor: "background.paper",
    borderRadius: "16px",
    boxShadow: 24,
    p: 4,
  };
  const timeDurationDashboardStyle = {
    textAlign: "center",
    color: "white.main",
    fontSize: "25px",
    fontWeight: 600,
  };
  const paperBoxDashboardStyle = {
    textAlign: "center",
    backgroundColor: "yellow.tertiary",

    padding: 1.5,
    borderRadius: "10px 10px 0px 0px",
  };
  return (
    <div>
      {" "}
      <Modal
        open={props.openEmployees}
        onClose={props.handleCloseEmployees}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, overflow: "scroll", height: "75%" }}>
          <Stack
            spacing={2}
            component="form"
            onSubmit={props.createEmployee}
            // sx={{ overflow: "scroll", height: "95%" }}
          >
            <Box sx={{ ...paperBoxDashboardStyle, borderRadius: "10px" }}>
              <Typography sx={timeDurationDashboardStyle}>
                Add Employee
              </Typography>
            </Box>

            <TextField
              size="small"
              id="outlined-basic"
              sx={{ width: "100%" }}
              label="fullName"
              name="fullName"
              onChange={onChangeHandler}
              value={props.empData.fullName}
              variant="outlined"
            />

            <TextField
              size="small"
              id="outlined-basic"
              sx={{ width: "100%" }}
              label="number"
              name="number"
              onChange={onChangeHandler}
              value={props.empData.number}
              variant="outlined"
            />
            <TextField
              size="small"
              id="outlined-basic"
              label="userName"
              onChange={onChangeHandler}
              name="userName"
              sx={{ width: "100%" }}
              value={props.empData.userName}
              variant="outlined"
            />
            <TextField
              size="small"
              id="outlined-basic"
              label="email"
              onChange={onChangeHandler}
              name="email"
              sx={{ width: "100%" }}
              value={props.empData.email}
              variant="outlined"
            />
            <TextField
              size="small"
              id="outlined-basic"
              label="department"
              onChange={onChangeHandler}
              name="department"
              sx={{ width: "100%" }}
              value={props.empData.department}
              variant="outlined"
            />
            <TextField
              size="small"
              id="outlined-basic"
              label="password"
              onChange={onChangeHandler}
              name="password"
              sx={{ width: "100%" }}
              value={props.empData.password}
              variant="outlined"
            />

            <Button type="submit" variant="contained">
              Create
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default AddEmployeeModal;
