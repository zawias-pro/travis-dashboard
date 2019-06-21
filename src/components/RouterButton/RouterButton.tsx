import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';

const AdapterLink = (
  React.forwardRef(
    (props, ref) => (
      // @ts-ignore
      <Link innerRef={ref} {...props} />
    ),
  )
);

interface RouterButtonProps extends ButtonProps {
  to: string;
}

const RouterButton: React.FC<RouterButtonProps> = ({
  to,
  // tslint:disable-next-line:trailing-comma
  ...buttonProps
}) => (
  // @ts-ignore
  <Button {...buttonProps} component={AdapterLink} to={to} />
);

export { RouterButton };
