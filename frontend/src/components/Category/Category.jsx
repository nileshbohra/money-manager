import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
	editCategory,
	addCategory,
	deleteCategory,
	setCategories,
} from "../../features/category/categorySlice";
import {
	getCategoriesApi,
	addNewCategoryApi,
	editCategoryApi,
	deleteCategoryApi,
} from "../../api/category";

const Category = () => {
	const categories = useSelector((state) => state.category.value);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const isAddModal = location.pathname === "/category/add";
	const isEditModal = !!location.pathname.includes("/category/edit");

	const [categoryForm, setCategoryForm] = useState({
		categoryName: "",
		categoryType: {
			income: false,
			expense: false,
		},
	});
	const [editID, setEditID] = useState(null);

	useEffect(() => {
		getCategoriesApi()
			.then((params) => {
				let data = params.map((el) => {
					let obj = {
						id: el.id,
						name: el.category_name,
						type: el.category_type,
					};
					return obj;
				});
				dispatch(setCategories(data));
			})
			.catch((err) => {
				console.error("Error fetching categories:", err);
				navigate("/login");
			});
	}, []);

	const addNewCategory = async () => {
		if (
			categoryForm.categoryName &&
			(categoryForm.categoryType.income ||
				categoryForm.categoryType.expense)
		) {
			addNewCategoryApi(categoryForm)
				.then((data) => {
					dispatch(addCategory(data));
				})
				.catch((err) => {
					console.error("Error adding category:", err);
				});
		} else {
			alert("All Fields are mendatrory");
		}
	};

	const handleSave = (e) => {
		e.preventDefault();
		if (!!editID) saveEdited(editID);
		else addNewCategory();
		navigate("/category");
		clearValues();
	};

	const clearValues = () => {
		setCategoryForm({
			categoryName: "",
			categoryType: {
				income: false,
				expense: false,
			},
		});
		navigate("/category");
	};

	const handleEdit = (id) => {
		setEditID(id);
		let currCategory = categories.find((category) => id === category.id);

		setCategoryForm({
			categoryName: currCategory.name,
			categoryType: {
				income: currCategory.type == "income" ? true : false,
				expense: currCategory.type == "expense" ? true : false,
			},
		});
		navigate(`category/edit/${id}`);
	};

	const saveEdited = async (id) => {
		editCategoryApi(
			id,
			categoryForm.categoryName,
			categoryForm.categoryType
		)
			.then((params) => {
				let data = params.data;
				dispatch(editCategory(data));
			})
			.catch((err) => {
				console.error("Error editing category:", err);
			});
	};

	const handleDelete = async (id) => {
		deleteCategoryApi(id)
			.then((params) => {
				dispatch(deleteCategory(id));
			})
			.catch((err) => {
				console.error("Error deleting category:", err);
			});
	};

	const handleChange = (e) => {
		const { name, type, value, checked } = e.target;

		if (type == "checkbox") {
			setCategoryForm((prevForm) => ({
				...prevForm,
				categoryType: {
					income: name == "income" ? true : false,
					expense: name == "expense" ? true : false,
				},
			}));
		} else {
			setCategoryForm((prevForm) => ({
				...prevForm,
				[name]: type === "number" ? value : value,
			}));
		}
	};

	return (
		<>
			<div className="min-h-screen flex items-center justify-center bg-gray-800">
				<div className="bg-white w-96 p-6 rounded-md shadow-lg">
					<div className="mb-4">
						<h1 className="text-xl font-bold text-center mb-4">
							Category List
						</h1>
						<ul>
							{categories.length > 0 ? (
								categories.map((category) => (
									<li
										key={category.id}
										className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded-md"
									>
										<span className="font-semibold">
											{category.name} ({category.type})
										</span>
										<div className="flex space-x-4">
											<FaEdit
												className="text-blue-500 cursor-pointer"
												onClick={() =>
													handleEdit(category.id)
												}
											/>
											<FaTrashAlt
												className="text-red-500 cursor-pointer"
												onClick={() =>
													handleDelete(category.id)
												}
											/>
										</div>
									</li>
								))
							) : (
								<p className="text-center text-gray-500">
									No categories added yet.
								</p>
							)}
						</ul>
					</div>

					<div className="text-center mt-6">
						<button
							onClick={() => {
								navigate("/category/add");
							}}
							className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
						>
							+ Add New Category
						</button>
					</div>
				</div>
			</div>
			{(isAddModal || isEditModal) && (
				<Modal
					showModal={isAddModal || isEditModal}
					headingText={`${
						!!isAddModal ? "Add New Category" : "Edit Category"
					}`}
					setCategoryform={setCategoryForm}
					categoryform={categoryForm}
					handleSave={handleSave}
					clearValues={clearValues}
					handleChange={handleChange}
				/>
			)}
		</>
	);
};

export default Category;
