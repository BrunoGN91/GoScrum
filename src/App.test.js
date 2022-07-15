import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import App from './App';
import { MemoryRouter } from 'react-router-dom'




const mockStore = createMockStore([]);

const state = {
    userName: '',
    token: '',
    error: ''
}
const store = mockStore(state);
beforeEach(() => {
    render(
        <Provider store={store}>
          <App />
        </Provider>, {wrapper: MemoryRouter}
      );
})
test('renders app with mock store', () => {
  
  expect.toHaveClass('App');
});