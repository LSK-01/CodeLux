import { render, screen } from "@testing-library/svelte";
import Footer from "../src/routes/Footer.svelte";

test("renders footer correctly", async () => {
    render(Footer);

    expect(screen.getByText("CodeLux")).toBeDefined();
})