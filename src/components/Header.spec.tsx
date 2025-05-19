import {render, screen} from "@testing-library/react";
import {describe, expect, it} from "vitest";
import {Header} from "./Header";

describe("Header Component", () => {
    it("renders the PokéMarket logo", () => {
        render(<Header/>);
        const logo = screen.getByText("PokéMarket Nocturno");
        expect(logo).toBeInTheDocument();
    });
});
