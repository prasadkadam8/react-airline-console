import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loadFlights } from "../../redux/actions/flightAction";
import Layout from "../common/layout";
import PropTypes from "prop-types";

const AdminDashboard = ({ loadFlights, flights, history }) => {
    useEffect(() => {
        if (flights.length === 0) {
            loadFlights();
        }
    }, []);
    return (
        <>
            <Layout pageTitle="Admin Flights List" history={history}>
                <>
                    <Paper elevation={3}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Flight No.</th>
                                    <th>Airline</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Arrived</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {flights.map(flight => {
                                    return (
                                        <tr key={flight.flightNumber}>
                                            <td>{flight.flightNumber}</td>
                                            <td>{flight.airline}</td>
                                            <td>{flight.from}</td>
                                            <td>{flight.to}</td>
                                            <td>{flight.arrive}</td>
                                            <td><Link to={"/admin/flight/" + flight.flightNumber}>Select</Link></td>
                                        </tr>);
                                })}
                            </tbody>
                        </table>
                    </Paper>
                </>
            </Layout>
        </>
    );
}

AdminDashboard.propTypes = {
    loadFlights: PropTypes.func.isRequired,
    flights: PropTypes.array.isRequired,
    history: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        flights: state.flightData
    };
}

const mapDispatchToProps = {
    loadFlights
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);

