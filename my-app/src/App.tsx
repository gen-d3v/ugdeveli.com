import { Route, Routes } from "react-router";
import HomePage from "./pages/homepage/HomePage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}
