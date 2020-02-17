import React, { useEffect } from "react";
import { CssBaseline, Paper } from '@material-ui/core';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import "./login.scss";
import GoogleLogin from "react-google-login";
import PropTypes from "prop-types";
import { loadUserRoles, updateCurrentUser } from "../../redux/actions/loginActions";

const login = ({ 
    loadUserRoles, 
    userRoles, 
    updateCurrentUser ,
    history
}) => {
    useEffect(() => {
        loadUserRoles();
    }, []);
    const setCurrentUser = (isValidUser, userObj) => {
        if (isValidUser) {
            let currentUser = {
                name: userObj.name,
                email: userObj.email,
                imageUrl: userObj.imageUrl
            }
            updateCurrentUser(currentUser);
            sessionStorage.setItem("isUserLogin", true);
            isValidUser.role === "admin"
                ? history.push("/adminDashboard")
                : history.push("/flightlist");
        } else {
            alert("User not available in databese.");
        }
    }
    const handleGoogleLogin = async response => {
        const isValidUser = userRoles.find(user => user.email === response.profileObj.email);
        setCurrentUser(isValidUser, response.profileObj);
    };
    return (
        <>
            <CssBaseline />
            <div className="login-wrapper">
                <Grid container>
                    <Grid className="login-area" item xs={6}>
                        <Paper elevation={3}>
                            <h1>Airline Console</h1>
                            <GoogleLogin
                                clientId="30613884821-fr8br7a11r9ho6d7edp1ik9c0ifqhmah.apps.googleusercontent.com"
                                buttonText="LOGIN WITH GOOGLE"
                                onSuccess={handleGoogleLogin}
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </div>

        </>
    );
}
login.propTypes = {
    loadUserRoles: PropTypes.func,
    updateCurrentUser: PropTypes.func,
    userRoles: PropTypes.array,
    history: PropTypes.object
};

function mapStateToProps(state) {
    return {
        userRoles: state.userRoleReducer
    };
}

const mapDispatchToProps = {
    loadUserRoles,
    updateCurrentUser
};
export default connect(mapStateToProps, mapDispatchToProps)(login);
