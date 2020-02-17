import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    Modal,
    makeStyles,
    Backdrop,
    Button
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ccc',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2),
        width: '600px',
        height: '400px'
    },
}));

const PassengerInfoModal = ({ onRequestClose, open, passenger }) => {
    const [passengerInfo, setPassengerInfo] = useState(null);
    const classes = useStyles();
    useEffect(() => {
        if (passenger) {
            setPassengerInfo(passenger);
        }
    }, [passenger]);

    const closeModal = () => {
        onRequestClose();
    }

    return (
        <>
            <Modal
                className={classes.modal}
                open={open}
                onClose={onRequestClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div className={classes.paper}>
                    <div className="modal-header">
                        <h2>Passenger Info</h2>
                    </div>
                    <div className="modal-body">
                        {passengerInfo ?
                            <>
                                <div className="info-wrapper">
                                    <div className="photo">
                                        <PersonIcon color="disabled" className="passenger-photo"/>
                                    </div>
                                    <div className="info">
                                        <div className="info-group">
                                            <label>Name</label> <span>: {passengerInfo.name}</span>
                                        </div>
                                        <div className="info-group">
                                            <label>Age</label> <span>: {passengerInfo.age}</span>
                                        </div>
                                        <div className="info-group">
                                            <label>Date of Birth</label> <span>: {passengerInfo.dob}</span>
                                        </div>
                                        <div className="info-group">
                                            <label>Seat Number</label> <span>: {passengerInfo.seatNumber}</span>
                                        </div>
                                        <div className="info-group">
                                            <label>Passport Number</label> <span>: {passengerInfo.passportNumber}</span>
                                        </div>
                                        <div className="info-group">
                                            <label>Address</label> <span>: {passengerInfo.address}</span>
                                        </div>
                                    </div>
                                </div>
                                <label>Ancillary Services</label> : {passenger.ancillaryServices.map(service => service + ', ')}
                                <br></br>
                                <label>Meal Preferences</label> : {passenger.mealPreferences.map(meal => meal + ', ')}
                                <br></br>
                                <label>Shopping Items</label> : {passenger.shoppingItems.map(item => item + ', ')}
                                <br></br>
                            </> : ""}
                    </div>
                    <div className="modal-footer">
                        <Button variant="contained" onClick={() => closeModal()}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

PassengerInfoModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func,
    passenger: PropTypes.object,
};

export default PassengerInfoModal;

