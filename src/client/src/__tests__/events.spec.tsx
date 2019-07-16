import React from "react";
import { render } from "react-dom";

import { Events } from "../pages/events";

describe("Events Page", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    render(<Events/>, div);
  });
});
