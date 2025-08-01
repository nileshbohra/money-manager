import SixMonthsAnalysis from "./SixMonthsAnalysis";
import ThisMonthAnalysis from "./ThisMonthAnalalysis";

const Apexcharts = () => {
	return (
		<>
			<div
				className="min-h-screen text-white flex items-start justify-center bg-gray-800"
			>
				<div
					className="flex flex-col w-full"
				>
					<h1 className="text-xl font-bold mb-4 mx-16 text-left mt-10">
						Dummy Dashboard
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
