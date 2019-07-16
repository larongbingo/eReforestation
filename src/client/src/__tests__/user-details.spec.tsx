import React from "react";
import { render } from "react-dom";

import { IUserDetails } from "../../../interfaces/models/IUserDetails";
import { UserDetails } from "../components/profile/UserDetails"; 

describe("ContactPerson Component", () => {
  it("should render without crashing", () => {
    
    const userDetails: IUserDetails = {
      firstName: "test",
      middleName: "test",
      lastName: "test",
      address: "test",
      phoneNumber: "test",
      emailAddress: "test",
      dateOfBirth: new Date("01/01/1900"),
    };

    const div = document.createElement("div");
    render(<UserDetails userDetails={userDetails} />, div);
  });
});
