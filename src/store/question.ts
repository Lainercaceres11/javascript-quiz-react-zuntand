import { create } from "zustand";
import { type Question } from './types/types-e';
import confetti from "canvas-confetti";
import { persist, devtools } from "zustand/middleware";

interface State {
    question: Question[]
    currentQuestion: number
    fetchQuestion: (limit: number) => Promise<void>
    selectAnswer: (questionId: number, answersIndex: number) => void
    goNextQuestion: () => void
    goPrevQuestion: () => void
    reset: ()=> void
}

export const useQuestionStore = create<State>()(devtools(persist((set, get) => {
        return {
            question: [],
            currentQuestion: 0,
            fetchQuestion: async (limit: number) => {
                const res = await fetch("http://localhost:5173/data.json")
                const json = await res.json();
                const question = json.sort(() => Math.random() - 0.5).slice(0, limit)
                set({ question })
            },
            selectAnswer: (questionId: number, answersIndex: number) => {
                const { question } = get();
                const newQuestions = structuredClone(question);
                const questionIndex = newQuestions.findIndex((q) => q.id === questionId);
                const questionIfo = newQuestions[questionIndex]
                const isCorrectUserAnswers = questionIfo.correctAnswer === answersIndex
    
                if (isCorrectUserAnswers) confetti()
    
                newQuestions[questionIndex] = {
                    ...questionIfo,
                    isCorrectUserAnwser: isCorrectUserAnswers,
                    userSelectedAnswers: answersIndex
                }
                set({ question: newQuestions })
            },
            goNextQuestion: () => {
                const { currentQuestion, question } = get()
                const nextQuestion = currentQuestion + 1
                if (nextQuestion < question.length) {
                    set({ currentQuestion: nextQuestion })
                }
            },
            goPrevQuestion: () => {
                const { currentQuestion } = get()
                const previusQuestion = currentQuestion - 1
                if (previusQuestion >= 0) {
                    set({ currentQuestion: previusQuestion })
                }
            },
            reset: ()=>{
                set({currentQuestion: 0, question: []})
            }
        }
    }, {
        name: "questions"
    })))