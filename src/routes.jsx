import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { AddContact } from "./pages/AddContact";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/add-contact",
        element: <AddContact />,
    },
    {
        path: "/edit-contact/:id",
        element: <AddContact />,
    },
    {
        path: "*",
        element: <h1 className="text-center mt-5">Not found!</h1>,
    }
]);