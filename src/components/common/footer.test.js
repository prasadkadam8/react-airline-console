import React from "react";
import Footer from "./footer";
import { shallow } from "enzyme";

function testFooter(arg) {
    const props = {...arg};
    return shallow(<Footer {...props} />)
}

it("renders login", () => {
    const wrapper = testFooter();
    expect(wrapper.find("p").length).toBe(1);
});