import { fireEvent, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import DeadlinesBox from "../src/routes/dashboard/DeadlinesBox.svelte";
import { compile } from "svelte/compiler";

function svelte(strings) {
    return eval(
      compile(
        strings.join(""),
        { format: "cjs", dev: true, accessors: true }
      ).js.code
    );
  };

test("exports deadline list", async () => {
    const { component } = render(DeadlinesBox,{ props: { deadlineList: [] } });

    expect(component.deadlineList).toBeDefined();
})

test("renders a deadline box", async () => {
    render(DeadlinesBox,{ props: { deadlineList: [] } });
  
    expect(screen.getByText("Deadlines")).toBeDefined();
});

test("renders an empty deadline box", async () => {
    render(DeadlinesBox,{ props: { deadlineList: [] } });
  
    expect(screen.getByText("No projects due")).toBeDefined();
});

test("renders a deadline box", async () => {
    render(svelte`
    <script>
    import DeadlinesBox from "../src/routes/dashboard/DeadlinesBox.svelte";
    import { goto } from "$app/navigation";
    </script>

    <DeadlinesBox deadlineList={[{
      projectID: "id",
      projectName: "projectname",
      deadline: new Date('2023-03-15T00:00:00.000Z'),
  }]} />
  `); 
  
    expect(screen.getByRole("button")).toHaveClass("deadlineItem");

    // expect(screen.getByText("description")).toHaveClass("material-symbols-outlined");

    expect(screen.getByText("projectname")).toBeDefined();

    expect(screen.getByText("Due on 15/03/2023")).toBeDefined();
});

test("redirect works correctly", async () => {
    render(svelte`
      <script>
      import DeadlinesBox from "../src/routes/dashboard/DeadlinesBox.svelte";
      import { goto } from "$app/navigation";
      </script>
  
      <DeadlinesBox deadlineList={[{
        projectID: "id",
        projectName: "projectname",
        deadline: new Date('2023-03-15T00:00:00.000Z'),
    }]} />
    `);    

    const { component } = screen.getByRole("button");

    await userEvent.click(component);
})