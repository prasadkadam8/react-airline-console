import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    formControl: {
        minWidth: "100%",
    },
}));

const SelectFilter = ({ filterPassengers }) => {
    const [selectedOption, setSelectedOption] = React.useState('');
    const classes = useStyles();

    const handleChange = event => {
        let filterBy = event.target.dataset.value;
        setSelectedOption(filterBy);
        filterPassengers(filterBy);
    };
    return (
        <>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Filter By</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedOption}
                    onChange={() => handleChange(event)}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="checkedIn">Checked In</MenuItem>
                    <MenuItem value="notCheckedIn">Not Checked in</MenuItem>
                    <MenuItem value="wheelchair">Wheel Chair</MenuItem>
                    <MenuItem value="infants">Infant</MenuItem>
                </Select>
            </FormControl>
        </>
    );
}

SelectFilter.propTypes = {
    filterPassengers: PropTypes.func
};

export default SelectFilter;

