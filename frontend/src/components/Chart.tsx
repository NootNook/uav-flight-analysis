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
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
);

const Chart = () => {
    const [parserOptions] = useAtom(parserOptionsAtom);
    const query = useQuery({
        queryKey: ['altitude', parserOptions],
        queryFn: async () => fetchAltitude(parserOptions.environnement, parserOptions.filename),
        refetchOnWindowFocus: false,
    });

    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time in milliseconds',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Altitude in meters',
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Altiude as a function of milliseconds',
            },
            zoom: {
                zoom: {
                    drag: {
                        enabled: true,
                    },
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'xy' as const,
                },
            },
        },
        elements: {
            point: { radius: 1 },
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
                label: 'Altitude in meters',
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
