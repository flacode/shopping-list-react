import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { withRouter } from 'react-router-dom';
import '../setupTests';
import Client from '../client';
import ShoppingListDashBoard from '../components/shoppingList/shoppingList';

jest.mock('../client');

describe('<ShoppingListDashBoard />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ShoppingListDashBoard />);
  });
  it('renders without crashing', () => {
    shallow(<ShoppingListDashBoard />);
  });
  it('has a valid snapshot', () => {
    const component = renderer.create(
      withRouter(<ShoppingListDashBoard />));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('`create` makes API call', () => {
    const shoppingList = { name: 'listname', due_date: '2018-09-05' };
    const createCall = Client.createShoppingList.mock.calls;
    expect(createCall.length > 0).toBe(false);
    wrapper.instance().handleCreateShoppingList(shoppingList);
    expect(createCall[0][0].name).toEqual('listname');
  });
  it('`get` makes API call', () => {
    const getCall = Client.getShoppingLists.mock.calls;
    expect(getCall.length > 0).toBe(true);
  });
  it('`update` makes API call', () => {
    const shoppingList = { name: 'listname1', due_date: '2018-09-05' };
    const updateCall = Client.updateShoppingList.mock.calls;
    expect(updateCall.length > 0).toBe(false);
    wrapper.instance().handleUpdateShoppingList(3, shoppingList);
    expect(updateCall.length > 0).toBe(true);
  });
  it('` handleChange()` updates state', () => {
    const input = wrapper.find('Input').first();
    input.simulate('change', {
      target: { value: 'key' },
    });
    expect(wrapper.state().searchKey).toEqual('key');
  });
  it('`handleSearch()`, loads lists', () => {
    const form = wrapper.find('form').first();
    const input = wrapper.find('Input').first();
    const getKey = Client.getShoppingLists.mock.calls;
    const calls = getKey.length;
    input.simulate('change', {
      target: { value: 'key' },
    });
    form.simulate('submit', {
      preventDefault: () => {},
    });
    expect(getKey.length).toBeGreaterThan(calls);
  });
  it('`logout` makes API', () => {
    const logoutCall = Client.logoutUser.mock.calls;
    const button = wrapper.find('Button').first();
    expect(logoutCall.length > 0).toBe(false);
    button.simulate('click');
    expect(logoutCall.length > 0).toBe(true);
  });
  it('validate `pageChange()`', () => {
    wrapper.instance().pageChange(4);
    expect(wrapper.state().currentPage).toEqual(4);
  });
  it('`Confirmed delete()` makes API call', () => {
    const deleteCall = Client.deleteShoppingList.mock.calls;
    window.confirm = jest.fn(() => true);
    wrapper.instance().handleDeleteShoppingList(3);
    expect(deleteCall.length > 0).toBe(true);
  });
  it('`UnConfirmed delete()` does not make API call', () => {
    const deleteCall = Client.deleteShoppingList.mock.calls;
    window.confirm = jest.fn(() => false);
    wrapper.instance().handleDeleteShoppingList(3);
    expect(deleteCall.length).toEqual(0);
  });
  afterEach(() => {
    Client.createShoppingList.mockClear();
    Client.getShoppingLists.mockClear();
    Client.updateShoppingList.mockClear();
    Client.deleteShoppingList.mockClear();
    Client.logoutUser.mockClear();
  });
});

