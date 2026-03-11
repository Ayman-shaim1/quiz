import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import QuestionsPage from "@/pages/QuestionsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/questions/:tech/:level" element={<QuestionsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
