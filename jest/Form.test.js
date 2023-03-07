import { render, screen } from "@testing-library/svelte";
import Form from "../src/routes/surveys/Form.svelte";

test("renders a form", async () => {
    render(Form, { props : { options : [], questionData : [] }});
  
    expect(screen.getByText("Submit survey")).toBeDefined();
    
  });