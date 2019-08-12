import React from "react";
import { render } from "react-dom";

import { LogIn } from "../../pages/login";

describe("LogIn Page", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    render(<LogIn />, div);
  });
});
