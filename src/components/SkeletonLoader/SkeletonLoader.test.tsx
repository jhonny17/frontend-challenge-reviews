import { render } from '@testing-library/react';

import SkeletonLoader from './SkeletonLoader';

it('matches snapshot', () => {
  const { container } = render(<SkeletonLoader />);
  expect(container).toMatchSnapshot();
});
