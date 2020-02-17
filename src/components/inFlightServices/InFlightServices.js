import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { MenuItem, Paper, Button } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { newFlight } from "../../../tools/mockData";
import PropTypes from "prop-types";
import AddancillaryServices from "./AddancillaryServices"
import ChangeMealPreference from "./ChangeMealPreference"
import InFlightShopModal from "./InFlightShopModal"
import PassengerInfoModal from "./PassengerInfoModal"
import Layout from "../common/layout"
import { updateFlight, loadFlights } from "../../redux/actions/flightAction";
import "./inFlightServices.scss"

const InflightService = ({ updateFlight, loadFlights, history, ...props }) => {
    const [flight, setflight] = useState({ ...props.flight });
    const [openOption, setOpenOption] = useState(null);
    const [openAddancillaryServicesModal, setOpenAddancillaryServicesModal] = useState(false);
    const [changeMealModal, setChangeMealModal] = useState(false);
    const [inFlightShopModal, setInFlightShopModal] = useState(false);
    const [passengerInfoModal, setPassengerInfoModal] = useState(false);
    const [selectedPassengerObj, setselectedPassengerObj] = useState(null);
    useEffect(() => {
        if (props.flight.id) {
            setflight({ ...props.flight });
        } else {
            loadFlights().catch(error => {
                alert("Loading Flight failed" + error);
            });
        }
    }, [props.flight]);

    const isspecialMeal = (seat) => {
        let passenger = flight.passengerList.find((x) => x.id === seat.passangerId);
        if (seat.checkedIn && passenger.ancillaryServices.includes("Special Meals")) {
            return true;
        } else {
            return false;
        }
    }
    const openOptions = (id) => {
        if (openOption === id) {
            setOpenOption(null);
        } else {
            setOpenOption(id);
        }
    }
    const openActionModal = (action) => {
        if (action === "ancillaryServices") {
            setOpenAddancillaryServicesModal(true);
        } else if (action === "changemeal") {
            setChangeMealModal(true);
        } else if (action === "inFlightShop") {
            setInFlightShopModal(true);
        }
        const passenger = flight.passengerList.find(p => p.id === openOption);
        setselectedPassengerObj(passenger);
        setOpenOption(null);
    }
    const openPassengerInfoModal = (passenger) => {
        setPassengerInfoModal(true);
        setselectedPassengerObj(passenger);
    }
    const closeModal = () => {
        setOpenAddancillaryServicesModal(false);
        setChangeMealModal(false);
        setInFlightShopModal(false);
        setPassengerInfoModal(false);
    }
    const onUpdateServices = (passenger) => {
        let flightCopy = JSON.parse(JSON.stringify(flight));
        flightCopy.passengerList = flightCopy.passengerList.map(p => p.id === passenger.id ? passenger : p);
        updateFlight(flightCopy);
        closeModal();
    }
    const back = () => {
        history.push("/flightlist");
    }
    return (
        <Layout pageTitle="In-Flight Services" history={history}>
            <>
                <Paper elevation={3}>
                    <div className="flight-details">
                        <p><strong>Airline: </strong>{flight.airline}</p>
                        <p><strong>Flight Number: </strong>{flight.flightNumber}</p>
                        <p><strong>From: </strong>{flight.from}</p>
                        <p><strong>To: </strong>{flight.to}</p>
                    </div>
                </Paper>
                <Paper elevation={3} className="passenger-list-wrapper">
                    <div className="passenger-header">
                        <h5>Passenger list</h5>
                        <Button color="primary" className="back-button" onClick={() => back()}>All Flight List</Button>
                    </div>
                    <div className="flight-wrapper">
                        <div className="passenger-list">
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <td>Passenger Name</td>
                                            <td>Seat Number</td>
                                            <td>Ancillary services</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {flight.passengerList.map(passenger => {
                                            if (passenger.checkedIn) {
                                                return (
                                                    <tr
                                                        key={passenger.id.toString()}>
                                                        <td><a href="javascript:void(0)" onClick={() => openPassengerInfoModal(passenger)}>{passenger.name}</a></td>
                                                        <td>{passenger.seatNumber}</td>
                                                        <td>{passenger.ancillaryServices.map(service => service + ', ')}</td>
                                                        <td>
                                                            <div>
                                                                <MoreHorizIcon className="cursor" onClick={() => openOptions(passenger.id)} />
                                                                <div className={"optionPopup " +
                                                                    (openOption === passenger.id ? "show" : "")} >
                                                                    <MenuItem onClick={() => openActionModal("ancillaryServices")}>Add ancillary service</MenuItem>
                                                                    {passenger.ancillaryServices.includes("Special Meals") ?
                                                                        <MenuItem onClick={() => openActionModal("changemeal")}>Change meal preference</MenuItem> : ""
                                                                    }
                                                                    {passenger.ancillaryServices.includes("In-flight Shop") ?
                                                                        <MenuItem onClick={() => openActionModal("inFlightShop")}>In-flight shop</MenuItem> : ""
                                                                    }
                                                                </div>

                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        })}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="flight-seats">
                            <h6>Seat Map</h6>
                            <div className="seat-map">
                                {flight.seats.map(seat => {
                                    return (
                                        <div className={
                                            "seat " +
                                            (seat.checkedIn ? 'checked-in ' : 'disabled-seat ') +
                                            (isspecialMeal(seat) ? "special-meal " : "")
                                        }
                                            key={seat.seatNumber.toString()}>{seat.seatNumber}
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="seat-details">
                                <div>
                                    <div className="seat checked-in">0</div>
                                    <p>Checked In</p>
                                </div>
                                <div>
                                    <div className="seat special-meal">0</div>
                                    <p>Special Meal</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Paper>
                <AddancillaryServices
                    open={openAddancillaryServicesModal}
                    onRequestClose={closeModal}
                    passenger={selectedPassengerObj}
                    allAncillaryServices={flight.ancillaryServices}
                    updateServices={onUpdateServices}
                />
                <ChangeMealPreference
                    open={changeMealModal}
                    onRequestClose={closeModal}
                    passenger={selectedPassengerObj}
                    allMealPreferences={flight.mealPreferences}
                    updateServices={onUpdateServices}
                />
                <InFlightShopModal
                    open={inFlightShopModal}
                    onRequestClose={closeModal}
                    passenger={selectedPassengerObj}
                    allShoppingItems={flight.shoppingItems}
                    updateServices={onUpdateServices}
                />
                <PassengerInfoModal
                    open={passengerInfoModal}
                    onRequestClose={closeModal}
                    passenger={selectedPassengerObj}
                />
            </>
        </Layout>
    )
}

InflightService.propTypes = {
    flight: PropTypes.object,
    loadFlights: PropTypes.func,
    updateFlight: PropTypes.func,
    history: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    const flightNumber = ownProps.match.params.flightnumber;
    let selectedFlight;
    if (state.flightData.length !== 0) {
        selectedFlight = state.flightData.find(flight => flight.flightNumber === parseInt(flightNumber))
    } else {
        selectedFlight = newFlight;
    }
    return {
        flight: selectedFlight,
    };
}

const mapDispatchToProps = {
    loadFlights,
    updateFlight
};
export default connect(mapStateToProps, mapDispatchToProps)(InflightService);