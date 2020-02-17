import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles(() => ({
    formControl: {
        minWidth: "100%",
    },
}));

const MandetoryFilter = ({ filterPassengers }) => {
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
                <InputLabel id="mandatory-filter">Filter By missing mandatory fields</InputLabel>
                <Select
                    labelId="mandatory-filter"
                    id="mandatory-filter-id"
                    value={selectedOption}
                    onChange={() => handleChange(event)}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="passportNumber">Passport</MenuItem>
                    <MenuItem value="address">Address</MenuItem>
                    <MenuItem value="dob">Date of birth</MenuItem>
                </Select>
            </FormControl>
        </>
    );
}

MandetoryFilter.propTypes = {
    filterPassengers: PropTypes.func
};

export default MandetoryFilter;

