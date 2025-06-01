const TransactionFilter = ({
	categories,
	filterCategoryID,
	setFilterCategoryID,
	onFilter,
}) => {
	return (
		<div className="flex justify-between items-center mb-6">
			<div className="">
				<label
					htmlFor="category"
					className="block text-sm font-medium text-gray-700 mb-2"
				>
					Filter by Category
				</label>
				<select
					id="category"
					value={filterCategoryID}
					onChange={(e) => setFilterCategoryID(e.target.value)}
					className="w-full p-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				>
					<option value="">All Categories</option>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.category_name}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default TransactionFilter;
