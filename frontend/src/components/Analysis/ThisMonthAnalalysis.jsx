import Apexchart from "./ApexCharts";

const ThisMonthAnalysis = ({chartData, hasData}) => {
	return (
		<>
			{!hasData ? (
				<div
					div
					className="w-1/2 flex justify-center items-center bg-slate-50 rounded-lg p-4 mx-10"
				>
					<div className="text-center">
						<h1 className="text-gray-700 text-2xl font-bold mb-4">
							No data available
						</h1>
						<p className="text-gray-600">
							There is no data available for this month.
						</p>
					</div>
				</div>
			) : (
				<Apexchart
					id="expense-pie"
					series={chartData.series}
					labels={chartData.labels}
					type={chartData.type}
				/>
			)}
		</>
	);
};

export default ThisMonthAnalysis;
