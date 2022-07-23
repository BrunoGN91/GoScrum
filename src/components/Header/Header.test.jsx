import Header from './Header'
import { fireEvent, render, screen, waitFor, server } from '@testing-library/react'
import user from '@testing-library/user-event'
import  { Provider } from 'react-redux'; 
import createMockStore from 'redux-mock-store';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { MemoryRouter } from 'react-router-dom';



const mockStore = createMockStore([])

const store = mockStore()

beforeEach(() => {
    render(
        <Provider store={store}>
            <Header />
        </Provider> , {wrapper: MemoryRouter}
    )
})


describe("Testing component", () => {


it("Testing elements", () => {
    // getGoScrum()
    screen.getByRole('button', { name: /doná/i})
})

const getGoScrum = () => {
    return screen.getByText(/go scrum/i)
}

const getDonate = () => {
    return screen.getByRole('button', { name: /doná/i})
}

})