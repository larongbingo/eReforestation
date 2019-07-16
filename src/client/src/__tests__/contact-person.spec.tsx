import React from "react";
import { render } from "react-dom";

import { IContactPerson } from "../../../interfaces/models/IContactPerson";
import { ContactPerson } from "../components/profile/ContactPerson";

describe("ContactPerson Component", () => {
  it("should render without crashing", () => {
    
    const contactPerson: IContactPerson = {
      firstName: "test",
      middleName: "test",
      lastName: "test",
      address: "test",
      phoneNumber: "test",
      emailAddress: "test",
    };

    const div = document.createElement("div");
    render(<ContactPerson contactPerson={contactPerson} />, div);
  });
});
