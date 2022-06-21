import React from "react";
import {Box} from "@chakra-ui/react";
import {AppBar} from "../../components/AppBar";
import {FilterForm} from "../../components/FilterForm";

export const FilterEditPage = React.memo(() => {
    return (
        <Box>
            <AppBar>配對條件</AppBar>
            <Box mx="auto" p={3} mb={5} maxW="md">
                <FilterForm />
            </Box>
        </Box>
    );
});
