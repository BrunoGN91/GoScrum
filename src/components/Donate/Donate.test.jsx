import { render, screen } from '@testing-library/react'
import {Donate} from "./Donate";

describe('renderizado Donate', () => {
    it("renders an h1", () => {
        render(
            <Donate />
        )
        expect(screen.getByRole("heading", {level: 1, name: "Colabora con el proyecto"})).toBeInTheDocument()
    })
    
    it("renders an a tag", () => {
        render(
            <Donate />
        )
        expect(screen.getByRole("link")).toHaveAttribute("href", 'https://mpago.la/1qq2xkG')
    })

    it("renders an a tag with blank target", () => {
        render(
            <Donate />
        )
        expect(screen.getByRole("link")).toHaveAttribute("target", "_blank")
    })
})

