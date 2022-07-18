import { Error404 } from './Error404'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'


describe("Testing not Found", () => {


it("Testing views", () => {
render(<Error404 />)
    screen.getByRole('heading', {
        name: /página no encontrada/i
      })

})

})