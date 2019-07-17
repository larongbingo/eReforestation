import React from "react";
import { render } from "react-dom";

import { DismissibleAlert, DismissibleAlertProps } from "../components/DismissibleAlert";

describe("DismissibleAlert", () => {
  it("should render without crashing", () => {
    const props: DismissibleAlertProps = {
      heading: "testing",
      message: "testing",
    };

    const div = document.createElement("div");
    
    render(
      <DismissibleAlert heading={props.heading} message={props.message} />,
      div
    );
  });
});
