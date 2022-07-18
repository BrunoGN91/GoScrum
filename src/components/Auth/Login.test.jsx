import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import  Login  from "./Login";
import * as formik from 'formik'
import {jest} from '@jest/globals';
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { MemoryRouter } from 'react-router-dom'
import createMockStore from 'redux-mock-store';
import  { Provider } from 'react-redux'; 
import user from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';




describe ("Login Component", () => {

jest.mock("./Login")



const mockSelector = jest.fn()
const mockLogin = jest.fn()
const mockedNavigator = jest.fn()

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom")),
  useNavigate: () => mockedNavigator,
}));

jest.mock('react-redux', () => ({
    useSelector: mockSelector.mockImplementation(selector => selector()),
  }));
jest.mock('../../store/selectors/selectors.js', () => ({
    loginSelectors: mockLogin.mockReturnValue("LoginSelector"),
  }));
const mockStore = createMockStore([]);
const state = {
    userName: 'NuevoUsuario',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Ik51ZXZvVXN1YXJpb0B1c3VhcmlvLmNvbSIsInJvbGUiOiJUZWFtIExlYWRlciIsInVzZXJOYW1lIjoiTnVldm9Vc3VhcmlvIiwidGVhbUlkIjoiOWIzM2M2ZmYtZjE3Zi00YzhmLWI3NGMtM2U3MmNjY2FkZDUxIiwidXNlcklkIjoiNjJjNWQyMjU3ZGM5Nzg3MzQ3NzgwMDMyIiwiaWF0IjoxNjU4MTY4NDA1LCJleHAiOjE2NTgyNTQ4MDV9.c85jeamfZwmMJN-mT08Sxynx8o5ExGH1fMtYOszXG0o',
    error: 'Error'
}
const store = mockStore({
    loginReducer: state
});

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
const onSubmit = jest.fn()
beforeEach(() => {
    onSubmit.mockClear()
    render(
        <Provider store={store}>
            <Login />
        </Provider>, {
        wrapper: MemoryRouter
      });
})

it("Testing onSubmit", async () => { 
    
    const userName = screen.getByRole('textbox', {
        name: /username/i
    })
    const password = screen.getByText(/contraseña/i)
    const button = screen.getByRole('button', {
        name: /enviar/i
    })
    act(() => {
        user.type(userName, "NuevoUsuario")
        user.type(password, "1234")
        user.click(button)
    })
          
    await waitFor(() => {
        expect(button).toHaveBeenCalledTimes(1)
    })
    
    expect(button).toHaveBeenCalledWith({lazy: true})

     }
)

// it("testing validations", async () => {
//     render(
//         <Provider store={store}>
//             <Login />
//         </Provider>, {
//         wrapper: MemoryRouter
//       });
//     clickSubmitForm()
//     await waitFor(() =>{
//          expect(screen.getByText("/\* el campo es olbigatorio/i").toBeInTheDocument())
//      })
// })

const clickSubmitForm = () => {
    return user.click(screen.getByRole("button", {name: "Enviar"}))
}

})