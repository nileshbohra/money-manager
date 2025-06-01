import Apexchart from "./ApexCharts";

const ThisMonthAnalysis = () => {
    const sampleChartData = {
        series: [30, 25, 20, 15, 10],
        labels: ['Home', 'Food', 'Travel', 'Health', 'Insurance'],
        type: "donut",
    };

    return (
		<>
			<Apexchart
				id="expense-pie"
				series={sampleChartData.series}
				labels={sampleChartData.labels}
				type={sampleChartData.type}
			/>
		</>
	);
}

export default ThisMonthAnalysis;