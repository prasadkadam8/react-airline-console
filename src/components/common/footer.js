import React from "react";
import { AppBar, Toolbar, CssBaseline, Container } from '@material-ui/core';

const Footer = () => {
    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" className="app-bar">
                <Container maxWidth="xl">
                    <Toolbar className="p-0">
                        <p>Designed by @test</p>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default Footer;