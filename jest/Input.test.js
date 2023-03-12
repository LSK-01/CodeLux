import { render, screen } from "@testing-library/svelte";
import Input from "../src/routes/Input.svelte";

test("renders an input", async () => {
    render(Input, { props: { type:"text", name:"email", placeholder:"Email" } });
  
    expect(screen.getByRole("textbox")).toHaveClass(" bg-blue-200 drop-shadow-sm rounded-lg w-72 h-9 outline-slate-400 placeholder-slate-400 pl-3");
  });

test("renders correct text", async () => {
    render(Input, { props: { type:"text", name:"email", placeholder:"Email" } });
  
    expect(screen.getByPlaceholderText('Email')).toBeDefined();
});

test("exports name", async () =>{
    const { component } = render(Input, { props: { type:"text", name:"email", placeholder:"Email" } });

    expect(component.name).toEqual("email");
})

test("exports placeholder", async () =>{
    const { component } = render(Input, { props: { type:"text", name:"email", placeholder:"Email" } });

    expect(component.placeholder).toEqual("Email");
})

test("exports type", async () =>{
    const { component } = render(Input, { props: { type:"text", name:"email", placeholder:"Email" } });

    expect(component.type).toEqual("text");
})

test("has correct id", async () =>{
    const { component } = render(Input, { props: { type:"text", name:"email", placeholder:"Email" } });

    expect(component.id).toBeUndefined();
})