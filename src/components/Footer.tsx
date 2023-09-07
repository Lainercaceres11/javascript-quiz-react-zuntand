import { useQuestionStore } from "../store/question"
import {Button} from "@mui/material"

export const Footer = () => {
  const questions = useQuestionStore(state  => state.question)
  const reset = useQuestionStore(state => state.reset)

  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach(question => {
    const { userSelectedAnswers, correctAnswer } = question
    if (userSelectedAnswers == null) unanswered++
    else if (userSelectedAnswers === correctAnswer) correct++
    else incorrect++
  })

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong> <br />
      <Button onClick={()=> reset()} >
        Reset
      </Button>
    </footer>
  )
}