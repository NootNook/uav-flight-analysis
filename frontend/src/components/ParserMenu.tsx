import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { parserOptionsAtom } from '../utils/atoms';
import { fetchDatabase } from '../utils/api';
import {
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuDivider,
    MenuItem,
    MenuGroup,
    Box,
} from '@chakra-ui/react';

const ParserMenu = () => {
    const setOptions = useSetAtom(parserOptionsAtom);

    const query = useQuery({
        queryKey: ['filenames', parserOptionsAtom],
        queryFn: fetchDatabase,
        refetchOnWindowFocus: false,
    });

    return (
        <Box margin='50px'>
            <Menu>
                <MenuButton as={Button} colorScheme='blue'>
                    Choose a asset
                </MenuButton>
                <MenuList>
                    {!query.isFetching &&
                        query.data !== undefined &&
                        Object.keys(query.data).map((environnement) => (
                            <div key={`${environnement}-div`}>
                                <MenuGroup key={`${environnement}-group`} title={environnement}>
                                    {query.data[environnement].map((filename) => (
                                        <MenuItem
                                            key={`${environnement}-${filename}-item`}
                                            onClick={() => setOptions({ filename: filename })}
                                        >
                                            {filename}
                                        </MenuItem>
                                    ))}
                                </MenuGroup>
                                <MenuDivider key={`${environnement}-divider`} />
                            </div>
                        ))}
                </MenuList>
            </Menu>
        </Box>
    );
};

export default ParserMenu;
