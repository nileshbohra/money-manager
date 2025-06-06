import React, { useEffect, useState } from "react";
import SixMonthsAnalysis from "./SixMonthsAnalysis";
import ThisMonthAnalysis from "./ThisMonthAnalalysis";
import { getAnalysis } from "../../api/analysis";
import { useNavigate } from "react-router-dom";

const Apexcharts = () => {
	const navigate = useNavigate();
	const [analysisData, setAnalysisData] = useState([]);
	useEffect(() => {
		getAnalysis()
			.then((data) => {
				setAnalysisData(data);
			})
			.catch((error) => {
				navigate("/login");
			});
	}, []);

	return (
		<>
			<div className="min-h-screen text-white flex items-start justify-center bg-gray-800">
				<div className="flex flex-col w-full">
					<h1 className="text-xl font-bold mb-4 pl-20 text-center mb-10 mt-10">
						Expense Overview
					</h1>
					<div className="flex justify-center space-x-20">
						<ThisMonthAnalysis />
						<SixMonthsAnalysis />
					</div>
				</div>
			</div>
		</>
	);
};

export default Apexcharts;
