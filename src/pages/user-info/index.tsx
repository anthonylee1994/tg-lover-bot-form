import React from "react";
import {Box} from "@chakra-ui/react";
import {AppBar} from "components/AppBar";
import {UserInfoForm} from "components/UserInfoForm";

export const UserInfoEditPage = React.memo(() => {
    return (
        <Box>
            <AppBar>自我介紹</AppBar>
            <Box mx="auto" p={3} mb={5} maxW="md">
                <UserInfoForm />
            </Box>
        </Box>
    );
});
