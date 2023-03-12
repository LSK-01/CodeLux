import { render, screen } from "@testing-library/svelte";
import { compile } from "svelte/compiler";

// Allows Jest to use Svelte compiler
function svelte(strings) {
  return eval(
    compile(
      strings.join(""),
      { format: "cjs", dev: true, accessors: true }
    ).js.code
  );
}

test("uses a slot for tile contents", async () => {
    render(svelte`
      <script>
        import Tile from "../src/routes/add/components/Tile.svelte";
      </script>
  
      <Tile>This is a tile</Tile>
    `);

    const component = screen.getByText("This is a tile");
  
    expect(component).toBeDefined();

    expect(component.getAttribute("class")).toContain("tile");
});

test("has correct div classname", async () => {
    render(svelte`
      <script>
        import Tile from "../src/routes/add/components/Tile.svelte";
      </script>
  
      <Tile>This is a tile</Tile>
    `);
    
    const component = screen.getByText("This is a tile");

    expect(component.getAttribute("class")).toContain("tile");
})