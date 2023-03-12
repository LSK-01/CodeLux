import { render, screen } from "@testing-library/svelte";
import projectListBox from "../src/routes/projects/[slug]/projectListBox.svelte";

test("renders a project list box", async () => {
    const component = render(projectListBox, { props : { projectData:[{ projectName: "test", dueDate: "2023", id: "123"}], title:"Title"}});
  
    expect(component).toBeDefined();
});

test("renders an empty project list box", async () => {
    const component = render(projectListBox, { props : { projectData:[], title:"Title"}});
  
    expect(component).toBeDefined();

    expect(screen.findAllByText("No projects found")).toBeDefined();

    expect(screen.queryByText("chevron_right")).not.toBeInTheDocument();

    expect(screen.findAllByText("Title")).toBeDefined();
});

test("renders a non-empty project list box", async () => {
    const component = render(projectListBox, { props : { projectData:[{ projectName: "test", dueDate: "2023", id: "123"}, { projectName: "test1", dueDate: "2024", id: "1234"}], title:"Title"},});
  
    expect(component).toBeDefined();

    expect(screen.queryByText("No projects found")).not.toBeInTheDocument();

    expect(screen.getByText("Due date: 2023")).toBeDefined();

    expect(screen.getByText("test")).toBeInTheDocument();

    expect(screen.getAllByRole("button")).toHaveLength(2);

    expect(screen.getAllByText("chevron_right")).toHaveLength(2);

    expect(screen.findAllByText("Title")).toBeDefined();
});

test("exports projectData correctly", async () => {
    const { component } = render(projectListBox, { props : { projectData:[{ projectName: "test", dueDate: "2023", id: "123"}], title:"Title"}});
  
    expect(component.projectData).toEqual([{ projectName: "test", dueDate: "2023", id: "123"}]);
})

test("exports title correctly", async () => {
    const { component } = render(projectListBox, { props : { projectData:[{ projectName: "test", dueDate: "2023", id: "123"}], title:"Title"}});
  
    expect(component.title).toEqual("Title");
})