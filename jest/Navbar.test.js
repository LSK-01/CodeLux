import { render, screen } from "@testing-library/svelte";
import Navbar from "../src/routes/navbar/Navbar.svelte";
import { compile } from "svelte/compiler";


function svelte(strings) {
    return eval(
      compile(
        strings.join(""),
        { format: "cjs", dev: true, accessors: true }
      ).js.code
    );
  }

test("renders navbar", async () => {
    render(Navbar, { props: { user: user } })

    expect(screen.getByText("Pimp My Project")).toBeDefined();

});