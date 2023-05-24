import Map from './Map';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Tabs, TabList, TabPanels, Tab, TabPanel, ChakraProvider } from '@chakra-ui/react';
import Dashboard from './Dashboard';
import { chart, mapFullscreen } from './styles.css';
import Chart from './Chart';

const queryClient = new QueryClient();

const App = () => {
    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <Tabs defaultIndex={0} isLazy={true} lazyBehavior='unmount'>
                    <TabList>
                        <Tab>Dashboard</Tab>
                        <Tab>Map</Tab>
                        <Tab>Charts</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Dashboard />
                        </TabPanel>
                        <TabPanel>
                            <Map className={mapFullscreen} />
                        </TabPanel>
                        <TabPanel>
                            <Chart className={chart} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </QueryClientProvider>
        </ChakraProvider>
    );
};

export default App;
