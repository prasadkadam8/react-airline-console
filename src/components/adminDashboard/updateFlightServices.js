import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    Modal,
    makeStyles,
    TextField,
    Backdrop,
    Button,
    Fab
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';


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

const UpdateFlightServices = ({ onRequestClose, open, flight, updateServices }) => {
    const [flightState, setFlightState] = useState({});
    const [ancillaryServices, setAncillaryServices] = useState([]);
    const [mealPreference, setMealPreference] = useState([]);
    const [shoppingList, setShoppingList] = useState([]);
    useEffect(() => {
        if (flight.id) {
            setFlightState(flight);
            setAncillaryServices(flight.ancillaryServices);
            setMealPreference(flight.mealPreferences);
            setShoppingList(flight.shoppingItems);

        }
    }, [open]);
    const classes = useStyles();
    const closeModal = () => {
        onRequestClose();
    }
    const addService = (action) => {
        let newService = document.getElementById(action).value;
        if (newService.length > 0) {
            if (action === "new-ancillery-service") {
                let ancillaryServicesCopy = [...ancillaryServices];
                ancillaryServicesCopy.push(newService);
                setAncillaryServices(ancillaryServicesCopy);
            } else if (action === "new-meal-preference") {
                let mealPreferenceCopy = [...mealPreference];
                mealPreferenceCopy.push(newService);
                setMealPreference(mealPreferenceCopy);
            } else if (action === "new-shopping-list-item") {
                let shoppingListCopy = [...shoppingList];
                shoppingListCopy.push(newService);
                setShoppingList(shoppingListCopy);
            }
        }
        document.getElementById(action).value = null;
    }
    const deleteService = (service, type) => {
        if (type === "ancillery") {
            let ancillaryServicesCopy = [...ancillaryServices];
            const index = ancillaryServicesCopy.indexOf(service);
            ancillaryServicesCopy.splice(index, 1);
            setAncillaryServices(ancillaryServicesCopy);
        } else if (type === "meal") {
            let mealPreferenceCopy = [...mealPreference];
            const index = mealPreferenceCopy.indexOf(service);
            mealPreferenceCopy.splice(index, 1);
            setMealPreference(mealPreferenceCopy);
        } else if (type === "shopping") {
            let shoppingListCopy = [...shoppingList];
            const index = shoppingListCopy.indexOf(service);
            shoppingListCopy.splice(index, 1);
            setShoppingList(shoppingListCopy);
        }
    }  
    const handleUpdate = () => {
        let flightStateCopy = {...flightState};
        flightStateCopy.ancillaryServices = ancillaryServices;
        flightStateCopy.mealPreferences = mealPreference;
        flightStateCopy.shoppingItems = shoppingList;
        updateServices(flightStateCopy);
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
                    <h2>Update Flight services</h2>
                </div>
                <div className="modal-body">
                    <div className="services-wrapper">
                        <div className="update-section">
                            <div>
                                <TextField id="new-ancillery-service" label="Ancillary services" onKeyUp={(e) => e.keyCode === 13 ? addService("new-ancillery-service") : false} />
                                <Fab color="primary" aria-label="add" onClick={() => addService("new-ancillery-service")}>
                                    <AddIcon />
                                </Fab>
                            </div>
                            <ul>
                                {ancillaryServices.map(service =>
                                    <li key={service}>
                                        <span>{service}</span>
                                        <ClearIcon color="secondary" onClick={() => deleteService(service, "ancillery")} />
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className="update-section">
                            <div>
                                <TextField id="new-meal-preference" label="Meal Preference" onKeyUp={(e) => e.keyCode === 13 ? addService("new-meal-preference") : false} />
                                <Fab color="primary" aria-label="add" onClick={() => addService("new-meal-preference")}>
                                    <AddIcon />
                                </Fab>
                            </div>
                            <ul>
                                {mealPreference.map(service =>
                                    <li key={service}>
                                        <span>{service}</span>
                                        <ClearIcon color="secondary" onClick={() => deleteService(service, "meal")} />
                                    </li>
                                )}
                            </ul>
                        </div><div className="update-section">
                            <div>
                                <TextField id="new-shopping-list-item" label="Shopping list item" onKeyUp={(e) => e.keyCode === 13 ? addService("new-shopping-list-item") : false} />
                                <Fab color="primary" aria-label="add" onClick={() => addService("new-shopping-list-item")}>
                                    <AddIcon />
                                </Fab>
                            </div>
                            <ul>
                                {shoppingList.map(service =>
                                    <li key={service}>
                                        <span>{service}</span>
                                        <ClearIcon color="secondary" onClick={() => deleteService(service, "shopping")} />
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <Button variant="contained" color="primary" onClick={() => handleUpdate()} >Update</Button>
                    <Button variant="contained" onClick={() => closeModal()}>Close</Button>
                </div>
            </div>
        </Modal>
    );
}

UpdateFlightServices.propTypes = {
    open: PropTypes.bool,
    onRequestClose: PropTypes.func,
    flight: PropTypes.object,
    updateServices: PropTypes.func

};
export default UpdateFlightServices;

