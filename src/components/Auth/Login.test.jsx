import { render, screen } from '@testing-library/react'
import  Login  from "./Login";
import { MemoryRouter } from 'react-router-dom'
import createMockStore from 'redux-mock-store';
import  { Provider } from 'react-redux'; 
import user from '@testing-library/user-event'
import { act } from 'react-dom/test-utils';

const mockStore = createMockStore([]);

const state = {
    userName: "",
    token: "",
    error: ""
}
const store = mockStore(state);


it("validations for login", async () => {
    render(
        <Provider store={store}>
            <Login />
        </Provider>, {
        wrapper: MemoryRouter
      });

    await act(() => {
        const userName = screen.getByRole('textbox', {
            name: /username/i
          })
        const password = screen.getByText(/contraseña/i)
        user.type(userName, "Bruno")
        user.type(password, "1")
        user.click(screen.getByRole("button", {name: "Enviar"}))
    })
     }
)