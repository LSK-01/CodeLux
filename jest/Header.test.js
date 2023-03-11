import { render, screen, waitFor } from "@testing-library/svelte";
import Header from "../src/routes/Header.svelte";
import userEvent from "@testing-library/user-event";

import { page } from '$app/stores';
import { compile } from "svelte/compiler";

function svelte(strings) {
  return eval(
    compile(
      strings.join(""),
      { format: "cjs", dev: true, accessors: true }
    ).js.code
  );
};

beforeEach(() => {
    page.set({
      url: new URL('https://localhost:5173')
    })
})

test("render header items correctly", async () => {
    page.set({
      url: new URL('https://localhost:5173/dashboard')
    })

    jest.mock('$app/navigation', () => {
      return {
          __esModule: true,
          goto: jest.fn().mockImplementation((target) => console.log(target))
      };
  });

    render(svelte`
    <script>
    import Header from "../src/routes/Header.svelte";
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import Button from '../src/routes/Button.svelte';

    </script>

    <Header navItems={["projects"]} user={user} />
  `); 
  
    const vap = screen.getByText('View all projects');
    expect(vap).toBeInTheDocument();
    expect(vap).toHaveClass("bg-red-200 w-32 h-10 rounded-lg hover:bg-red-400 drop-shadow-md svelte-nldxrc");

    const flb = screen.getByText('format_list_bulleted');
    expect(flb).toBeInTheDocument();
    expect(flb).toHaveClass("material-symbols-outlined");

    userEvent.click(vap);

  });

test("renders profile when non-login", async () => {
  page.set({
    url: new URL('https://localhost:5173/dashboard')
  })

  render(Header, { props: { navItems: ["add"] , user: user} });  

  expect(screen.queryByText("test")).toBeDefined();
  expect(screen.getByText("account_circle")).toHaveClass("material-symbols-outlined");
});

test("renders no profile on login", async () => {
  page.set({
    url: new URL('https://localhost:5173/dashboard')
  })

  render(Header, { props: { navItems: ["login"] , user: user} });  

  expect(screen.queryByText("test")).toBeNull();
  expect(screen.queryByText("account_circle")).toBeNull();

});

test("render header items correctly", async () => {
  page.set({
    url: new URL('https://localhost:5173/dashboard')
  })

  render(Header, { props: { navItems: ["add"] , user: user} });

  expect(screen.queryByText("Add project")).toBeDefined();

  render(Header, { props: { navItems: ["login"] , user: user} });

  expect(screen.queryByText("Log in")).toBeDefined();


  page.set({
    url: new URL('https://localhost:5173/add')
  })  

  render(Header, { props: { navItems: ["dashboard"] , user: user} });

  render(Header, { props: { navItems: ["logout"] , user: user} });

  render(Header, { props: { navItems: ["signup"] , user: user} });

});

test("exports navItems", async () => {
    const { component } = render(Header, { props: { navItems: ["projects"] , user: user} });

    expect(component.navItems).toBeDefined();
})

test("exports user", async () => {
  const { component } = render(Header, { props: { navItems: ["projects"] , user: user} });

  expect(component.user).toBeDefined();
})