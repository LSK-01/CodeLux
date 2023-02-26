import { fireEvent, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import Button from "../src/routes/Button.svelte";

test("renders a button", async () => {
  render(Button);

  expect(screen.getByRole("button")).toHaveClass(" bg-red-200 w-32 h-10 rounded-lg hover:bg-red-400 drop-shadow-md");
});

test("exports click", async () => {
    const { component } = render(Button);

    expect(component.click).toBeDefined();
})

test("triggers an event when clicked", () => {
    const mock = jest.fn();

	render(Button, { props: { click: mock } });

	const button = screen.getByRole("button");

    fireEvent.click(button);

	expect(mock).toHaveBeenCalled();
});


//how to test slot
//https://dockyard.com/blog/2022/06/09/testing-svelte-component-slots