import React from "react";
import PropTypes from "prop-types";
import {
    Modal,
    makeStyles,
    Backdrop,
    Button,
    TextField
} from '@material-ui/core';


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
        width: '800px',
        height: '500px'
    },
}));

const AddEditPassengerModal = ({ 
    onRequestClose, 
    open, 
    isNew, 
    passenger, 
    onChange,
    onSave,
 }) => {
    const classes = useStyles();
    const closeModal = () => {
        onRequestClose();
    }
    return (
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
                    <h2>{isNew ? "Add Passenger" : "Edit Passenger"}</h2>
                </div>
                <div className="modal-body">
                    <div className="passenger-form">
                        <form id="passengerform" autoComplete="off" onSubmit={onSave}>
                            <div className="form-group">
                                <TextField 
                                    id="name" 
                                    label="Name" 
                                    name = "name"
                                    value={passenger.name}   
                                    onChange={onChange} 
                                />
                                <TextField 
                                    type="number" 
                                    id="age" 
                                    label="Age" 
                                    name="age"
                                    value={passenger.age}
                                    onChange={onChange}
                                />
                                <TextField
                                    id="dob"
                                    label="Date of birth"
                                    type="date"
                                    name="dob"
                                    required
                                    value={passenger.dob}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group">
                                <TextField 
                                    id="passport" 
                                    label="Passport Number"
                                    name="passportNumber"
                                    value={passenger.passportNumber}
                                    onChange={onChange}
                                    required
                                />
                                <TextField
                                    id="edpirydate"
                                    label="Expiry Date"
                                    type="date"
                                    name="expiryDate"
                                    value={passenger.expiryDate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-group" >
                                <TextField 
                                    multiline 
                                    id="address" 
                                    label="Address" 
                                    name="address"
                                    value={passenger.address}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="modal-footer">
                    <Button variant="contained" form="passengerform" type="submit" color="primary" >Update</Button>
                    <Button variant="contained" onClick={() => closeModal()}>Close</Button>
                </div>
            </div>
        </Modal>
    );
}

AddEditPassengerModal.propTypes = {
    open: PropTypes.bool,
    onRequestClose: PropTypes.func,
    isNew: PropTypes.bool,
    passenger: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired

};
export default AddEditPassengerModal;

