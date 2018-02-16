import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { withRouter } from 'react-router-dom';
import MockDate from 'mockdate';
import '../setupTests';
import ShoppingListForm from '../components/shoppingList/shoppingListForm';

describe('<ShoppingListForm />', () => {
  let wrapper;
  let button;
  const handleFormSubmitted = jest.fn();
  const handleToggle = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <ShoppingListForm
        handleFormSubmitted={handleFormSubmitted}
        handleToggle={handleToggle}
      />);
    button = wrapper.find('Button').at(0);
  });
  it('renders without crashing', () => {
    shallow(<ShoppingListForm />);
  });
  it('has a valid snapshot', () => {
    const component = renderer.create(
      withRouter(<ShoppingListForm />));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('validations', () => {
    let nameValidate;
    let dateValidate;
    beforeEach(() => {
      MockDate.set('2018-02-10');
      nameValidate = wrapper.find('Field').at(0).prop('validate');
      dateValidate = wrapper.find('Field').at(1).prop('validate');
    });
    it('`validate()` with valid name', () => {
      expect(nameValidate('list1')).toBe(false);
    });
    it('`validate()` with invalid name', () => {
      expect(nameValidate('@_ajkjkfj')).toEqual('Name should contain only numbers and letters');
    });
    it('`validate()` with valid date', () => {
      expect(dateValidate('2018-02-12')).toBe(false);
    });
    it('`validate()` with invalid date', () => {
      expect(dateValidate('2018-02-09')).toEqual('Date should not be before today.');
    });
    afterEach(() => {
      MockDate.reset();
    });
  });

  it('`handleInputChange()` changes state', () => {
    wrapper.instance().handleInputChange({ name: 'name', value: 'listname', error: false });
    expect(wrapper.state().fields.name).toEqual('listname');
  });
  it('`validate()` returns true with form errors', () => {
    wrapper.instance().handleInputChange({ name: 'name', value: 'listname', error: 'invalid list name' });
    expect(wrapper.instance().validate()).toBe(true);
  });
  it('`validate()` returns false without form errors', () => {
    wrapper.instance().handleInputChange({ name: 'name', value: 'listname', error: false });
    wrapper.instance().handleInputChange({ name: 'due_date', value: '2018-05-12', error: false });
    expect(wrapper.instance().validate()).toBe(false);
  });
  describe('Form submit', () => {
    beforeEach(() => {
      wrapper.instance().handleInputChange({ name: 'name', value: 'listname', error: false });
      wrapper.instance().handleInputChange({ name: 'due_date', value: '2018-05-12', error: false });
      button.simulate('click', {
        preventDefault: () => {},
      });
    });
    it('formsubmit action invokes toggle', () => {
      expect(handleToggle).toBeCalled();
    });
    it('form submit invokes submit props', () => {
      expect(handleFormSubmitted).toBeCalled();
    });
  });
});
