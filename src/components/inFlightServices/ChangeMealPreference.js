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

const ChangeMealPreference = ({ onRequestClose, open, passenger, allMealPreferences, updateServices }) => {
    const [mealPreferences, setmealPreferences] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        if (passenger) {
            let ischecked = false;
            let mealObj = allMealPreferences.map(meal => {
                ischecked = passenger && passenger.mealPreferences.includes(meal) ? true : false;
                return {
                    meal: meal,
                    ischecked: ischecked
                }
            });
            setmealPreferences(mealObj);
        }
    }, [passenger]);

    const onchangeOfCheckbox = (item) => {
        let mealPreferencesCopy = JSON.parse(JSON.stringify(mealPreferences));
        mealPreferencesCopy = mealPreferencesCopy.map(s => {
            if (s.meal === item.meal) {
                return {
                    meal: item.meal,
                    ischecked: item.ischecked ? false : true
                };
            } else {
                return s;
            }
        });
        setmealPreferences(mealPreferencesCopy);
    }
    const handleUpdateClick = () => {
        let updatedMeal = [];
        updatedMeal = mealPreferences.map(s => s.ischecked ? s.meal : null);
        let passengerCopy = JSON.parse(JSON.stringify(passenger));
        passengerCopy.mealPreferences = updatedMeal.filter(Boolean)
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
                        <h2>Update your Meal preference</h2>
                    </div>
                    <div className="modal-body">
                        {mealPreferences.length > 0 ?
                            <>
                                <ul className="item-list">
                                    {mealPreferences.map(item => {
                                        return (
                                            <li key={item.meal}>
                                                <FormControlLabel
                                                    value={item.meal}
                                                    control={<Checkbox color="primary" />}
                                                    label={item.meal}
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
                        <Button variant="contained" color="primary" onClick={() => handleUpdateClick()}>Update</Button>
                        <Button variant="contained" onClick={() => closeModal()}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

ChangeMealPreference.propTypes = {
    open: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func,
    passenger: PropTypes.object,
    allMealPreferences: PropTypes.array,
    updateServices: PropTypes.func
};

export default ChangeMealPreference;

