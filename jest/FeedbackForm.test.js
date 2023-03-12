import { fireEvent, render, screen } from "@testing-library/svelte";
import FeedbackForm from "../src/routes/add/components/FeedbackForm.svelte";

let emit;

// Allows form to be checked properly
beforeAll(() => {
  ({ emit } = window._virtualConsole);
});

beforeEach(() => {
  window._virtualConsole.emit = jest.fn();
});

afterAll(() => {
  window._virtualConsole.emit = emit;
});

test("renders a feedback item", async () => {
    render(FeedbackForm);

    const component = screen.getByText("Add Project");
  
    expect(component).toBeDefined();
});

test("renders send button", async () => {
    render(FeedbackForm);
  
    expect(screen.getAllByRole("button")[0]).toHaveTextContent("Send");
});

test("renders restart button", async () => {
    render(FeedbackForm);
  
    expect(screen.getAllByRole("button")[1]).toHaveTextContent("Restart");
});

test("renders questions correctly", async () => {
    render(FeedbackForm);

    const component = screen.getByText("Project Name");
    const nameInput = screen.getByPlaceholderText('Answer here');
    expect(nameInput).toBeDefined();
    expect(component).toBeDefined();

    expect(screen.getAllByRole("button")).toBeDefined();
});

test("uses handleSubmit correctly", async () => {

    window.HTMLFormElement.prototype.requestSubmit = () => {}

    render(FeedbackForm);

    expect(screen.getAllByRole("button")[0]).toHaveTextContent("Send");


    await fireEvent.click(screen.getAllByRole("button")[0]);
});

test("uses handleReset correctly", async () => {
    render(FeedbackForm);

    expect(screen.getAllByRole("button")[0]).toHaveTextContent("Send");

    await fireEvent.click(screen.getAllByRole("button")[0]);

    expect(screen.getAllByRole("button")[1]).toHaveTextContent("Restart");

});