import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateFlight, loadFlights } from "../../redux/actions/flightAction";
import { newFlight, newPassenger } from "../../../tools/mockData";
import Layout from "../common/layout"
import { Button, Paper } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import UpdateFlightServices from './updateFlightServices';
import AddEditPassengerModal from './addEditPassenger';
import MandetoryFilter from './mandetoryFilter';
import "./adminstyle.scss";


const AdminFlightPage = ({ updateFlight, loadFlights, history, ...props }) => {
    const [flight, setflight] = useState({ ...props.flight });
    const [tableData, setTableData] = useState([...flight.passengerList]);
    const [openUpdateFlightServices, setOpenUpdateFlightServices] = useState(false);
    const [openAddEditPassengerModal, setOpenAddEditPassengerModal] = useState(false);
    const [isNew, setIsNew] = useState(true);
    const [selectedPassenger, setselectedPassenger] = useState(newPassenger);

    useEffect(() => {
        if (props.flight.id) {
            setflight({ ...props.flight });
            setTableData([...props.flight.passengerList]);
        } else {
            loadFlights().catch(error => {
                alert("Loading Flight failed" + error);
            });
        }
    }, [props.flight]);

    const closeModal = () => {
        setOpenUpdateFlightServices(false);
        setOpenAddEditPassengerModal(false);
    }
    const handleButtonClick = (action) => {
        if (action === "update services") {
            setOpenUpdateFlightServices(true);
        } else if (action === "add") {
            setIsNew(true);
            setselectedPassenger(newPassenger);
            setOpenAddEditPassengerModal(true);
        }
    }
    const handleEditClick = (action, passenger) => {
        if (action === "edit") {
            setIsNew(false);
            setselectedPassenger(passenger);
            setOpenAddEditPassengerModal(true);
        }
    }
    const onUpdateServices = (updatedFlight) => {
        updateFlight(updatedFlight);
        closeModal();
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        setselectedPassenger(prevPassenger => ({
            ...prevPassenger,
            [name]: value
        }));
    }
    const handleOnPassengerSave = (event) => {
        event.preventDefault();
        let flightCopy = JSON.parse(JSON.stringify(flight));
        if(isNew) {
            flightCopy.passengerList.push({
                ...selectedPassenger,
                id: Math.floor(Math.random() * 10000)
            });
        } else {
            flightCopy.passengerList = flightCopy.passengerList.map(passenger => passenger.id === selectedPassenger.id ? selectedPassenger : passenger);  
        }
        setAndUpdateFlight(flightCopy);        
        closeModal();
    }
    const deletePassenger = (deletedPassenger) => {
        let flightCopy = JSON.parse(JSON.stringify(flight));
        flightCopy.passengerList = flightCopy.passengerList.map(passenger => passenger.id === deletedPassenger.id ? false : passenger);  
        flightCopy.passengerList = flightCopy.passengerList.filter(Boolean); 
        setAndUpdateFlight(flightCopy);
    }
    const setAndUpdateFlight = (flightCopy) => {
        setflight(flightCopy);
        setTableData(flightCopy.passengerList);
        updateFlight(flightCopy);
    }
    const filterPassengers = (filterBy) => {
        let flightCopy = JSON.parse(JSON.stringify(flight));
        let arrayCopy = [...flightCopy.passengerList];
        if (filterBy != "all") {
            arrayCopy = arrayCopy.filter(passenger => !passenger[filterBy]);
        }
        flightCopy.passengerList = arrayCopy
        setTableData(flightCopy.passengerList);
    };
    const back = () => {
        history.push("/adminDashboard");
    }

    return (
        <Layout pageTitle="Manage Flight Details" history={history}>
            <>
                <div>
                    <Paper elevation={3}>
                        <div className="flight-details">
                            <p><strong>Airline: </strong>{flight.airline}</p>
                            <p><strong>Flight Number: </strong>{flight.flightNumber}</p>
                            <p><strong>From: </strong>{flight.from}</p>
                            <p><strong>To: </strong>{flight.to}</p>
                            <p><strong>Arrive: </strong>{flight.arrive}</p>
                            <Button variant="contained" color="primary" onClick={() => handleButtonClick("update services")}>Update Flight Services</Button>
                        </div>
                    </Paper>                    
                    <Paper className="passenger-list-wrapper" elevation={3}>
                        <div>
                            <div className="passenger-header">
                                <h5>Passenger list</h5>
                                <Button color="primary" className="back-button" onClick={() => back()}>All Flight List</Button>
                                <Button variant="contained" color="primary" onClick={() => handleButtonClick("add")}>Add Passenger</Button>
                            </div>
                            <div className="filter">
                                <MandetoryFilter filterPassengers={filterPassengers} />
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <td>Name</td>
                                        <td>Seat Number</td>
                                        <td>Ancillary services</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map(passenger => {
                                        return (

                                            <tr key={passenger.id.toString()}>
                                                <td>{passenger.name}</td>
                                                <td>{passenger.seatNumber}</td>
                                                <td>{passenger.ancillaryServices.map(service => service + ', ')}</td>
                                                <td><EditIcon className="cursor" color="action" onClick={() => handleEditClick("edit", passenger)} /></td>
                                                <td><DeleteIcon className="cursor" color="secondary" onClick={() => deletePassenger(passenger)} /></td>
                                            </tr>

                                        );
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </Paper>
                </div>
                <UpdateFlightServices
                    open={openUpdateFlightServices}
                    onRequestClose={closeModal}
                    flight={flight}
                    updateServices={onUpdateServices}
                />
                <AddEditPassengerModal
                    open={openAddEditPassengerModal}
                    onRequestClose={closeModal}
                    isNew={isNew}
                    passenger={selectedPassenger}
                    onChange={handleChange}
                    onSave={handleOnPassengerSave}
                />
            </>
        </Layout>
    );
}

AdminFlightPage.propTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(AdminFlightPage);


