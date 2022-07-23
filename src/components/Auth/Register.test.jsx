import { render, screen, waitFor } from '@testing-library/react'
import { Register } from "./Register";
import { useFormik } from 'formik'
import { MemoryRouter } from 'react-router-dom'
import user from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import {jest} from '@jest/globals';


const server = setupServer(
    rest.get("http://localhost:8080/auth/data", (_, res, ctx) => {
    return res.apply(
        ctx.json({
            result: {
                continente: ["America", "Europa", "Otro"],
                region: ["Otro", "Latam", "Brasil", "America del Norte"],
                Rol: ["Team Member", "Team Leader"]
            }
        })
    )
    })
)
beforeAll(() => server.listen())
afterAll(() => server.close())

describe("Register Component", () => {
  


    const mockSelector = jest.fn()
    const mockRegister = jest.fn()

    jest.mock('react-redux', () => ({
        useSelector: mockSelector.mockImplementation(selector => selector()),
      }));
    jest.mock('../../store/selectors/selectors.js', () => ({
        registerSelector: mockRegister.mockReturnValue({
            validate: false,
            userName: '',
            error: ''
        }),
      }));

      
// const mockedNavigator = jest.fn()
// jest.mock("react-router-dom", () => ({
//   ...(jest.requireActual("react-router-dom")),
//   useNavigate: () => mockedNavigator,
// }));   


const initialValues = jest.fn()
const state = {
    validate: false,
    userName: "NuevoUsuario",
    error: ""
}
const mockedStore = createMockStore({})

beforeEach(() => {
    
    render (
        <Provider store={mockedStore}>
             <Register />
        </Provider>
       , {wrapper: MemoryRouter})
})
it("fetch options", async () => {
    expect(
        screen.getByRole("option", {name: "Seleccionar una opción..."})
    ).toBeInTheDocument()

    expect(
        await screen.findByRole("option", {name: "Europa"})
    ).toBeInTheDocument()
})

it("testing validations", async () => {
    
   const validations = screen.getAllByText("/\* el campo es olbigatorio/i")

  clickSubmitForm()

    waitFor(() => {
        expect(
            validations
        ).toBeTruthy()
    })
    
})

const clickSubmitForm = () => {
    return user.click(screen.getByRole("button", { name: /enviar/i}))
}

})