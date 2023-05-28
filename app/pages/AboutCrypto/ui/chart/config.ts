import { Chart as ChartJS, CategoryScale, ChartOptions, Filler, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);


export const options: ChartOptions<"line"> = {
    responsive: true,
    interaction: {
        intersect: false,
        mode: "index",
    },
    plugins: {
        legend: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
    },
};

