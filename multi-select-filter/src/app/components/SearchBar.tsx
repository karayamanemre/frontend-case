"use client";
import Image from "next/image";
import SearchIcon from "@/app/assets/search.svg";

interface SearchBarProps {
	onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	return (
		<div className='relative w-full max-w-md mx-auto'>
			<input
				type='text'
				onChange={(e) => onSearch(e.target.value)}
				placeholder='Kategori Ara...'
				className='p-2 border border-gray-300 rounded mb-4 w-full'
			/>
			<Image
				src={SearchIcon}
				className='absolute right-2 top-5 transform -translate-y-1/2 h-4 w-4'
				alt='Search Icon'
			/>
		</div>
	);
};

export default SearchBar;
