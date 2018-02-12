import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { withRouter } from 'react-router-dom';
import '../setupTests';
import ToggleableShoppingListForm from '../components/shoppingList/toggleForm';
import ShoppingListForm from '../components/shoppingList/shoppingListForm';

jest.mock('../components/shoppingList/shoppingListForm');

describe('<ToggleableShoppingListForm />', () => {
  let wrapper;
  let button;
  const handleForm = jest.fn();
  beforeEach(() => {
    wrapper = shallow(<ToggleableShoppingListForm handleForm={handleForm} />);
    button = wrapper.find('Button').at(0);
  });
  it('renders without crashing', () => {
    shallow(<ToggleableShoppingListForm />);
  });
  it('has a valid snapshot', () => {
    const component = renderer.create(
      withRouter(<ToggleableShoppingListForm />));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('button click calls`toggle()` and changes the state', () => {
    button.simulate('click', {
      preventDefault: () => {},
    });
    expect(wrapper.instance().state.modal).toBe(true);
  });
  it('`handleSubmit()` calls props with shopping argument', () => {
    const shoppingList = { name: 'listname', due_date: '2018-09-05' };
    wrapper.instance().handleFormSubmit(shoppingList);
    expect(handleForm).toBeCalledWith(shoppingList);
  });
  it('renders create new shopping list', () => {
    expect(wrapper.containsMatchingElement(
      <ShoppingListForm heading="Create new shopping list" />,
    )).toBe(true);
  });
  it('renders update shopping list', () => {
    wrapper = shallow(<ToggleableShoppingListForm updateList />);
    expect(wrapper.containsMatchingElement(
      <ShoppingListForm heading="Update shopping list" />,
    )).toBe(true);
  });
});
