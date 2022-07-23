import TaskForm from './TaskForm'
import { fireEvent, render, screen, waitFor, server } from '@testing-library/react'
import user from '@testing-library/user-event'
import  { Provider } from 'react-redux'; 
import createMockStore from 'redux-mock-store';
import { rest } from 'msw'
import { setupServer } from 'msw/node'




describe("Testing Taskform", () => {

    const mockedTask = {
        title: 'Title',
        status: 'NEW',
        importance: 'HIGH',
        description: 'A description',
    }

    const server = setupServer(
        rest.post("http://localhost:8080/task", (_, res, ctx) => {
        return res.apply(
            ctx.json({
                result: mockedTask
            })
        )
        })
    )


jest.mock("./TaskForm")
const mockStore = createMockStore([]);
const store = mockStore()
beforeEach(() => {
    server.listen()
    render(
        <Provider store={store}>
            <TaskForm />
        </Provider>
    )
})
afterEach(() => {
    server.close()
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
    
    await waitFor(() => {
        expect(
            validationsMessages()
            ).toBeTruthy();
    })
})
})

it("testing http request", () => {
    
})


const clickSubmit = () => {
    return user.click(screen.getByRole('button', { name: /crear/i}))
}

const validationsMessages = () => {
    return screen.getAllByText(/\* el campo es olbigatorio/i)
}