import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { withRouter } from 'react-router-dom';
import '../setupTests';
import RegistrationForm from '../components/account/registrationForm';
import Client from '../client';

jest.mock('../client');

describe('<RegistrationForm />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RegistrationForm />);
  });
  it('renders without crashing', () => {
    shallow(<RegistrationForm />);
  });
  it('has a valid snapshot', () => {
    const component = renderer.create(
      withRouter(<RegistrationForm />));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('contains sign up heading', () => {
    expect(
      wrapper.containsMatchingElement(
        <h3>Sign up</h3>),
    ).toBe(true);
  });
  it('contains sign up form', () => {
    expect(
      wrapper.find('Form').length).toBe(1);
  });
  it('`Submit is disabled`', () => {
    const button = wrapper.find('Button').first();
    expect(button.props().disabled).toBe(true);
  });

  describe('Test when user enters incomplete input', () => {
    beforeEach(() => {
      wrapper.instance().onInputChange({ name: 'username', value: 'joan', error: false });
    });
    it('`onInputChange()` updates state', () => {
      expect(
        wrapper.state().fields.username,
      ).toEqual('joan');
    });
    it('`onReset()` clears the state', () => {
      const button = wrapper.find('Button').at(1);
      button.simulate('click', {
        preventDefault: () => {},
      });
      expect(
        wrapper.state().fields.username,
      ).toEqual('');
    });
    it('`Submit button` is disabled with incomplete form data', () => {
      const button = wrapper.find('Button').at(0);
      button.simulate('click', {
        preventDefault: () => {},
      });
      expect(button.props().disabled).toBe(true);
    });

    describe('User eneters complete registration data', () => {
      let button;
      beforeEach(() => {
        button = wrapper.find('Button').at(0);
        wrapper.instance().onInputChange({ name: 'email', value: 'joan@gmail.com', error: false });
        wrapper.instance().onInputChange({ name: 'password', value: '123456789', error: false });
      });
      it('`Submit button` is disabled with an error in form data', () => {
        wrapper.instance().onInputChange({ name: 'confirmPassword', value: '123456780', error: true });
        button.simulate('click', {
          preventDefault: () => {},
        });
        expect(button.props().disabled).toBe(true);
      });
      it('Makes API call', () => {
        wrapper.instance().onInputChange({ name: 'confirmPassword', value: '123456780', error: false });
        button.simulate('click', {
          preventDefault: () => {},
        });
        const apiCall = Client.registerUser.mock.calls;
        expect(apiCall[0][0].username.length > 0).toBe(true);
      });
      afterEach(() => {
        Client.registerUser.mockClear();
      });
    });
  });
  afterEach(() => {
    Client.registerUser.mockClear();
  });
});

