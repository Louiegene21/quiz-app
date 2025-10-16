import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import type { Question } from "../types/types";

type QuizCardProps = {
  question: Question;
  onAnswer: (answer: string) => void;
  selectedAnswer?: string;
};

export default function QuizCard({ question, onAnswer, selectedAnswer }: QuizCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: 5,
          p: 2,
          borderRadius: 4,
          boxShadow: 6,
          background:
            "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.02)" },
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {question.question}
          </Typography>

          <Stack spacing={2}>
            {question.options.map((option) => (
              <Button
                key={option}
                variant={selectedAnswer === option ? "contained" : "outlined"}
                color={selectedAnswer === option ? "primary" : "inherit"}
                sx={{
                  borderRadius: 3,
                  py: 1.5,
                  textTransform: "none",
                  fontWeight: 500,
                }}
                onClick={() => onAnswer(option)}
              >
                {option}
              </Button>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
}
