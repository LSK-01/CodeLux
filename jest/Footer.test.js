import { render, screen } from "@testing-library/svelte";
import Footer from "../src/routes/Footer.svelte";

test("exports navItems", async () => {
    render(Footer);

    expect(screen.getByText("Pimp My Project")).toBeDefined();
})