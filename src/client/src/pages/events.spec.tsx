import React from "react";
import { render } from "react-dom";
import "jest";

import { Events } from "./events";

describe("Events Page", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    render(<Events/>, div);
  });
});
