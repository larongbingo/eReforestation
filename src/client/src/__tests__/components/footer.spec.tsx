import React from "react";
import { render } from "react-dom";

import { Footer } from "../../components/Footer";

describe("Footer Component", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    render(<Footer />, div);
  });
});
