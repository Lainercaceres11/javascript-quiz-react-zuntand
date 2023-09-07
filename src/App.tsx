import { Container, Typography, Stack } from "@mui/material";
import { JavaScriptLogo } from './JavaScriptLogo';
import "./App.css"
import { Start } from "./components/Start";
import { useQuestionStore } from "./store/question";
import { Game } from "./components/Game";

function App() {
  const questions = useQuestionStore(state => state.question)
  console.log(questions)
  return (
    <main>
      <Container>
        <Stack
          direction="row"
          gap={2}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <JavaScriptLogo />
          <Typography variant="h2" component="h1">
           JavaScript Quiz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 &&  <Game />}
      
      </Container>
    </main>
  );
}

export default App;
