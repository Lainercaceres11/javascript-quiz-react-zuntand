import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { useQuestionStore } from "../store/question";
import { Question as QuestionType } from "../store/types/types-e";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./Footer.tsx";

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { correctAnswer, userSelectedAnswers, isCorrectUserAnwser } = info;

  if (userSelectedAnswers === null) return "transparent";

  if (index !== correctAnswer && index !== userSelectedAnswers)
    return "transparent";

  if (index === correctAnswer && isCorrectUserAnwser === true) return "green";

  if (index === userSelectedAnswers) return "red";

  return "transparent";
};

export const Questions = ({ info }: { info: QuestionType }) => {
  const selectAnswers = useQuestionStore((state) => state.selectAnswer);

  return (
    <Card variant="outlined" sx={{ marginTop: 4 }}>
      <Typography variant="h5">{info.question}</Typography>

      <SyntaxHighlighter language="javascript" style={docco}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: "#333" }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} divider>
            <ListItemButton
              disabled={info.userSelectedAnswers != null}
              sx={{ backgroundColor: getBackgroundColor(info, index) }}
              onClick={() => selectAnswers(info.id, index)}
            >
              <ListItemText primary={answer} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export const Game = () => {
  const questions = useQuestionStore((state) => state.question);
  const currentQuestion = useQuestionStore((state) => state.currentQuestion);
  const nextQuestion = useQuestionStore((state) => state.goNextQuestion);
  const prevQuestion = useQuestionStore((state) => state.goPrevQuestion);

  const questionInfo = questions[currentQuestion];
  return (
    <>
      <Stack
        direction="row"
        gap="2"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <IconButton onClick={prevQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={nextQuestion}
          disabled={currentQuestion >= questions.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Questions info={questionInfo} />
      <Footer />
    </>
  );
};
