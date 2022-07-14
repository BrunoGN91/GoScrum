import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import  Login  from "./Login";
import { MemoryRouter } from 'react-router-dom'
import createMockStore from 'redux-mock-store';
import  { Provider } from 'react-redux'; 
import user from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';




describe ("Login Component", () => {
const onSubmit = jest.fn()
const initialValues = jest.fn()
const props = {
    onSubmit,
    initialValues
}
const mockStore = createMockStore([]);

const state = {
    userName: '',
    token: '',
    error: ''
}
const store = mockStore(state);

beforeEach(() => {
    onSubmit.mockClear();
    render(
        <Provider store={store}>
            <Login {...props} />
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
            fireEvent.click(button)
          })
          
         await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1)
        })
    
        expect(onSubmit).toHaveBeenCalledWith({lazy: true})
  
    
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