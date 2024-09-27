import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import store from '../../redux/store';

import RegisterScreen from '../../components/auth/Register';

describe('To test Signup component', () => {
  let signup;
  beforeAll(async () => {
    signup = renderer
      .create(
        <Provider store={store}>
          <Router>
            <RegisterScreen />
          </Router>
        </Provider>,
      )
      .toJSON();
  });

  it('The component should render', () => {
    expect(signup).toBeTruthy();
  });

  it('It should match the related snapshot', () => {
    expect(signup).toMatchSnapshot();
  });

  it('Should have a button with sign up text', () => {
    const btn = screen.findByTestId('submit');
    waitFor(() => expect(btn).toHaveTextContent('Sign up'));
  });

  it('renders all form fields', () => {
    waitFor(() => expect(screen.getByLabelText('Name')).toBeInTheDocument());
    waitFor(() => expect(screen.getByLabelText('Email')).toBeInTheDocument());
    waitFor(() => expect(screen.getByLabelText('Password')).toBeInTheDocument());
    waitFor(() => expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument());
  });
});
