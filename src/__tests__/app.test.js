import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import '../setupTests';
import App from '../components/App';

describe('<App />', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
  it('has a valid snapshot', () => {
    const component = renderer.create(
      <App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
