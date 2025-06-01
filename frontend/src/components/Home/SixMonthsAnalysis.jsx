import { useState, useEffect } from 'react';
import Apexchart from './ApexCharts'

const SixMonthsAnalysis = () => {
    // const [category, setCategory] = useState([]);
    useEffect(() => {

    }, [])
    const sampleChartData = {
        series: [30, 40, 45, 100, 49, 60],
        labels: ['jan', 'feb', 'mar', 'apr', 'may','jun'],
        type: "bar",
    };
    return (
		<>
			<Apexchart
				id="expense-bar"
				series={sampleChartData.series}
				labels={sampleChartData.labels}
				type={sampleChartData.type}
			/>
		</>
	);

}

export default SixMonthsAnalysis