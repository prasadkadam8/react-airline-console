import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Container,
  Avatar
} from '@material-ui/core';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GoogleLogout } from 'react-google-login';
import { loadCurrentUser, updateCurrentUser } from "../../redux/actions/loginActions";

const Header = ({ pageTitle, loadCurrentUser, updateCurrentUser, history, ...props }) => {
  const [pageTitlestate, setpageTitlestate] = useState(pageTitle);
  const [user, setuser] = useState({...props.currentUser});
  const [islogin, setIslogin] = useState(true);
  useEffect(() => {    
    setpageTitlestate(pageTitle);
  }, [pageTitle]);

  useEffect(() => {
    if(islogin){
      if(props.currentUser.name) {
        setuser({...props.currentUser});
      } else {
        loadCurrentUser();
      }   
    }
  }, [props.currentUser]);

  const logout = () => {
    setIslogin(false);
    sessionStorage.setItem("isUserLogin", false);
    updateCurrentUser({});
    history.push("/");
  }

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar className="p-0">
            <Typography variant="h6" className="app-title" >{pageTitlestate}</Typography>
            <Typography >Hello {user.name}</Typography>
            <Avatar alt="user" src={user.imageUrl} />
            <div className="logout-btn">
            <GoogleLogout
                clientId="30613884821-fr8br7a11r9ho6d7edp1ik9c0ifqhmah.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={logout}
              >
              </GoogleLogout>
            </div>            
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

Header.propTypes = {
  pageTitle: PropTypes.string,
  loadCurrentUser: PropTypes.func,
  updateCurrentUser: PropTypes.func,
  currentUser: PropTypes.object,
  history: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUserReducer
  };
}

const mapDispatchToProps = {
  loadCurrentUser,
  updateCurrentUser
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);