import React from "react";
import { render } from "react-dom";

import { Index } from "../../pages/index";

describe("Index/Root Page", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    render(<Index/>, div);
  });
});
