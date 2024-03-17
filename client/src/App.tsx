import React, { useState } from 'react';
import LoginPage from './components/Login';
import AddUser from './components/AddUser';
import GetUsers from './components/GetUsers';
import GetUser from './components/GetUser';
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { DELETE_USER } from './graphql/queries';
import './App.css';

const Header: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Users Account Summary
        </Typography>
        <Button color="inherit" onClick={onLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('Users');
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
  };

  const toggleLogoutDialog = () => {
    setShowLogoutDialog(!showLogoutDialog);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser({ variables: { id: userId } });
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>
      {isLoggedIn && <Header onLogout={toggleLogoutDialog} />}
      {isLoggedIn ? (
        <>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            sx={{ marginBottom: '20px' }}
          >
            <Tab label="Users" value="Users" />
            <Tab label="User" value="User" />
          </Tabs>

          <div id="Users" className="tabcontent" style={{ display: activeTab === 'Users' ? 'block' : 'none' }}>
            <AddUser />
            <GetUsers onDeleteUser={handleDeleteUser} />
          </div>

          <div id="User" className="tabcontent" style={{ display: activeTab === 'User' ? 'block' : 'none' }}>
            <GetUser />
          </div>

          <Dialog
            open={showLogoutDialog}
            onClose={toggleLogoutDialog}
          >
            <DialogTitle>Logout</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to logout?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={toggleLogoutDialog}>Cancel</Button>
              <Button onClick={handleLogout} autoFocus>Logout</Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <LoginPage onLogin={handleLogin} onSignup={handleSignup} />
      )}
    </>
  );
};

export default App;
