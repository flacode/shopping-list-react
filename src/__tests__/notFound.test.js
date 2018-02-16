import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';
import '../setupTests';
import NotFound from '../components/notFound';

describe('<NotFound />', () => {
  it('renders without crashing', () => {
    shallow(<NotFound />);
  });
  it('Contains link back home', () => {
    const wrapper = shallow(<NotFound />);
    expect(
      wrapper.containsMatchingElement(
          <Link>Back to home</Link>,
      )).toBe(true);
  });
});
