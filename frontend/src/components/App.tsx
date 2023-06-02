import Map from './Map';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Tabs, TabList, TabPanels, Tab, TabPanel, ChakraProvider } from '@chakra-ui/react';
import Dashboard from './Dashboard';
import { chartFullscreen, mapFullscreen, tabsHeader } from './styles.css';
import Chart from './Chart';
import { useSetAtom } from 'jotai';
import { indexTabsAtom } from '../utils/atoms';
const queryClient = new QueryClient();

const App = () => {
    const setIndexAtom = useSetAtom(indexTabsAtom);

    const onChange = (index: number) => {
        setIndexAtom(index);
    };

    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <Tabs defaultIndex={0} onChange={onChange} className={tabsHeader}>
                    <TabList>
                        <Tab>Dashboard</Tab>
                        <Tab>Map</Tab>
                        <Tab>Charts</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel padding={0}>
                            <Dashboard />
                        </TabPanel>
                        <TabPanel padding={0}>
                            <Map idTab={1} className={mapFullscreen} />
                        </TabPanel>
                        <TabPanel>
                            <Chart className={chartFullscreen} />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </QueryClientProvider>
        </ChakraProvider>
    );
};

export default App;
