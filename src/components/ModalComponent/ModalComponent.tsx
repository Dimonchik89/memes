import { Modal, ModalContent, ModalHeader, ModalBody } from '@heroui/modal';
import { Meme } from '../../types';
import Form from '../Form/Form';

interface Props {
	isOpen: boolean;
	onOpenChange: () => void;
	currentMeme: Meme;
}

const ModalComponent: React.FC<Props> = ({ isOpen, onOpenChange, currentMeme }) => {
	return (
		<>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Edit Meme</ModalHeader>
							<ModalBody>
								<Form currentMeme={currentMeme} onClose={onClose} />
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default ModalComponent;
