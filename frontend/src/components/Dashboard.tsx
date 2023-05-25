import { Flex, VStack } from '@chakra-ui/react';
import Map from './Map';
import Chart from './Chart';
import Form from './Form';
import { chart, dashboard, mapDashboard } from './styles.css';

const Dashboard = () => {
    return (
        <Flex flexDirection='row' className={dashboard}>
            <Map idTab={0} className={mapDashboard}></Map>
            <VStack spacing={10} direction='column' width='50vw' height='auto' margin='1%'>
                <Chart className={chart} />
                <Form />
            </VStack>
        </Flex>
    );
};

export default Dashboard;
