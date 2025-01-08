import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthenticationGuard } from "./components/AuthenticationGuard.jsx";

const Home = React.lazy(() => import("./pages/Home"));
const Index = React.lazy(() => import("./pages/Index"));
const Landing = React.lazy(() => import("./pages/Landing"));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />}>
        <Route index element={<Landing />} />
        <Route
          path="notes"
          element={<AuthenticationGuard component={Home} />}
        />
      </Route>
    </Routes>
  );
};

export default App;
