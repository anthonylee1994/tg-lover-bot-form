import React from "react";
import {UserInfoEditPage} from "pages/user-info";
import {BrowserRouter, Route, Routes} from "react-router-dom";

export const App = React.memo(() => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="user-info" element={<UserInfoEditPage />} />
            </Routes>
        </BrowserRouter>
    );
});
