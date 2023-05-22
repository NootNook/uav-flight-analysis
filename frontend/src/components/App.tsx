import { app, metrics } from './styles.css';
import Chart from './Chart';
import Menu from './ParserMenu';
import Map from './Map';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <div className={app}>
                <Map />
                <div className={metrics}>
                    <Chart />
                    <Menu />
                </div>
            </div>
        </QueryClientProvider>
    );
};

export default App;
