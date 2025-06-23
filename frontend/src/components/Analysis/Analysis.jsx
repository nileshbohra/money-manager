import React, { useEffect, useState } from "react";
import SixMonthsAnalysis from "./SixMonthsAnalysis";
import ThisMonthAnalysis from "./ThisMonthAnalalysis";
import { getMonthlyAnalysis } from "../../api/analysis";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Apexcharts = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [selectedOption, setSelectedOption] = useState("expense");
	const [monthlyChartData, setMonthlyChartData] = useState({
		series: [],
		labels: [],
		type: "donut",
	});
	const [monthlyHasData, setMonthlyHasData] = useState(false);

	useEffect(() => {
		getMonthlyAnalysis(selectedOption)
			.then((data) => {
				if (data.length > 0) {
					const series = data.map((item) => item.totalSpent);
					const labels = data.map((item) => item.category);
					setMonthlyChartData({
						series: series,
						labels: labels,
						type: "donut",
					});
					setMonthlyHasData(true);
					setIsLoading(false);
				} else {
					setMonthlyHasData(false);
					setIsLoading(false);
				}
			})
			.catch((error) => {
				console.error("Error fetching the data", error);
				navigate("/login");
			});
	}, [selectedOption]);

	return (
		<>
			{isLoading ? (
				<DotLottieReact
					height={100}
					src="https://lottie.host/9b6f79c5-2c2a-43e8-b023-93ef8cfd2a9d/rYqDswSMIi.lottie"
					loop
					autoplay
				/>
			) : (
				<div className="min-h-screen flex items-start justify-center bg-gray-800">
					<div className="flex flex-col w-full">
						<div className="w-full flex justify-around items-center mb-4 mt-4">
							<button
								className={`w-1/2 mx-10 text-xl text-white font-bold text-center p-4 rounded-lg hover:bg-gray-600 ${
									selectedOption === "income"
										? "bg-gray-500"
										: ""
								}`}
								onClick={() => setSelectedOption("income")}
							>
								Income Overview
							</button>
							<button
								className={`w-1/2 mx-10 text-xl text-white font-bold text-center p-4 rounded-lg hover:bg-gray-600 ${
									selectedOption === "expense"
										? "bg-gray-500"
										: ""
								}`}
								onClick={() => setSelectedOption("expense")}
							>
								Expense Overview
							</button>
						</div>
						<div className="flex flex-col gap-10 px-10 justify-center items-center m-5 lg:flex-row lg:justify-around lg:items-stretch">
							<div className="flex flex-col justify-between items-center w-full lg:w-1/2 bg-slate-50 rounded-lg mx-10">
								<ThisMonthAnalysis
									chartData={monthlyChartData}
									hasData={monthlyHasData}
								/>
								<div className="w-full flex justify-center mt-4 bg-slate-200 p-4 rounded-lg">
									<h3 className="font-bold text-gray-700">Monthly Analysis</h3>
								</div>
							</div>
							<div className="flex flex-col justify-between items-center w-full lg:w-1/2 bg-slate-50 rounded-lg mx-10">
								<SixMonthsAnalysis />
								<div className="w-full flex justify-center mt-4 bg-slate-200 p-4 rounded-lg">
									<h3 className="font-bold text-gray-700">Past Six Month's Analysis</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Apexcharts;
