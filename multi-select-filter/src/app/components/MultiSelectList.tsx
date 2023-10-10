"use client";
import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import SearchBar from "./SearchBar";

const MultiSelectList: React.FC = () => {
	const [items, setItems] = useState<string[]>([]);
	const [selectedItems, setSelectedItems] = useState<string[]>(() => {
		if (typeof window !== "undefined") {
			return JSON.parse(localStorage.getItem("selectedItems") || "[]");
		}
		return [];
	});
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);

	const handleSelectItem = (item: string) => {
		if (selectedItems.includes(item)) {
			setSelectedItems((prev) => prev.filter((i) => i !== item));
		} else {
			setSelectedItems((prev) => [item, ...prev]);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					"https://raw.githubusercontent.com/sahinkutlu/frontend-case/main/assets/items.json"
				);
				if (!response.ok) {
					throw new Error("Ağ yanıtı başarısız" + response.statusText);
				}
				const data = await response.json();
				setItems(data.data);
			} catch (error) {
				setError(error as Error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
		}
	}, [selectedItems]);

	return (
		<div className='w-full min-h-[500px] flex flex-col justify-center max-w-md mx-auto bg-gray-100 border-2 rounded-lg shadow p-10 text-center'>
			{loading && <p className='font-semibold'>Yükleniyor...</p>}
			{error && <p className='text-red-500'>Hata: {error.message}</p>}
			{!loading && !error && (
				<>
					<h2 className='text-xl font-semibold mb-4'>Kategoriler</h2>
					<SearchBar onSearch={setSearchTerm} />
					<div className='h-[400px] overflow-auto mb-4'>
						<ul className='divide-y divide-gray-200 p-2'>
							{selectedItems.map((item, index) => (
								<ListItem
									key={index}
									item={item}
									isSelected={true}
									onSelectItem={handleSelectItem}
								/>
							))}
							{items
								.filter(
									(item) =>
										!selectedItems.includes(item) &&
										item.toLowerCase().includes(searchTerm.toLowerCase())
								)
								.map((item, index) => (
									<ListItem
										key={index}
										item={item}
										isSelected={false}
										onSelectItem={handleSelectItem}
									/>
								))}
						</ul>
					</div>
					<button className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>
						Ara
					</button>
				</>
			)}
		</div>
	);
};

export default MultiSelectList;
