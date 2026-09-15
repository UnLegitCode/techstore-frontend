import {createBrowserRouter} from "react-router";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import RecoverPage from "./pages/RecoverPage/RecoverPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import {CartProvider} from "./contexts/CartContext.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <CartProvider>
                <HomePage />
            </CartProvider>
        )
    },
    {
        path: "/login",
        element: (<LoginPage />)
    },
    {
        path: "/register",
        element: (<RegisterPage />)
    },
    {
        path: "/recover",
        element: (<RecoverPage />)
    },
]);

export default router;