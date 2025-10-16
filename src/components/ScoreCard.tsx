import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";

type ScoreCardProps = {
  score: number;
  total: number;
  onRestart: () => void;
  onBackToCategory: () => void; // 👈 new prop
};

export default function ScoreCard({
  score,
  total,
  onRestart,
  onBackToCategory,
}: ScoreCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card
        sx={{
          maxWidth: 400,
          mx: "auto",
          mt: 10,
          p: 3,
          borderRadius: 4,
          textAlign: "center",
          boxShadow: 6,
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            🎉 Quiz Complete!
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Your Score: {score} / {total}
          </Typography>

          <Stack spacing={2} direction="column">
            <Button variant="contained" color="primary" onClick={onRestart}>
              Restart Quiz
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onBackToCategory}
            >
              ⬅ Back to Category
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
}
