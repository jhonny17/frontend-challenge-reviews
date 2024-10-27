import { render } from '@testing-library/react';

import { PaginationLoader } from './PaginationLoader';

it('matches snapshot', () => {
  const { container } = render(<PaginationLoader />);
  expect(container).toMatchSnapshot();
});
