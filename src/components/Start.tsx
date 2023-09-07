import { Button } from "@mui/material";
import { useQuestionStore } from "../store/question";

const LIMIT_QUEESTIONS = 10;

export const Start = () => {
  const fetchQuestion = useQuestionStore((state) => state.fetchQuestion);

  const handleClick = () => {
    fetchQuestion(LIMIT_QUEESTIONS);
  };
  return (
    <Button onClick={handleClick} variant="contained">
      Empezar
    </Button>
  );
};
