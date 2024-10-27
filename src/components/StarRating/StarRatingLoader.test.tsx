import { render } from '@testing-library/react';

import { StarRatingLoader } from './StarRatingLoader';

it('matches snapshot', () => {
  const { container } = render(<StarRatingLoader />);
  expect(container).toMatchSnapshot();
});
