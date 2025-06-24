const Modal = ({
	headingText,
	setAccountform,
	accountForm,
	handleSave,
	clearValues,
	handleChange,
}) => {
	return (
		<>
			<div
				className="relative z-10"
				aria-labelledby="modal-title"
				role="dialog"
				aria-modal="true"
			>
				{/* Background overlay */}
				<div
					className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"
					aria-hidden="true"
				></div>

				{/* Modal Container */}
				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 sm:p-0">
						{/* Modal Box */}
						<div className="relative bg-white rounded-lg shadow-xl transform transition-all sm:max-w-lg w-full">
							{/* Modal Content */}
							<div className="p-6">
								{/* Modal Heading */}
								<h1 className="text-xl font-bold text-gray-800 mb-4">
									{headingText}
								</h1>
								<form onSubmit={handleSave}>
									<div className="mb-6">
										<input
											value={accountForm.account_name}
											onChange={handleChange}
											type="text"
											name="account_name"
											placeholder="Account name"
											className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
										/>
									</div>
									<div className="mb-6">
										<input
											value={accountForm.balance}
											onChange={handleChange}
											type="number"
											name="balance"
											placeholder="Account Balance"
											className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
										/>
									</div>
									<div className="flex justify-end space-x-4">
										<button
											onClick={clearValues}
											className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:ring-2 focus:ring-gray-500"
											type="button"
										>
											Cancel
										</button>
										<button
											className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
											type="submit"
										>
											Save
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
