import { useEffect, useState } from "react";
import {
  Box,
  LinearProgress,
  Typography,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import { AnimatePresence } from "framer-motion";
import QuizCard from "./components/QuizCard";
import ScoreCard from "./components/ScoreCard";
import { questions as allQuestions } from "./data/questions";

const TIMER_SECONDS = 15; // each question has 15 seconds

export default function App() {
  const [category, setCategory] = useState<string>("");
  const [filteredQuestions, setFilteredQuestions] = useState(allQuestions);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [showScore, setShowScore] = useState(false);

  // 🧠 Load previous score from localStorage
  useEffect(() => {
    const savedScore = localStorage.getItem("quizScore");
    if (savedScore) {
      setShowScore(true);
      setScore(Number(savedScore));
    }
  }, []);

  // 🕓 Timer effect
  useEffect(() => {
    if (showScore || !category) return;
    if (timeLeft === 0) {
      handleNextQuestion();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, showScore, category]);

  const handleAnswer = (answer: string) => {
    const currentQuestion = filteredQuestions[current];
    const isCorrect = answer === currentQuestion.answer;

    setAnswers([...answers, answer]);
    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => handleNextQuestion(), 500);
  };

  const handleNextQuestion = () => {
    if (current + 1 < filteredQuestions.length) {
      setCurrent(current + 1);
      setTimeLeft(TIMER_SECONDS);
    } else {
      setShowScore(true);
      localStorage.setItem("quizScore", score.toString());
    }
  };

  const restartQuiz = () => {
    setCurrent(0);
    setScore(0);
    setAnswers([]);
    setTimeLeft(TIMER_SECONDS);
    setShowScore(false);
    localStorage.removeItem("quizScore");
  };

  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
    const filtered = allQuestions.filter((q) => q.category === cat);
    setFilteredQuestions(filtered.length ? filtered : allQuestions);
  };

  // 🔙 Back to category selection
  const goBackToCategory = () => {
    setCategory("");
    setCurrent(0);
    setScore(0);
    setAnswers([]);
    setTimeLeft(TIMER_SECONDS);
    setShowScore(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backgroundAttachment: "fixed",
        overflow: "hidden",
        flexDirection: "column",
      }}
    >
      {!category ? (
        <Box textAlign="center">
          <Typography variant="h4" sx={{ mb: 2, color: "#fff" }}>
            Select a Category
          </Typography>
          <Select
            value={category}
            displayEmpty
            onChange={(e) => handleCategorySelect(e.target.value)}
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              minWidth: 200,
            }}
          >
            <MenuItem disabled value="">
              Categories
            </MenuItem>
            <MenuItem value="General">General</MenuItem>
            <MenuItem value="Science">Science</MenuItem>
            <MenuItem value="Geography">Geography</MenuItem>
          </Select>
        </Box>
      ) : (
        <>
          {/* 🔙 Back Button (while taking quiz) */}
          {!showScore && (
            <Button
              variant="outlined"
              onClick={goBackToCategory}
              sx={{
                position: "absolute",
                top: 20,
                left: 20,
                borderColor: "#fff",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "#fff",
                },
              }}
            >
              ⬅ Back
            </Button>
          )}

          {!showScore && (
            <Box sx={{ width: "80%", maxWidth: 600, mb: 2 }}>
              <LinearProgress
                variant="determinate"
                value={(current / filteredQuestions.length) * 100}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: "rgba(255,255,255,0.3)",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#fff",
                  },
                }}
              />
              <Typography sx={{ color: "#fff", mt: 1, textAlign: "center" }}>
                Time Left: {timeLeft}s
              </Typography>
            </Box>
          )}

          <AnimatePresence mode="wait">
            {!showScore ? (
              <QuizCard
                key={filteredQuestions[current].id}
                question={filteredQuestions[current]}
                onAnswer={handleAnswer}
                selectedAnswer={answers[current]}
              />
            ) : (
              <ScoreCard
                key="scorecard"
                score={score}
                total={filteredQuestions.length}
                onRestart={restartQuiz}
                onBackToCategory={goBackToCategory} // 👈 Added prop
              />
            )}
          </AnimatePresence>
        </>
      )}
    </Box>
  );
}
