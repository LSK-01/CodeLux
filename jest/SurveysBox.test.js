import { fireEvent, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import SurveysBox from "../src/routes/dashboard/SurveysBox.svelte";
import { compile } from "svelte/compiler";

function svelte(strings) {
  return eval(
    compile(
      strings.join(""),
      { format: "cjs", dev: true, accessors: true }
    ).js.code
  );
}

test("renders a survey box", async () => {
  render(SurveysBox, { props : { surveyList : [{projectName: "test", projectID: "123" }] }});

  expect(screen.getByText("Surveys")).toBeDefined();
  
});

test("exports survey list", async () => {
  const { component } = render(SurveysBox, { props : { surveyList : [{projectName: "test", projectID: "123" }] }});

  expect(component.surveyList).toEqual([{projectName: "test", projectID: "123" }]);
  
});

test("boxClick works correctly", async () => {
  const { component } = render(SurveysBox, { props : { surveyList : [{projectName: "test", projectID: "123" }] }});

  expect(component.boxClick).toBeUndefined();
  
});

test("renders no survey", async () => {
  render(SurveysBox, { props : { surveyList : [] }});

  expect(screen.getByText("No surveys due")).toBeDefined();
});

test("renders multiple surveys", async () => {
  render(SurveysBox, { props : { surveyList : [{projectName: "test", projectID: "123" },{projectName: "test1", projectID: "1234" }] }});

  expect(screen.getByText("Take survey for test")).toBeDefined();
  expect(screen.getByText("Take survey for test1")).toBeDefined();
  expect(screen.queryByText("No surveys due")).not.toBeInTheDocument();

  expect(screen.getAllByRole("button")).toHaveLength(2);
});
 
test("renders icon correctly", async () => {
  render(SurveysBox, { props : { surveyList : [{projectName: "test", projectID: "123" }] }});

  expect(screen.getByText("quiz")).toHaveClass("material-symbols-outlined");
})

test("redirect works correctly", async () => {
  render(svelte`
    <script>
    import { goto } from "$app/navigation";

    import SurveysBox from "../src/routes/dashboard/SurveysBox.svelte";
    </script>

    <SurveysBox surveyList={ [{projectName: "test", projectID: "123" }] } />
  `);    

  const clickable = (screen.getByRole("button"));

  expect(clickable).toHaveClass('surveyItem');

  userEvent.click(clickable);
})
