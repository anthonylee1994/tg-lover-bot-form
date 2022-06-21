import React from "react";
import {UserInfoEditPage} from "pages/user-info";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {FilterEditPage} from "./pages/filter";

export const App = React.memo(() => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="user-info" element={<UserInfoEditPage />} />
                <Route path="filter" element={<FilterEditPage />} />
            </Routes>
        </BrowserRouter>
    );
});
