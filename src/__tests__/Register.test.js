import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { withRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '../setupTests';
import RegistrationForm from '../components/account/registrationForm';
import Client from '../client';

jest.mock('../client');
const history = createMemoryHistory('/login');
history.push = jest.fn();

describe('<RegistrationForm />', () => {
  let wrapper;
  beforeEach(() => {
    localStorage.setItem('token', 'dhdhjdhjdhfdhdhjdhj');
    wrapper = shallow(<RegistrationForm history={history} />);
  });
  it('renders without crashing', () => {
    shallow(<RegistrationForm />);
  });
  it('has a valid snapshot with token', () => {
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

  describe('validations', () => {
    let usernameValidate;
    let emailValidate;
    let passwordValidate;
    let confirmPasswordValidate;
    beforeEach(() => {
      usernameValidate = wrapper.find('Field').at(0).prop('validate');
      emailValidate = wrapper.find('Field').at(1).prop('validate');
      passwordValidate = wrapper.find('Field').at(2).prop('validate');
      confirmPasswordValidate = wrapper.find('Field').at(3).prop('validate');
    });
    it('`validate()` with valid username', () => {
      expect(usernameValidate('joan')).toBe(false);
    });
    it('`validate()` with invalid username', () => {
      expect(usernameValidate('@_ajkjkfj')).toEqual('Username should contain only letters and numbers');
    });
    it('`validate()` with valid email', () => {
      expect(emailValidate('joan@gmail.com')).toBe(false);
    });
    it('`validate()` with invalid email', () => {
      expect(emailValidate('joangmail.com')).toEqual('Invalid Email');
    });
    it('`validate()` with valid password', () => {
      expect(passwordValidate('1234567890')).toBe(false);
    });
    it('`validate()` with invalid password', () => {
      expect(passwordValidate('12345')).toEqual('Password should be atleast 8 characters long');
    });
    it('`validate()` with similar confirm password', () => {
      wrapper.state().fields.password = '123456789';
      expect(confirmPasswordValidate('123456789')).toEqual(false);
    });
    it('`validate()` with similar confirm password', () => {
      wrapper.state().fields.password = '123456789';
      expect(confirmPasswordValidate('1234abcd')).toEqual('Passwords do not match');
    });
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

    describe('User enters complete registration data', () => {
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
      it('`successServer()` redirects to login', () => {
        wrapper.instance().successServer('Successfully logged in');
        expect(history.push).toBeCalledWith('/login');
      });
      it('`errorServer()` sets error state to true', () => {
        wrapper.instance().errorServer('Server error');
        expect(wrapper.state().server.error).toBe(true);
      });
      afterEach(() => {
        Client.registerUser.mockClear();
      });
    });
  });

  // it('redirects when there is no token')
  afterEach(() => {
    Client.registerUser.mockClear();
  });
});

