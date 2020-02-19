import React from "react";
import PropTypes from "prop-types";
import Button from '@material-ui/core/Button';

const CheckinConfirmationPopup = ({
    setshowPopup,
    checkinSelectedPassenger,
    showPopup,
    checkinAction }) => (
        <div className={"checkin-confirmation-popup " +
            (showPopup ? "show " : "")}>
            {(() => {
                switch (checkinAction) {
                    case "checkin": return (<p>Do you want to check-in for this passenger?</p>);
                    case "checkout": return (<p>Do you want to undo check-in for this passenger?</p>);
                    case "changeSeat": return (<p>Do you want to change seat for this passenger?</p>);
                    default: return "";
                }
            })()}
            <div className="modal-footer">
                <Button variant="contained" onClick={() => setshowPopup(false)}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={() => checkinSelectedPassenger()}>Ok</Button>
            </div>
        </div>
    );

CheckinConfirmationPopup.propTypes = {
    setshowPopup: PropTypes.func.isRequired,
    checkinSelectedPassenger: PropTypes.func.isRequired,
    showPopup: PropTypes.bool.isRequired,
    checkinAction: PropTypes.string
};

export default CheckinConfirmationPopup;
