import { render, screen } from '@testing-library/react'
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
    const onSubmit = jest.fn()
    const initialValues = jest.fn()
    const props = {
        onSubmit,
        initialValues,
    }

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
    

const mockStore = createMockStore([])

const state = {
    validate: false,
    userName: '',
    error: ''
}
const store = mockStore(state);

beforeEach(() => {
    onSubmit.mockClear();
    render (
        <Provider store={store}>
             <Register {...props}/>
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

// it("testing validations", () => {
    
//    const userName = screen.getByRole('textbox', {
//     name: /nombre de usuario/i
//   });

//   user.type(userName, "Bruno")
    
// })

})