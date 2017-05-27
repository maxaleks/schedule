import React from 'react';
import { Button } from 'react-bootstrap';

import './index.scss';

const CustomButton = ({ onClick, type, children, className, ...props }) => (
    <Button onClick={onClick} type={type} className={'custom-button ' + className} {...props}>{children}</Button>
);

export default CustomButton;
