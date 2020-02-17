import React from "react";
import Login from "./login";
import { shallow } from "enzyme";

function testLogin(arg) {
    const defaultProps = {
        loadUserRoles: () => { },
        userRoles: [],
        updateCurrentUser: () => { },
        history: {}
    };

    const props = {...defaultProps, ...arg};
    return shallow(<Login {...props} />)
}

it("renders login", () => {
    const wrapper = testLogin();
    expect(wrapper).toMatchSnapshot();
});