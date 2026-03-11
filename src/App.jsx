import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import QuestionsPage from "@/pages/QuestionsPage";

export default function App() {
  return (
    <BrowserRouter basename="/quiz">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:tech/:level" element={<QuestionsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
