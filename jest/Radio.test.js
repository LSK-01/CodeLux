import { render, screen } from "@testing-library/svelte";
import Radio from "../src/routes/surveys/Radio.svelte";

test("renders a radio box", async () => {
    render(Radio, { props : { options : [], question : "test question", name : "string" }});
  
    expect(screen.getByText("test question")).toBeDefined();
    
  });