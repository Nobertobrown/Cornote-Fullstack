import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Landing from "./pages/Landing.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />}>
        <Route index element={<Landing />} />
        <Route path="notes" element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;
