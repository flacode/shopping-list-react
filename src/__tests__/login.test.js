import React from 'react';
import { withRouter } from 'react-router-dom';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import '../setupTests';
import LoginForm from '../components/account/loginForm';
import Client from '../client';

jest.mock('../client');

describe('<LoginForm />', () => {
  let wrapper;
  let button;
  beforeEach(() => {
    wrapper = shallow(<LoginForm />);
    button = wrapper.find('Button').at(0);
  });
  it('renders without crashing', () => {
    shallow(<LoginForm />);
  });
  it('has a valid snapshot', () => {
    const component = renderer.create(
      withRouter(<LoginForm />));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('contains Login heading', () => {
    expect(
      wrapper.containsMatchingElement(
        <h3> Login</h3>),
    ).toBe(true);
  });
  it('Makes API call', () => {
    wrapper.instance().handleInputChange({ name: 'username', value: 'joan', error: false });
    wrapper.instance().handleInputChange({ name: 'password', value: '123456780', error: false });
    button.simulate('click', {
      preventDefault: () => {},
    });
    const apiCall = Client.loginUser.mock.calls;
    expect(apiCall[0][0].username.length > 0).toBe(true);
  });
  it('`successServer()` sets localStorage username', () => {
    wrapper.instance().handleInputChange({ name: 'username', value: 'joan', error: false });
    wrapper.instance().successServer('Login message');
    expect(localStorage.getItem('username')).toEqual('joan');
  });
  it('`errorServer()` sets error message', () => {
    wrapper.instance().errorServer('Network error');
    expect(wrapper.state().server.message).toEqual('Network error');
  });
  afterEach(() => {
    Client.registerUser.mockClear();
  });
});
