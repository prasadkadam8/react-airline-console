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

const InFlightShopModal = ({ onRequestClose, open, passenger, allShoppingItems, updateServices }) => {
    const [shoppingList, setShoppingList] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        if (passenger) {
            let ischecked = false;
            let shoppingObj = allShoppingItems.map(item => {
                ischecked = passenger && passenger.shoppingItems.includes(item) ? true : false;
                return {
                    name: item,
                    ischecked: ischecked
                }
            });
            setShoppingList(shoppingObj);
        }
    }, [passenger]);

    const onchangeOfCheckbox = (item) => {
        let shoppingListCopy = JSON.parse(JSON.stringify(shoppingList));
        shoppingListCopy = shoppingListCopy.map(s => {
            if (s.name === item.name) {
                return {
                    name: item.name,
                    ischecked: item.ischecked ? false : true
                };
            } else {
                return s;
            }
        });
        setShoppingList(shoppingListCopy);
    }
    const handleUpdateClick = () => {
        let updatedshoppingList = [];
        updatedshoppingList = shoppingList.map(s => s.ischecked ? s.name : null);
        let passengerCopy = JSON.parse(JSON.stringify(passenger));
        passengerCopy.shoppingItems = updatedshoppingList.filter(Boolean)
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
                        <h2>In-flight Shopping</h2>
                    </div>
                    <div className="modal-body">
                        {shoppingList.length > 0 ?
                            <>
                                <ul className="item-list">
                                    {shoppingList.map(item => {
                                        return (
                                            <li key={item.name}>
                                                <FormControlLabel
                                                    value={item.name}
                                                    control={<Checkbox color="primary" />}
                                                    label={item.name}
                                                    labelPlacement="end"
                                                    checked={item.ischecked}
                                                    onChange={() => onchangeOfCheckbox(item)}
                                                />
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                            : ""}
                    </div>
                    <div className="modal-footer">
                        <Button variant="contained" color="primary" onClick={() => handleUpdateClick()}>Shop</Button>
                        <Button variant="contained" onClick={() => closeModal()}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

InFlightShopModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func,
    passenger: PropTypes.object,
    allShoppingItems: PropTypes.array,
    updateServices: PropTypes.func
};

export default InFlightShopModal;

