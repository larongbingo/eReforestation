import React, { FunctionComponent, useState } from "react";
import { Alert } from "react-bootstrap";

export const DismissibleAlert: FunctionComponent<DismissibleAlertProps> = ({heading, message, variant = "danger"}) => {
  const [show, setShow] = useState(true);

  if(show) {
    return (
      <Alert dismissible variant={variant} onClose={() => setShow(false)}>
        {heading ? <Alert.Heading>{heading}</Alert.Heading> : null}
        <p>{message}</p>
      </Alert>
    );
  }
  return <></>;
};

export interface DismissibleAlertProps {
  heading?: string;
  message: string;
  variant?: | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light';
}
