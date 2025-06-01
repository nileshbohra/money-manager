import React, { useEffect, useState } from "react";
import SixMonthsAnalysis from "./SixMonthsAnalysis";
import ThisMonthAnalysis from "./ThisMonthAnalalysis";
import { getAnalysis } from "../../api/analysis";

const Apexcharts = () => {
	useEffect(() => {
		getAnalysis();
	}, []);

	return (
		<>
			<div className="min-h-screen text-white flex items-center justify-center bg-gray-800">
				<div>
					<h1 className="text-xl font-bold mb-4 pl-20 text-center mb-10 mt-10">
						Expense Overview
					</h1>
					<div className="flex space-x-20">
						<ThisMonthAnalysis />
						<SixMonthsAnalysis />
					</div>
				</div>
			</div>
		</>
	);
};

export default Apexcharts;
