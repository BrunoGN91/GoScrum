import { render, screen } from '@testing-library/react'
import { Register } from "./Register";
import { MemoryRouter } from 'react-router-dom'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// const server = setupServer(
//     rest.get("http://localhost:8080/auth/data", (_, res, ctx) => {
//     return res.apply(
//         ctx.json({
//             result: {
//                 continente: ["America", "Europa", "Otro"],
//                 region: ["Otro", "Latam", "Brasil", "America del Norte"],
//                 Rol: ["Team Member", "Team Leader"]
//             }
//         })
//     )
//     })
// )

// beforeAll(() => server.listen())
// afterAll(() => server.close())

it("fetch options", async () => {
    render (<Register />, {wrapper: MemoryRouter})

    expect(
        screen.getByRole("option", {name: "Seleccionar una opción..."})
    ).toBeInTheDocument()

    expect(
        await screen.findByRole("option", {name: "Europa"})
    ).toBeInTheDocument()
})