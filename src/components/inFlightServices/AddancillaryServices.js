import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    Modal,
    makeStyles,
    Checkbox,
    FormControlLabel,
    Backdrop,
    Button
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
        width: '600px',
        height: '400px'
    },
}));

const AddancillaryServices = ({ onRequestClose, open, passenger, allAncillaryServices, updateServices }) => {
    const [ancillaryServices, setAncillaryServices] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        if (passenger) {
            let ischecked = false;
            let servicesObj = allAncillaryServices.map(service => {
                ischecked = passenger && passenger.ancillaryServices.includes(service) ? true : false;
                return {
                    service: service,
                    ischecked: ischecked
                }
            });
            setAncillaryServices(servicesObj);
        }
    }, [passenger]);

    const onchangeOfCheckbox = (service) => {
        let ancillaryServicesCopy = JSON.parse(JSON.stringify(ancillaryServices));
        ancillaryServicesCopy = ancillaryServicesCopy.map(s => {
            if (s.service === service.service) {
                return {
                    service: service.service,
                    ischecked: service.ischecked ? false : true
                };
            } else {
                return s;
            }
        });
        setAncillaryServices(ancillaryServicesCopy);
    }
    const handleUpdateClick = () => {
        let updatedServices = [];
        updatedServices = ancillaryServices.map(s => s.ischecked ? s.service : null);
        let passengerCopy = JSON.parse(JSON.stringify(passenger));
        passengerCopy.ancillaryServices = updatedServices.filter(Boolean)
        updateServices(passengerCopy);
    }
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
                        <h2>Update Ancillary services</h2>
                    </div>
                    <div className="modal-body">
                        {ancillaryServices.length > 0 ?
                            <>
                                <ul className="item-list">
                                    {ancillaryServices.map(service => {
                                        return (
                                            <li key={service.service}>
                                                <FormControlLabel
                                                    value={service.service}
                                                    control={<Checkbox color="primary" />}
                                                    label={service.service}
                                                    labelPlacement="end"
                                                    checked={service.ischecked}
                                                    onChange={() => onchangeOfCheckbox(service)}
                                                />
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                            : ""}
                    </div>
                    <div className="modal-footer">
                        <Button variant="contained" color="primary" onClick={() => handleUpdateClick()}>Update</Button>
                        <Button variant="contained" onClick={() => closeModal()}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

AddancillaryServices.propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func,
    passenger: PropTypes.object,
    allAncillaryServices: PropTypes.array,
    updateServices: PropTypes.func
};


export default AddancillaryServices;

