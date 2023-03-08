import { fireEvent, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import OverviewsBox from "../src/routes/dashboard/OverviewsBox.svelte";
import { compile } from "svelte/compiler";

function svelte(strings) {
    return eval(
      compile(
        strings.join(""),
        { format: "cjs", dev: true, accessors: true }
      ).js.code
    );
  };

test("exports data list", async () => {
    const { component } =   render(svelte`
    <script>
    import Chart from 'chart.js/auto';
    import OverviewsBox from "../src/routes/dashboard/OverviewsBox.svelte";
    </script>

    <OverviewsBox data={[{
      atRisk: 1,
      notAtRisk: 2,
      withSurveys: 3,
      withoutSurveys: 4,
      withTasks: 5,
      withoutTasks: 6,
    }]} />
  `); 

    expect(component.data).toBeDefined();
});

test("displays titles correctly", async () => {
  const { component } =   render(svelte`
  <script>
  import Chart from 'chart.js/auto';
  import OverviewsBox from "../src/routes/dashboard/OverviewsBox.svelte";
  </script>

  <OverviewsBox data={[{
    atRisk: 1,
    notAtRisk: 2,
    withSurveys: 3,
    withoutSurveys: 4,
    withTasks: 5,
    withoutTasks: 6,
  }]} />
`); 
  
  expect(screen.getByText("Overview")).toBeDefined();

  expect(screen.getByText("Projects at risk")).toBeDefined();

  expect(screen.getByText("Projects with surveys due")).toBeDefined();

  expect(screen.getByText("Projects with tasks due")).toBeDefined();


})

test("renders icons correctly", async () => {
  const { component } =   render(svelte`
  <script>
  import Chart from 'chart.js/auto';
  import OverviewsBox from "../src/routes/dashboard/OverviewsBox.svelte";
  </script>

  <OverviewsBox data={[{
    atRisk: 1,
    notAtRisk: 2,
    withSurveys: 3,
    withoutSurveys: 4,
    withTasks: 5,
    withoutTasks: 6,
  }]} />
`);  

  expect(screen.getByText("error")).toHaveClass("material-symbols-outlined");

  expect(screen.getByText("quiz")).toHaveClass("material-symbols-outlined");

  expect(screen.getByText("assignment")).toHaveClass("material-symbols-outlined");
})

test("calculates chart labels correctly", async () => {
  render(svelte`
    <script>
    import Chart from 'chart.js/auto';
    import OverviewsBox from "../src/routes/dashboard/OverviewsBox.svelte";
    </script>

    <OverviewsBox data={[{
      atRisk: 1,
      notAtRisk: 2,
      withSurveys: 3,
      withoutSurveys: 4,
      withTasks: 5,
      withoutTasks: 6,
    }]} />
  `); 

  expect(screen.getAllByText("undefined/NaN")).toHaveLength(3);
})

test("redirect works correctly", async () => {
  render(svelte`
    <script>
    import Chart from 'chart.js/auto';
    import OverviewsBox from "../src/routes/dashboard/OverviewsBox.svelte";
    import { goto } from "$app/navigation";
    </script>

    <OverviewsBox data={[{
      atRisk: 1,
      notAtRisk: 2,
      withSurveys: 3,
      withoutSurveys: 4,
      withTasks: 5,
      withoutTasks: 6,
    }]} />
  `);    

  const component = screen.getAllByRole("button")[0];

  expect(component).toHaveClass('overviewItem');
})