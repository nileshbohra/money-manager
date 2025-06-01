import React, { useEffect, useState } from "react";
import Apexchart from "./ApexCharts";
import { getAnalysis } from "../../api/analysis";

const ThisMonthAnalysis = () => {
	const [chartData, setChartData] = useState({
		series: [],
		labels: [],
		type: "donut",
	});

	useEffect(() => {
		getAnalysis()
			.then((data) => {
				console.log(data);
				const series = data.map((item) => item.totalSpent);
				const labels = data.map((item) => item.category);
				setChartData({
					series: series,
					labels: labels,
					type: "donut",
				});
			})
			.catch((error) => {
				console.error("Error fetching the data", error);
			});
	}, []);

	return (
		<>
			<Apexchart
				id="expense-pie"
				series={chartData.series}
				labels={chartData.labels}
				type={chartData.type}
			/>
		</>
	);
};

export default ThisMonthAnalysis;
