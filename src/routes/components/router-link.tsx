import React, { forwardRef } from 'react';
import Link, { LinkProps } from 'next/link';

// Define the props interface
type RouterLinkProps = LinkProps & React.RefAttributes<HTMLAnchorElement>;

const RouterLink = forwardRef<HTMLAnchorElement, RouterLinkProps>(({ ...other }, ref) => (
  <Link {...other} ref={ref} />
));

RouterLink.displayName = 'RouterLink';

export default RouterLink;
