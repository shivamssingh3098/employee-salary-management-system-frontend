import * as React from "react";

import axios from "axios";
import {
  Box,
  Button,
  // FormControl,
  Grid,
  // InputLabel,
  Modal,
  TextField,
  // Typography,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
// import ImgCard from "../reusableComponent/Card";
import AddEmployeeModal from "./AddEmployeeModal";

export default function UserHomePage() {
  const [data, setData] = React.useState([]);
  const [editData, setEditData] = React.useState({
    userName: "",
    email: "",
    number: "",
    fullName: "",
    department: "",
  });
  const [editSalary, setEditSalary] = React.useState({
    amount: null,
    month: "",
    totalAmount: null,
  });
  const currentUsersId = localStorage.getItem("currentUser");
  const [open, setOpen] = React.useState(false);
  const [openSalary, setOpenSalary] = React.useState(false);
  console.log("currentUser", currentUsersId);
  const [edit, setEdit] = React.useState(false);
  const [id, setId] = React.useState(null);
  const [idSal, setIdSal] = React.useState(null);
  //add employees

  const [openEmployees, setOpenEmployees] = React.useState(false);

  const [empData, setEmpData] = React.useState({
    userName: "",
    email: "",
    number: "",
    fullName: "",
    department: "",
    password: "",
  });

  const handleOpenEmployees = () => setOpenEmployees(true);
  const handleCloseEmployees = () => setOpenEmployees(false);

  const handleOpen = () => {
    setData({});
    setEdit(false);
    open(true);
  };

  // const handleCloseModal = () => {
  //   setOpenModal(false);
  // };

  const handleClose = () => setOpen(false);
  const handleCloseSalary = () => setOpenSalary(false);

  const getImages = async () => {
    const res = await axios.get(`/api/v1/employee/all-employee`);
    setData(res.data.data);

    console.log(res);

    try {
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getImages();
  }, []);
  console.log(data);
  const handleChange = (event) => {
    setEditData({ ...editData, [event.target.name]: event.target.value });
    console.log(data);
  };

  const handleChangeSalary = (event) => {
    setEditSalary({ ...editSalary, [event.target.name]: event.target.value });
    console.log("editSalary", editSalary);
  };

  const editEmployee = async (e) => {
    e.preventDefault();
    try {
      // setIsLoading(true);
      // update-emp/
      console.log("id", id);
      const res = await axios.patch(`/api/v1/employee/update-emp/${id}`, {
        ...editData,
      });
      alert("Employee updated successfully");
      getImages();
      handleClose();
    } catch (error) {
      console.log(error);
      // snackbar(error.response.data.message, "error");

      // setIsLoading(false);
    }
  };

  const editEmployeeSalary = async (e) => {
    e.preventDefault();
    try {
      // setIsLoading(true);
      // update-emp/
      console.log("setIdSal", idSal);
      const res = await axios.post(`/api/v1/employee/add-salary`, {
        ...editSalary,
        idSal,
      });
      alert("Employee updated successfully");
      getImages();
      handleCloseSalary();
    } catch (error) {
      console.log(error);
      // snackbar(error.response.data.message, "error");

      // setIsLoading(false);
    }
  };
  const createEmployee = async (e) => {
    e.preventDefault();
    try {
      // setIsLoading(true);
      // update-emp/
      console.log("empData", empData);
      const res = await axios.post(`/api/v1/employee/register`, {
        ...empData,
      });
      getImages();
      alert("Employee Created successfully");
      getImages();
      handleCloseEmployees();
    } catch (error) {
      console.log(error);
      // snackbar(error.response.data.message, "error");

      // setIsLoading(false);
    }
  };
  console.log("data is ", data);

  const deleteEmp = async (id) => {
    try {
      const res = await axios.delete(`/api/v1/employee/employee/${id}`);
      getImages();
      alert("Employee deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "fullName", headerName: "fullName", width: 130 },
    {
      field: "email",
      headerName: "email",
      width: 250,
    },
    {
      field: "number",
      headerName: "number",
      width: 100,
    },
    {
      field: "userName",
      headerName: "userName",

      width: 150,
    },
    {
      field: "department",
      headerName: "department",
      width: 90,
    },
    {
      field: "Edit",
      headerName: "Edit Employee",
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            onClick={() => {
              setEdit(true);
              setEditData(params.row);
              setId(params.row._id);
              setOpen(true);
              // getSearchSingleRestaurant();
            }}
            size="small"
          >
            Edit
          </Button>
        );
      },
    },
    {
      field: "update salary",
      headerName: "Update Salary",
      width: 200,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            onClick={() => {
              setEdit(true);
              console.log(
                "params.row.salary",
                params.row.salary ? params.row.salary : ""
              );
              setEditSalary(params.row.salary ? params.row.salary : "");
              setIdSal(params.row ? params.row._id : "");
              setOpenSalary(true);
              // getSearchSingleRestaurant();
            }}
            size="small"
          >
            Update Salary
          </Button>
        );
      },
    },
    {
      field: "Delete Employee",
      headerName: "Delete Employee",
      width: 200,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            onClick={() => {
              deleteEmp(params.row._id);
            }}
            size="small"
          >
            Delete Employee
          </Button>
        );
      },
    },
    // {
    //   field: "edit",
    //   headerName: "Edit",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Button
    //           variant="contained"
    //           onClick={() => {
    //             setEdit(true);
    //             setData({ ...params.row });

    //             setOpen(true);
    //             // console.log(params.row);
    //           }}
    //         >
    //           Edit
    //         </Button>
    //       </>
    //     );
    //   },
    // },
  ];
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,

    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ display: "flex", justifyContent: "space-evenly" }}
      >
        {/* {data?.map((item) => ( */}
        <Grid item xs={10}>
          <Button
            sx={{ my: 4 }}
            variant="contained"
            onClick={() => {
              handleOpenEmployees();
              // getSearchSingleRestaurant();
            }}
            size="small"
          >
            Create Employee
          </Button>

          <Box sx={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={data}
              getRowId={(row) => row._id}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              // disableSelectionOnClick
              // experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </Grid>
        {/* ))} */}

        <br />
        {/* <Typography color={"red"}>{open ? msg : ""}</Typography> */}
      </Grid>

      <AddEmployeeModal
        handleCloseEmployees={handleCloseEmployees}
        empData={empData}
        openEmployees={openEmployees}
        setEmpData={setEmpData}
        createEmployee={createEmployee}
      />

      <Modal
        open={openSalary}
        onClose={handleCloseSalary}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container>
            <Grid item sx={12} component="form" onSubmit={editEmployeeSalary}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="amount"
                name="amount"
                value={editSalary.amount}
                required
                variant="outlined"
                onChange={handleChangeSalary}
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="month"
                name="month"
                required
                value={editSalary.month}
                variant="outlined"
                onChange={handleChangeSalary}
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="totalAmount"
                name="totalAmount"
                disabled
                value={editSalary.totalAmount}
                variant="outlined"
                onChange={handleChangeSalary}
              />

              <Button variant="contained" type="submit">
                Update
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container>
            <Grid item sx={12} component="form" onSubmit={editEmployee}>
              <TextField
                id="outlined-basic"
                fullWidth
                label="name"
                name="fullName"
                value={editData.fullName}
                required
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="userName"
                name="userName"
                required
                value={editData.userName}
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="email"
                name="email"
                value={editData.email}
                required
                variant="outlined"
                onChange={handleChange}
              />

              <TextField
                fullWidth
                id="outlined-basic"
                label="phone"
                name="number"
                type="number"
                required
                value={editData.number}
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="department"
                name="department"
                required
                value={editData.department}
                variant="outlined"
                onChange={handleChange}
              />
              <Button variant="contained" type="submit">
                Create
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
