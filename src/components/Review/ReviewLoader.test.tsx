import { render } from '@testing-library/react';

import { ReviewLoader } from './ReviewLoader';

it('matches snapshot', () => {
  const { container } = render(<ReviewLoader />);
  expect(container).toMatchSnapshot();
});
