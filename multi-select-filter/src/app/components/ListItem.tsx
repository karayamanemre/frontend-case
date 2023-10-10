import React from "react";

interface ListItemProps {
	item: string;
	isSelected: boolean;
	onSelectItem: (item: string) => void;
}

const ListItem: React.FC<ListItemProps> = ({
	item,
	isSelected,
	onSelectItem,
}) => {
	return (
		<li
			className={`p-4 flex items-center ${
				isSelected ? "bg-blue-100" : "hover:bg-gray-100"
			}`}>
			<input
				type='checkbox'
				checked={isSelected}
				onChange={() => onSelectItem(item)}
				className='mr-2'
			/>
			<span
				onClick={() => onSelectItem(item)}
				className={`font-medium ${
					isSelected ? "text-blue-600" : ""
				} cursor-pointer`}>
				{item}
			</span>
		</li>
	);
};

export default ListItem;
