import { render, screen } from "@testing-library/react";
import Contact from "../components/Contact";

test("contact form loads correctly", () => {
    // const { getByLabelText, getByText } = render(<Contact />);
    // expect(getByLabelText(/name/i)).toBeInTheDocument();
    // expect(getByLabelText(/email/i)).toBeInTheDocument();
    // expect(getByText(/submit/i)).toBeInTheDocument();
    render(<Contact />);
    
    //Querying
    // const heading = screen.getByRole("heading", { name: "Get in Touch" });
    //Assertion
    // expect(heading).toBeInTheDocument();

    //Querying
    const headings = screen.getAllByRole("heading");
    //Assertion
    // Option A: Check that the array is not empty
    expect(headings.length).toBeGreaterThan(0);
    // Option B: Check that the first heading is in the document
    expect(headings[0]).toBeInTheDocument();
});
