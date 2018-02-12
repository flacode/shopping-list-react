import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { withRouter } from 'react-router-dom';
import '../setupTests';
import Client from '../client';
import ItemDashBoard from '../components/listItems/shoppingListItems';

jest.mock('../client');
const match = {
  params: {
    listId: 5,
  },
};
describe('<ItemDashBoard/>', () => {
  localStorage.setItem('token', 'dffff');
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ItemDashBoard match={match} />);
  });
  it('renders without crashing', () => {
    shallow(<ItemDashBoard match={match} />);
  });
  it('has a valid snapshot', () => {
    const component = renderer.create(
      withRouter(<ItemDashBoard />));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('`create` makes API call', () => {
    const item = {
      name: 'item1',
      quantity: 1,
      status: false,
      bought_from: 'kampala',
    };
    const createCall = Client.addItems.mock.calls;
    expect(createCall.length).toEqual(0);
    wrapper.instance().handleCreateItem(item);
    expect(createCall.length).toBeGreaterThan(0);
  });
  it('`get` makes API call', () => {
    const getCall = Client.getItems.mock.calls;
    expect(getCall.length).toBeGreaterThan(0);
  });
  it('`update` makes API call', () => {
    const item = {
      name: 'item1',
      quantity: 1,
      status: false,
      bought_from: 'kampala',
    };
    const updateCall = Client.updateItems.mock.calls;
    expect(updateCall.length).toEqual(0);
    wrapper.instance().handleUpdateItem(3, item);
    expect(updateCall.length).toBeGreaterThan(0);
  });
  it('`logout` makes API', () => {
    const logoutCall = Client.logoutUser.mock.calls;
    const button = wrapper.find('Button').first();
    expect(logoutCall.length).toEqual(0);
    button.simulate('click', {
      preventDefault: () => {},
    });
    expect(logoutCall.length).toBeGreaterThan(0);
  });
  it('`Confirmed delete()` makes API call', () => {
    const deleteCall = Client.deleteItems.mock.calls;
    window.confirm = jest.fn(() => true);
    wrapper.instance().handleDeleteItem(3);
    expect(deleteCall.length > 0).toBe(true);
  });
  it('`UnConfirmed delete()` does not make API call', () => {
    const deleteCall = Client.deleteItems.mock.calls;
    window.confirm = jest.fn(() => false);
    wrapper.instance().handleDeleteItem(3);
    expect(deleteCall.length).toEqual(0);
  });
  afterEach(() => {
    Client.addItems.mockClear();
    Client.getItems.mockClear();
    Client.updateItems.mockClear();
    Client.deleteItems.mockClear();
    Client.logoutUser.mockClear();
  });
});

