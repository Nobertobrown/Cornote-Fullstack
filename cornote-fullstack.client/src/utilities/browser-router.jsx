import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import Index from "../pages/Index.jsx";
import Home from "../pages/Home.jsx";
import { getNotes as notesLoader } from "../services/external-api.service.js";
import Landing from "../pages/Landing.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Index />}
    //   errorElement={<ErrorPage />}
    >
      {/* <Route errorElement={<ErrorPage />}> */}
        <Route index element={<Landing />} />
        <Route
          path="notes"
          element={<Home />}
          loader={notesLoader}
          // action={contactAction}
        />
        {/* <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
        />
        <Route path="contacts/:contactId/destroy" action={destroyAction} /> */}
      {/* </Route> */}
    </Route>
  )
);
