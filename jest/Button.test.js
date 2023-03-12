import { fireEvent, render, screen } from "@testing-library/svelte";
import Button from "../src/routes/Button.svelte";
import { compile } from "svelte/compiler";

// Allows Jest to use Svelte compiler
function svelte(strings) {
  return eval(
    compile(
      strings.join(""),
      { format: "cjs", dev: true, accessors: true }
    ).js.code
  );
}

test("uses a slot for button contents", async () => {
    render(svelte`
      <script>
        import Button from "../src/routes/Button.svelte";
      </script>
  
      <Button>Click me</Button>
    `);
  
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

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