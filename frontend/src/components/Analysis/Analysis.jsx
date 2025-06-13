import React, { useEffect, useState } from "react";
import SixMonthsAnalysis from "./SixMonthsAnalysis";
import ThisMonthAnalysis from "./ThisMonthAnalalysis";
import { getAnalysis } from "../../api/analysis";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Apexcharts = () => {
	const navigate = useNavigate();
	const [analysisData, setAnalysisData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getAnalysis()
			.then((data) => {
				setAnalysisData(data);
				setIsLoading(false);
			})
			.catch((error) => {
				navigate("/login");
			});
	}, []);

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
			)}
		</>
	);
};

export default Apexcharts;
