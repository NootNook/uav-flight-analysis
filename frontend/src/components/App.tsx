import Map from './Map';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Tabs, TabList, TabPanels, Tab, TabPanel, ChakraProvider } from '@chakra-ui/react';
import Dashboard from './Dashboard';
import { chart, mapFullscreen } from './styles.css';
import Chart from './Chart';
import { useState } from 'react';

const queryClient = new QueryClient();

const App = () => {
    const [index, setIndex] = useState(0);

    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <Tabs defaultIndex={0} onChange={(index: number) => setIndex(index)}>
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
                            <Map key={index} className={mapFullscreen} />
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
