import { fireEvent, render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import projectBox from "../src/routes/projects/[slug]/projectBox.svelte";

test("renders a list box", async () => {
    const component = render(projectBox, { props : { name: "test", date: "2023", id: "123"}});
  
    expect(component).toBeDefined();
    
});

test("renders a list box", async () => {
    render(projectBox, { props : { name: "test", date: "2023", id: "123"}});
  
    expect(screen.getByText("Due date: 2023")).toBeDefined();

    expect(screen.getByText("test")).toBeInTheDocument();
});

test("renders icon correctly", async () => {
    render(projectBox, { props : { name: "test", date: "2023", id: "123"}});
  
    expect(screen.getByText("description")).toHaveClass("material-symbols-outlined");

    expect(screen.getByText("chevron_right")).toHaveClass("material-symbols-outlined");
})

test("exports name correctly", async () => {
    const { component } = render(projectBox, { props : { name: "test", date: "2023", id: "123"}});
  
    expect(component.name).toEqual("test");
})

test("exports date correctly", async () => {
    const { component } = render(projectBox, { props : { name: "test", date: "2023", id: "123"}});
  
    expect(component.date).toEqual("2023");
})

test("exports id correctly", async () => {
    const { component } = render(projectBox, { props : { name: "test", date: "2023", id: "123"}});
  
    expect(component.id).toEqual("123");
})

test("renders button", async () => {
    const { component } = render(projectBox, { props : { name: "test", date: "2023", id: "123"}});
  
    expect(screen.getByRole("button")).toHaveClass("boxContents");
})