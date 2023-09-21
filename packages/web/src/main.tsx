import "./index.css";

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ErrorPage, NewPage, Root, SnippetPage } from "./pages";
import { snippetAction, snippetLoader } from "./api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <NewPage />,
        errorElement: <ErrorPage />,
        action: snippetAction,
      },
      {
        path: ":snippetId",
        element: <SnippetPage />,
        errorElement: <ErrorPage />,
        loader: snippetLoader,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
