import Chart from './Chart';
import ParserMenu from './ParserMenu';
import Map from './Map';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider, Flex } from '@chakra-ui/react';

const queryClient = new QueryClient();

const App = () => {
    return (
        <ChakraProvider>
            <QueryClientProvider client={queryClient}>
                <Flex css flexDirection='row' height='100vh' width='100vw'>
                    <Map />
                    <Flex flexDirection='column' width='50vw' height='auto' margin='1%'>
                        <Chart />
                        <ParserMenu />
                    </Flex>
                </Flex>
            </QueryClientProvider>
        </ChakraProvider>
    );
};

export default App;
