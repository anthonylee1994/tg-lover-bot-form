import React from "react";
import {UserInfoEditPage} from "pages/user-info";
import {BrowserRouter, Route, Routes} from "react-router-dom";

export const App = React.memo(() => {
    // React.useEffect(() => {
    //     Telegram.WebApp.ready();
    //     Telegram.WebApp.MainButton.isVisible = true;
    //     Telegram.WebApp.MainButton.text = "Clicked!";

    //     Telegram.WebApp.onEvent("mainButtonClicked", () => {
    //         Telegram.WebApp.MainButton.text = "Clicked!";

    //         try {
    //             Telegram.WebApp.sendData(JSON.stringify({fuck: 1}));
    //             Telegram.WebApp.close();
    //         } catch (e) {}
    //     });
    // }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="user-info" element={<UserInfoEditPage />} />
            </Routes>
        </BrowserRouter>
    );
});
