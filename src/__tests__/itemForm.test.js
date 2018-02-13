import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { withRouter } from 'react-router-dom';
import '../setupTests';
import ItemForm from '../components/listItems/shoppingListItemForm';

describe('<ItemForm />', () => {
  let wrapper;
  let button;
  const handleFormSubmitted = jest.fn();
  const handleToggle = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <ItemForm
        handleFormSubmitted={handleFormSubmitted}
        handleToggle={handleToggle}
      />);
    button = wrapper.find('Button').at(0);
  });
  it('renders without crashing', () => {
    shallow(<ItemForm />);
  });
  it('has a valid snapshot', () => {
    const component = renderer.create(
      withRouter(<ItemForm />));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  describe('validations', () => {
    let nameValidate;
    let quantityValidate;
    let boughtFromValidate;
    beforeEach(() => {
      nameValidate = wrapper.find('Field').at(0).prop('validate');
      quantityValidate = wrapper.find('Field').at(1).prop('validate');
      boughtFromValidate = wrapper.find('Field').at(2).prop('validate');
    });

    it('`validate()` with valid name', () => {
      expect(nameValidate('item1')).toBe(false);
    });
    it('`validate()` with invalid name', () => {
      expect(nameValidate('@_ajkjkfj')).toEqual('Name should contain only numbers and letters');
    });
    it('`validate()` with valid quantity', () => {
      expect(quantityValidate('1')).toBe(false);
    });
    it('`validate()` with invalid quantity', () => {
      expect(quantityValidate('-1')).toEqual('Quantity should be a positive number.');
    });
    it('`validate()` with valid location name', () => {
      expect(boughtFromValidate('kampala')).toBe(false);
    });
    it('`validate()` with invalid location anme', () => {
      expect(boughtFromValidate('@sumarmarket')).toEqual('Location should contain only numbers and letters');
    });
  });
  it('`checkbox` toggles state', () => {
    const checkbox = wrapper.find('Input').at(0);
    checkbox.simulate('change');
    expect(wrapper.state().fields.status).toBe(true);
  });
  it('`handleInputChange()` changes state', () => {
    wrapper.instance().handleInputChange({ name: 'name', value: 'item1', error: false });
    expect(wrapper.state().fields.name).toEqual('item1');
  });
  it('`validate()` returns true with form errors', () => {
    wrapper.instance().handleInputChange({
      name: 'name',
      value: 'item1',
      error: 'Name should contain only numbers and letters',
    });
    expect(wrapper.instance().validate()).toBe(true);
  });
  it('`validate()` returns false without form errors', () => {
    wrapper.instance().handleInputChange({ name: 'name', value: 'item1', error: false });
    expect(wrapper.instance().validate()).toBe(false);
  });

  describe('Form submit', () => {
    beforeEach(() => {
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
