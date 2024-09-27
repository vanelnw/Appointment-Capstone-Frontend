import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';

import Login from '../../components/auth/Login';

describe('Testing Login Component', () => {
  let signin;
  beforeAll(async () => {
    signin = renderer
      .create(
        <Provider store={store}>
          <Router>
            <Login />
          </Router>
        </Provider>,
      )
      .toJSON();
  });

  it('Component should render correctly', () => {
    expect(signin).toBeTruthy();
  });

  it('It should match its snapshot', () => {
    expect(signin).toMatchSnapshot();
  });

  it('It should render the email input field', () => {
    const emailInput = waitFor(() => screen.getByLabelText('Email'));
    waitFor(() => expect(emailInput).toBeInTheDocument());
    waitFor(() => expect(emailInput.type).toBe('email'));
    waitFor(() => expect(emailInput.required).toBe(true));
  });

  it('It should render the password input field', () => {
    const passwordInput = waitFor(() => screen.getByLabelText('Password'));
    waitFor(() => expect(passwordInput).toBeInTheDocument());
    waitFor(() => expect(passwordInput.type).toBe('password'));
    waitFor(() => expect(passwordInput.required).toBe(true));
  });
});
