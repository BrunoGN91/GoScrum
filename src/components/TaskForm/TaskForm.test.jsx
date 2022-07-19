import TaskForm from './TaskForm'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import  { Provider } from 'react-redux'; 
import createMockStore from 'redux-mock-store';


describe("Testing Taskform", () => {

jest.mock("./TaskForm")
const mockStore = createMockStore([]);
const store = mockStore()
beforeEach(() => {
    render(
        <Provider store={store}>
            <TaskForm />
        </Provider>
    )
})


it("Testing rendering", () => {

    screen.getByRole('heading', {
        name: /crear tarea/i
      })
    screen.getByText(/titulo:/i)
    screen.getByLabelText('title_input')
    screen.getByText(/estado:/i)
    screen.getByLabelText('status_select')
    screen.getByText(/importancia:/i)
    screen.getByLabelText('importance_select')
    screen.getByLabelText('description_input')
    screen.getByRole('button', { name: /crear/i})
})

it("Testing Validations", async () => {
    clickSubmit()
    const errorMsg = screen.getByText(/\* el campo es olbigatorio/i)
    await waitFor(() => {
        expect(
            errorMsg
            ).toBeInTheDocument()
    })
    
   
})
})


const clickSubmit = () => {
    return user.click(screen.getByRole('button', { name: /crear/i}))
}