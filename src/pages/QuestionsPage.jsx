import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTechBySlug, getLevelBySlug } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function QuestionsPage() {
  const { tech, level } = useParams();
  const navigate = useNavigate();
  const techData = getTechBySlug(tech);
  const levelData = getLevelBySlug(tech, level);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);

  if (!techData || !levelData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <p className="text-muted-foreground">Quiz not found.</p>
        <Button variant="outline" onClick={() => navigate("/")} className="mt-4">
          Back to Home
        </Button>
      </div>
    );
  }

  const questions = levelData.questions;
  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleOptionClick = (optionIndex) => {
    if (answered) return;
    setSelectedAnswer(optionIndex);
    setAnswered(true);
    if (optionIndex === currentQuestion.correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
      return;
    }
    setCurrentIndex((i) => i + 1);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  const PASS_THRESHOLD = 68;
  const percentage = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
  const passed = percentage > PASS_THRESHOLD;

  if (showResults) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Quiz Results</CardTitle>
            <CardDescription className="text-center">
              {techData.topic} · {levelData.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="rounded-lg bg-muted p-4">
                <p className="text-2xl font-bold">{score}</p>
                <p className="text-sm text-muted-foreground">Correct</p>
              </div>
              <div className="rounded-lg bg-muted p-4">
                <p className="text-2xl font-bold">{questions.length - score}</p>
                <p className="text-sm text-muted-foreground">Incorrect</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold">{percentage}%</p>
              <p className="text-sm text-muted-foreground">Questions answered</p>
            </div>
            <div
              className={`rounded-lg p-4 text-center font-medium ${
                passed ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-400" : "bg-destructive/20 text-destructive"
              }`}
            >
              {passed ? "✓ Passed" : "✗ Not Passed"}
              <p className="text-sm font-normal mt-1 opacity-90">
                {passed
                  ? "You answered more than 68% correctly."
                  : "You need more than 68% correct to pass."}
              </p>
            </div>
            <Button className="w-full" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" onClick={() => navigate("/")}>
            ← Back
          </Button>
          <span className="text-sm text-muted-foreground">
            {techData.topic} · {levelData.name}
          </span>
          <span className="text-sm font-medium">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {currentQuestion.options.map((option, idx) => {
              const isCorrect = idx === currentQuestion.correct;
              const isSelected = selectedAnswer === idx;
              const showResult = answered;
              const variant = showResult && isSelected && !isCorrect ? "destructive" : "outline";
              const correctGreenClass = showResult && isCorrect ? "bg-emerald-700 hover:bg-emerald-700 text-white border-emerald-800" : "";

              return (
                <Button
                  key={idx}
                  variant={variant}
                  className={`justify-start text-left h-auto py-3 px-4 ${correctGreenClass}`}
                  onClick={() => handleOptionClick(idx)}
                  disabled={answered}
                >
                  {option}
                  {showResult && isCorrect && " ✓"}
                  {showResult && isSelected && !isCorrect && " ✗"}
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {answered && (
          <div className="mt-6 flex justify-end">
            <Button onClick={handleNext}>
              {isLastQuestion ? "Finish Quiz" : "Next Question"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
