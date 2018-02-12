import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import Field from '../components/field';

const handleChange = jest.fn();

describe('<Field />', () => {
  it('renders without crashing', () => {
    shallow(<Field />);
  });
});

describe('Field functionalities', () => {
  const item = 'data';
  let wrapper;
  let input;

  beforeEach(() => {
    wrapper = shallow(<Field onChange={handleChange} />);
    input = wrapper.find('Input').first();
    input.simulate('change', {
      target: { value: item },
    });
  });

  it('should update the state property `value`', () => {
    expect(
      wrapper.state().value,
    ).toEqual(item);
  });

  it('calls `onChange` prop', () => {
    expect(handleChange).toBeCalled();
  });
});
