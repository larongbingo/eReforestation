import React from "react";
import { render } from "react-dom";

import { PageNavbar } from "../../components/PageNavbar";

describe("Events Page", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    render(<PageNavbar/>, div);
  });
});
