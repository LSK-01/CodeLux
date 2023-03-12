import { render, screen } from "@testing-library/svelte";
import TasksBox from "../src/routes/dashboard/TasksBox.svelte";

test("renders a tasks box", async () => {
  render(TasksBox, { props : { taskList : [] }});

  expect(screen.getByText("Tasks")).toBeDefined();
});
