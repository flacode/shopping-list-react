import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { withRouter } from 'react-router-dom';
import '../setupTests';
import ToggleableItemForm from '../components/listItems/toggleForm';
import ItemForm from '../components/listItems/shoppingListItemForm';

jest.mock('../components/shoppingList/shoppingListForm');

describe('<ToggleableItemForm />', () => {
  let wrapper;
  let button;
  const handleForm = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<ToggleableItemForm handleForm={handleForm} />);
    button = wrapper.find('Button').at(0);
  });
  it('renders without crashing', () => {
    shallow(<ToggleableItemForm />);
  });
  it('has a valid snapshot', () => {
    const component = renderer.create(
      withRouter(<ToggleableItemForm />));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('button click calls`toggle()` and changes the state', () => {
    button.simulate('click', {
      preventDefault: () => {},
    });
    expect(wrapper.instance().state.modal).toBe(true);
  });
  it('`handleSubmit()` calls props with item argument', () => {
    const item = {
      name: 'item1',
      quantity: 2,
      status: false,
      bought_from: 'kampala',
    };
    wrapper.instance().handleFormSubmit(item);
    expect(handleForm).toBeCalledWith(item);
  });
  it('renders create new shopping list item', () => {
    expect(wrapper.containsMatchingElement(
      <ItemForm heading="Add item to shopping list" />,
    )).toBe(true);
  });
  it('renders update shopping list item', () => {
    wrapper = shallow(<ToggleableItemForm updateItem />);
    expect(wrapper.containsMatchingElement(
      <ItemForm heading="Update shopping list item" />,
    )).toBe(true);
  });
});
