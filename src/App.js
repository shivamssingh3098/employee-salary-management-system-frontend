// import logo from "./logo.svg";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "../src/components/Home";
import UserHomePage from "./components/userPanel/UserHomePage";
import Header from "./components/userPanel/Header";
import Logout from "./components/userPanel/Logout";
import { useContext, useEffect, useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AdminDataContext } from "./components/reusableComponent/AdminContext";

function App() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AdminDataContext);

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentUser = async (req, res) => {
    try {
      const user = await axios.get(`/api/v1/employee`);
      // setIsLoggedIn(true);
      setIsAuthenticated(true);
      console.log("isLoggedIn", isLoggedIn);
      console.log("user", user);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      return navigate("/login");
    }
  };

  useEffect(() => {
    currentUser();
  }, []);

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<UserHomePage />}></Route>
            <Route path="/Home" element={<UserHomePage />}></Route>
            {/* <Route path="/Upload" element={<UploadImage />}></Route> */}
            <Route
              path="/Logout"
              element={<Logout />}

              // element={<Logout handleLogin={handleLogin} />}
            ></Route>
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<Home />}></Route>

          {/* <Route path="/" element={<Home />}></Route> */}
        </Routes>
      )}
    </div>
  );
}

export default App;
