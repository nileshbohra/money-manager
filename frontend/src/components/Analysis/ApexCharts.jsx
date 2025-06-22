import Chart from "react-apexcharts";
const Apexchart = ({ id, labels, series, type }) => {
	const chartData = {
		options: {
			chart: {
				id: id,
			},
		},
	};

	if (type == "donut") {
		chartData.options.labels = labels;
		chartData.series = series;
	}
	if (type == "bar") {
		chartData.options.xaxis = {
			categories: labels,
		};
		chartData.series = [
			{
				name: "series-1",
				data: series,
			},
		];
	}

	return (
		<div className="flex h-full w-full mt-4 justify-center items-end">
			<Chart
				options={chartData.options}
				type={type}
				width="400"
				series={chartData.series}
			/>
		</div>
	);
};

export default Apexchart;
