import { render, screen } from "@testing-library/svelte";
import Header from "../src/routes/Header.svelte";
import { page } from '$app/stores';

beforeEach(() => {
    page.set({
      url: new URL('https://localhost:5173')
    })
})

test("render header items correctly", async () => {

    // page.subscribe((value) => { url = value.url })

    render(Header, { props: { navItems: ["about","test1"] } });
  
    const about = screen.getByText('ABOUT');
    expect(about).toBeInTheDocument();
    expect(about).toHaveClass("hover:text-red-400");

    const test1 = screen.getByText('TEST1');
    expect(test1).toBeInTheDocument();
    expect(test1).toHaveClass("hover:text-red-400");

    const header = screen.getAllByRole('banner')[0];

    expect(header).toBeVisible();
  });

  test("exports navItems", async () => {
    const { component } = render(Header, { props: { navItems: ["about","test1"] } });

    expect(component.navItems).toBeDefined();

    // expect(component("flex flex-row gap-5 pt-5 pl-5")).toBeDefined();
})

test("shows multiple items", async () => {
    const { component } = render(Header, { props: { navItems: ["about","test1"] } });

    // const boxes = component.getAllByClassName("hover:text-red-400");

    // expect(boxes.length).toBe(2);

    const boxes = screen.getAllByRole('link');

    expect(boxes.length).toBe(2);
})