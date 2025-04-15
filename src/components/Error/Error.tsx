import { Alert } from '@heroui/alert';
import React from 'react';

interface Props {
	message: string;
}

const Error: React.FC<Props> = ({ message }) => {
	return (
		<div className="flex items-center justify-center w-full">
			<div className="flex flex-col w-full">
				<div key={'danger'} className="w-full flex items-center my-3">
					<Alert color={'danger'} title={message} />
				</div>
			</div>
		</div>
	);
};

export default Error;
