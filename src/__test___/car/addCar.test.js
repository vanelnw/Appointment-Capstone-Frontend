import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import AddCar from '../../components/car/AddCar';

describe('Test adding new investigator', () => {
  let carAdd;

  beforeAll(async () => {
    carAdd = renderer
      .create(
        <Provider store={store}>
          <Router>
            <AddCar />
          </Router>
        </Provider>,
      )
      .toJSON();
  });

  it('It should render correctly', () => {
    expect(carAdd).toBeTruthy();
  });

  it('Should match its snapshot', () => {
    expect(carAdd).toMatchSnapshot();
  });

  it('It renders the form', () => {
    // to add the data-testid attribute for the form
    const form = screen.findByTestId('add-form');
    waitFor(() => expect(form).toBeInTheDocument());
  });

  it('Should have a button with Add text', () => {
    // to add the data-testid attribute for the button
    const btn = screen.findByTestId('add-btn');
    waitFor(() => expect(btn).toHaveTextContent('Add Car'));
  });
});
