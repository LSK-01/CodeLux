import { fireEvent, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import FeedbackForm, { handleReset } from "../src/routes/add/components/FeedbackForm.svelte";

let emit;

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
    expect(screen.getByPlaceholderText('Answer here')).toBeDefined();
    expect(component).toBeDefined();

    await fireEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getByText("Project Description")).toBeDefined();

    await fireEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getByText("Project Type")).toBeDefined();
    expect(screen.getAllByRole("option")).toHaveLength(15);

    await fireEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getByText("Manager Username")).toBeDefined();
    expect(screen.getByPlaceholderText('Answer here')).toBeDefined();

    await fireEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getByText("Developer Usernames")).toBeDefined();
    expect(screen.getByPlaceholderText('Answer here')).toBeDefined();

    await fireEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getByText("Github Link")).toBeDefined();
    const urlComponent = screen.getByPlaceholderText('Answer here');
    expect(urlComponent.type).toEqual("url");

    await fireEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getByText("Customer Contact Frequency")).toBeDefined();
    const ccfComponent = screen.getByPlaceholderText('Answer here');
    expect(ccfComponent.type).toEqual("number");
    await userEvent.type(ccfComponent, "test");
    expect(screen.queryByText("test")).not.toBeInTheDocument();

    await fireEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getByText("Budget")).toBeDefined();
    const bComponent = screen.getByPlaceholderText('Answer here');
    expect(bComponent.type).toEqual("number");
    await userEvent.type(bComponent, "test");
    expect(screen.queryByText("test")).not.toBeInTheDocument();

    await fireEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getByText("Start Date")).toBeDefined();

    await fireEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getByText("Deadline")).toBeDefined();
});

test("uses handleSubmit correctly", async () => {

    window.HTMLFormElement.prototype.requestSubmit = () => {}

    render(FeedbackForm);

    expect(screen.getAllByRole("button")[0]).toHaveTextContent("Send");


    await fireEvent.click(screen.getAllByRole("button")[0]);
    
    const component = screen.getByText("Project Description");

    expect(component).toBeDefined();
});

test("uses handleReset correctly", async () => {
    render(FeedbackForm);

    expect(screen.getAllByRole("button")[0]).toHaveTextContent("Send");

    await fireEvent.click(screen.getAllByRole("button")[0]);

    const component1 = screen.getByText("Project Description");
    expect(component1).toBeDefined();

    expect(screen.getAllByRole("button")[1]).toHaveTextContent("Restart");

    await fireEvent.click(screen.getAllByRole("button")[1]);

    const component2 = screen.getByText("Project Name");
    expect(component2).toBeDefined();
});