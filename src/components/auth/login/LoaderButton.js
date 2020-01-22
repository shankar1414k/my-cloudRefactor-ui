import React from 'react';
import { Button } from 'react-bootstrap';
export default ({ isLoading, text, loadingText, className = '', disabled = false, ...props }) => (
	<Button className={`LoaderButton ${className}`} disabled={disabled || isLoading} {...props}>
		{isLoading && 'Loading'}
		{!isLoading ? text : loadingText}
	</Button>
);
