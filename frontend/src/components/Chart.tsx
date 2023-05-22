import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { chart } from './styles.css';
import { useQuery } from '@tanstack/react-query';
import { parserOptionsAtom } from '../utils/atoms';
import { useAtom } from 'jotai';
import { fetchAltitude } from '../utils/api';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = () => {
    const [parserOptions] = useAtom(parserOptionsAtom);
    const query = useQuery({
        queryKey: ['altitude'],
        queryFn: async () =>
            fetchAltitude(parserOptions.environnement, parserOptions.filename),
    });

    const options = {
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2,
    };
    const labels = query.data?.map((res) => res.timestamp);
    const data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: query.data?.map((res) => res.altitude),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <div id='testChart' className={chart}>
            <Line options={options} data={data} />
        </div>
    );
};

export default Chart;
