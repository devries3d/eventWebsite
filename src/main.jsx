import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { EventPage, loader as eventLoader } from "./pages/EventPage";
import { EventsPage, loader as eventsListLoader } from "./pages/EventsPage";
import {
  EditEvent,
  loader as editEventLoader,
  action as editEvent,
} from "./pages/EditEvent";
import {
  NewEvent,
  loader as newEventLoader,
  action as addEvent,
} from "./pages/NewEvent";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <EventsPage />,
        loader: eventsListLoader,
      },
      {
        path: "/event/:eventId",
        element: <EventPage />,
        loader: eventLoader,
        // action: addComment,
      },
      {
        path: "/event/new",
        element: <NewEvent />,
        loader: newEventLoader,
        action: addEvent,
      },
      {
        path: "/event/edit/:editEventId",
        element: <EditEvent />,
        loader: editEventLoader,
        action: editEvent,
      },
    ],
  },
]);
// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
