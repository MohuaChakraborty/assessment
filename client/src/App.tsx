import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/Login";
import AddUser from "./components/AddUser";
import GetUsers from "./components/GetUsers";
import UserDetailsPage from "./components/UserDetailsPage";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Toolbar,
  Typography,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { DELETE_USER } from "./graphql/queries";
import SubHeader from "./components/SubHeader";
import './App.css';

const Header: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Users Account Summary
        </Typography>
        <Button color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [deleteUser] = useMutation(DELETE_USER);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignup = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowLogoutDialog(false);
    window.location.href = "/";
  };

  const toggleLogoutDialog = () => {
    setShowLogoutDialog(!showLogoutDialog);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser({ variables: { id: userId } });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Router>
      <>
        {isLoggedIn && <Header onLogout={toggleLogoutDialog} />}
        {isLoggedIn ? (
          <>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Box sx={{ margin: "1rem" }}>
                    <SubHeader title="User List" showBackButton={false} />
                      <AddUser />
                      <GetUsers onDeleteUser={handleDeleteUser} />
                    </Box>
                  </>
                }
              />
              <Route
                path="/users"
                element={
                  <>
                    <Box sx={{ margin: "1rem" }}>
                      <SubHeader title="User List" showBackButton={false} />
                      <AddUser />
                      <GetUsers onDeleteUser={handleDeleteUser} />
                    </Box>
                  </>
                }
              />
              <Route
                path="/user-details/:userId"
                element={<UserDetailsPage />}
              />
              <Route path="/logout" element={<Navigate to="/" />} />
            </Routes>

            <Dialog open={showLogoutDialog} onClose={toggleLogoutDialog}>
              <DialogTitle>Logout</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to logout?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={toggleLogoutDialog}>Cancel</Button>
                <Button
                  onClick={() => {
                    handleLogout();
                  }}
                  autoFocus
                >
                  Logout
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : (
          <LoginPage onLogin={handleLogin} onSignup={handleSignup} />
        )}
      </>      
    </Router>
  );
};

export default App;
