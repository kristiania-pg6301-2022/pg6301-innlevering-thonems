import { ShowQuestion } from "../Quiz";
import { render } from "react-dom";

describe("", () => {
  it("Test if test runs on client", () => {
    expect(3).toBe(3);
  });

  it("Should render question", () => {
    const element = document.createElement("div");

    render(<ShowQuestion />, element);
    expect(element.innerHTML).toMatchSnapshot();
  });
});
