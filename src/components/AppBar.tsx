import React from "react";
import {Flex, Text} from "@chakra-ui/react";

interface Props {
    children: React.ReactNode | string;
}

export const AppBar = React.memo<Props>(({children}) => {
    return (
        <Flex py={2} bgColor="telegram.500" justifyContent="center">
            <Text fontWeight="bold" fontSize="xl" color="white">
                {children}
            </Text>
        </Flex>
    );
});
