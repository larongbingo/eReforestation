import React from "react";
import { render } from "react-dom";

import { Register } from "../../pages/register";

describe("Register Page", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    render(<Register />, div);
  });
});
