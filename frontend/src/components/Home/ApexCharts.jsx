import Chart from "react-apexcharts";
const Apexchart = ({ id, labels, series, type }) => {
    const chartData = {
        options: {
            chart: {
                id: id
            }
        }

    };
    if (type == "donut") {
        chartData.options.labels = labels;
        chartData.series = series
    }
    if (type == "bar") {
        chartData.options.xaxis = {
            categories: labels
        };
        chartData.series = [
            {
                name: "series-1",
                data: series,
            }
        ]
    }

    return <div className="bg-slate-50 rounded-lg p-4">
        <Chart
            options={chartData.options}
            type={type}
            width="500"
            series={chartData.series}
        />
    </div>
}

export default Apexchart;