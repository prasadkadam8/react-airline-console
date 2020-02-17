
import React, { useState, useEffect } from "react";
import { Paper, Button } from "@material-ui/core";
import { newFlight } from "../../../tools/mockData";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateFlight, loadFlights } from "../../redux/actions/flightAction";
import CheckinConfirmationPopup from "./checkinConfirmationPopup"
import SelectFilter from "./SelectFilter"
import Layout from "../common/layout"
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import "./flightlist.scss";

const FlightPage = ({ updateFlight, loadFlights, history, ...props }) => {
    const [flight, setflight] = useState({ ...props.flight });
    const [selectedpassenger, setSelectedpassenger] = useState(null);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [showCheckinPopup, setShowCheckinPopup] = useState(false);
    const [checkinAction, setCheckinAction] = useState(null);
    const [isDesc, setisDesc] = useState(true);
    const [tableData, setTableData] = useState([...flight.passengerList]);

    useEffect(() => {
        if (props.flight.id) {
            setflight({ ...props.flight });
            setTableData([...props.flight.passengerList]);
        } else {
            loadFlights().catch(error => {
                alert("Loading Flight failed" + error);
            });
        }
    }, [props.flight.id]);

    const ontrClick = (passenger) => {
        if (selectedpassenger) {
            if (selectedpassenger !== passenger.id) {
                setSelectedpassenger(passenger.id);
                setSelectedSeat(passenger.seatNumber);
            } else {
                setSelectedpassenger(null);
                setSelectedSeat(null);

            }
        } else {
            setSelectedpassenger(passenger.id);
            setSelectedSeat(passenger.seatNumber);
        }
    }
    const onSeatClick = (seat) => {
        if (seat.checkedIn) {
            setSelectedSeat(seat.seatNumber);
            setSelectedpassenger(seat.passangerId);
            if (selectedSeat === seat.seatNumber) {
                setCheckinAction("checkout");
                setShowCheckinPopup(true);

            }
        } else {
            let passenger = flight.passengerList.find((x) => x.id === selectedpassenger);
            if (passenger && !passenger.checkedIn) {
                setSelectedSeat(seat.seatNumber);
                setCheckinAction("checkin");
                setShowCheckinPopup(true);
            } else if (passenger && passenger.checkedIn) {
                setSelectedSeat(seat.seatNumber);
                setCheckinAction("changeSeat");
                setShowCheckinPopup(true);
            }
        }
    }
    const checkinSelectedPassenger = () => {
        let flightCopy = JSON.parse(JSON.stringify(flight));
        let oldSeat = flightCopy.seats.find((x) => x.passangerId && x.passangerId === selectedpassenger);
        flightCopy.seats.map((seat) => {
            if (seat.seatNumber === selectedSeat) {
                if (checkinAction === "checkin") {
                    seat.checkedIn = true;
                    seat.passangerId = selectedpassenger;
                } else if (checkinAction === "checkout") {
                    seat.checkedIn = false;
                    seat.passangerId = null;
                } else if (checkinAction === "changeSeat") {
                    seat.checkedIn = true;
                    seat.passangerId = selectedpassenger;
                }
            } else if (oldSeat && seat.seatNumber === oldSeat.seatNumber) {
                if (checkinAction === "changeSeat") {
                    seat.checkedIn = false;
                    seat.passangerId = null;
                }
            }
            return seat
        });
        flightCopy.passengerList.map((passenger) => {
            if (passenger.id === selectedpassenger) {
                if (checkinAction === "checkin") {
                    passenger.checkedIn = true;
                    passenger.seatNumber = selectedSeat;
                } else if (checkinAction === "checkout") {
                    passenger.checkedIn = false;
                    passenger.seatNumber = null;
                } else if (checkinAction === "changeSeat") {
                    passenger.checkedIn = true;
                    passenger.seatNumber = selectedSeat;
                }
            }
            return passenger
        });
        updateFlight(flightCopy);
        setflight(flightCopy);
        setTableData(flightCopy.passengerList);
        setShowCheckinPopup(false);
        setSelectedSeat(null);
        setSelectedpassenger(null);
    }
    const compareBy = (key) => {
        return function (a, b) {
            if (isDesc) {
                if (a[key] < b[key]) return -1;
                if (a[key] > b[key]) return 1;
            } else {
                if (a[key] < b[key]) return 1;
                if (a[key] > b[key]) return -1;
            }
            return 0;
        };
    }
    const sortPassengers = (sortBy) => {
        let flightCopy = JSON.parse(JSON.stringify(flight));
        let arrayCopy = [...flightCopy.passengerList];
        arrayCopy.sort(compareBy(sortBy));
        flightCopy.passengerList = arrayCopy
        setTableData(flightCopy.passengerList);
        setisDesc(isDesc ? false : true);
    };
    const filterPassengers = (filterBy) => {
        let flightCopy = JSON.parse(JSON.stringify(flight));
        let arrayCopy = [...flightCopy.passengerList];
        if (filterBy != "all") {
            arrayCopy = arrayCopy.filter(passenger => filterBy === "notCheckedIn" ? !passenger.checkedIn : passenger[filterBy]);
        }
        flightCopy.passengerList = arrayCopy
        setTableData(flightCopy.passengerList);
    };
    const back = () => {
        history.push("/flightlist");
    }
    return (
        <Layout pageTitle="Flight Checkin Service" history={history}>
            <>
                <Paper elevation={3}>
                    <div className="flight-details">
                        <p><strong>Airline: </strong>{flight.airline}</p>
                        <p><strong>Flight Number: </strong>{flight.flightNumber}</p>
                        <p><strong>From: </strong>{flight.from}</p>
                        <p><strong>To: </strong>{flight.to}</p>
                        <p><strong>Arrive: </strong>{flight.arrive}</p>
                    </div>
                </Paper>
                <Paper elevation={3} className="passenger-list-wrapper">
                    <div className="passenger-header">
                        <h5>Passenger list</h5>
                        <Button color="primary" className="back-button" onClick={() => back()}>All Flight List</Button>
                    </div>
                    <div className="flight-wrapper">
                        <div className="passenger-list">
                            <div className="filter">
                                <SelectFilter filterPassengers={filterPassengers} />
                            </div>
                            <div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <td>Passenger Name <UnfoldMoreIcon className="cursor" onClick={() => sortPassengers("name")} /></td>
                                            <td>Seat Number<UnfoldMoreIcon className="cursor" onClick={() => sortPassengers("seatNumber")} /></td>
                                            <td>Ancillary services</td>
                                            <td>Checked In </td>
                                            <td>Wheel Chair</td>
                                            <td>Infant</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableData.map(passenger => {
                                            return (

                                                <tr className={"cursor " + (selectedpassenger === passenger.id ? 'selected' : '')}
                                                    onClick={() => ontrClick(passenger)}
                                                    key={passenger.id.toString()}>
                                                    <td>{passenger.name}</td>
                                                    <td>{passenger.seatNumber}</td>
                                                    <td>{passenger.ancillaryServices.map(service => service + ', ')}</td>
                                                    <td>{passenger.checkedIn ? 'Yes' : 'No'}</td>
                                                    <td>{passenger.wheelchair ? 'Yes' : 'No'}</td>
                                                    <td>{passenger.infants ? 'Yes' : 'No'}</td>
                                                </tr>

                                            );
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
                                            (seat.checkedIn ? 'checked-in ' : ' ') +
                                            (selectedSeat === seat.seatNumber ? 'selected ' : ' ')
                                        }
                                            onClick={() => onSeatClick(seat)}
                                            key={seat.seatNumber.toString()}>{seat.seatNumber}</div>

                                    );
                                })}
                            </div>
                            <div className="seat-details">
                                <div>
                                    <div className="seat checked-in">0</div>
                                    <p>Not Available</p>
                                </div>
                                <div>
                                    <div className="seat">0</div>
                                    <p>Available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Paper>
                <CheckinConfirmationPopup
                    checkinSelectedPassenger={checkinSelectedPassenger}
                    setshowPopup={setShowCheckinPopup}
                    showPopup={showCheckinPopup}
                    checkinAction={checkinAction}
                />
            </>
        </Layout>
    );
}

FlightPage.propTypes = {
    flight: PropTypes.object,
    updateFlight: PropTypes.func.isRequired,
    loadFlights: PropTypes.func,
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
    updateFlight,
    loadFlights
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightPage);

