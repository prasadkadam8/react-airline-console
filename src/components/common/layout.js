import React from "react";
import { CssBaseline, Container } from '@material-ui/core';
import Header from "./Header";
import Footer from "./footer";
import PropTypes from "prop-types";


const Layout = ({children, pageTitle, history}) => {
    let isUserLogin = sessionStorage.getItem("isUserLogin");
    if(isUserLogin === "false") {
        history.push("/");
    }
    return (
        <>
            <CssBaseline />
           <Header pageTitle={pageTitle} history={history} />
           <Container className="page-wrapper" maxWidth="xl">{children}</Container>
           <Footer />
        </>
    );
}
Layout.propTypes = {
    children: PropTypes.object,
    pageTitle: PropTypes.string,
    history: PropTypes.object,
    
};

export default Layout;
