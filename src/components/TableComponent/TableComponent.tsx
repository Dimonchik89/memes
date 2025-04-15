import React, { useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table';
import { Meme, MemeKeys } from '../../types';
import { EditIcon } from '../EditIcon/EditIcon';
import { Tooltip } from '@heroui/tooltip';
import { Button } from '@heroui/button';
import { useDisclosure } from '@heroui/modal';
import ModalComponent from '../ModalComponent/ModalComponent';

interface Props {
	data: Meme[];
}

const TableComponent: React.FC<Props> = ({ data }) => {
	const [currentMeme, setCurrentMeme] = useState<Meme>();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const keys = Object.keys(data[0]);
	keys.push('Actions');
	const obj = keys.map((item) => ({ key: item, label: item }));

	const handleClick = (data: Meme) => {
		setCurrentMeme(data);
		onOpen();
	};

	const renderCell = React.useCallback((item: Meme, columnKey: MemeKeys) => {
		const cellValue = columnKey === 'Actions' ? null : item[columnKey];

		switch (columnKey) {
			case 'Actions':
				return (
					<div className="relative flex items-center gap-2">
						<Tooltip content="Edit user">
							<Button size="sm" color="primary" onPress={() => handleClick(item)}>
								<EditIcon />
							</Button>
						</Tooltip>
					</div>
				);
			default:
				return cellValue;
		}
	}, []);

	return (
		<>
			<Table aria-label="Example table with dynamic content">
				<TableHeader columns={obj}>{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}</TableHeader>
				<TableBody items={data}>{(item) => <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey as MemeKeys)}</TableCell>}</TableRow>}</TableBody>
			</Table>
			<ModalComponent isOpen={isOpen} onOpenChange={onOpenChange} currentMeme={currentMeme as Meme} />
		</>
	);
};

export default TableComponent;
