import React from 'react';
import { shallow } from 'enzyme';
import '../setupTests';
import Field from '../components/field';

describe('<Field />', () => {
  it('renders without crashing', () => {
    shallow(<Field />);
  });
  describe('Field fucntionalities', () => {
    const item = 'data';
    let wrapper;
    let input;
    beforeEach(() => {
      input = wrapper.find('Input').first();
      input.simulate('change', {
        target: { value: item },
      });
      it('should update the state property `value`', () => {
        expect(
          wrapper.state().value,
        ).toEqual(item);
      });
      it('indicate no `error` if there is none', () => {
        input.simulate('change', {
          target: { value: item },
          state: { error: false },
        });
        expect(
          wrapper.find('FormFeedback').first().length,
        ).toBe(0);
      });
      it('show form feedback if there is an error', () => {
        input.simulate('change', {
          target: { value: item },
          state: { error: 'Invalid name' },
        });
        expect(
          wrapper.find('FormFeedback').first().length > 0,
        ).toBe(true);
      });
    });
  });
});
