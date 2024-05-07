import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllQuiz } from "../../services/Quiz/quizApi";

export const QuizAsync = createAsyncThunk(
    'quiz/AllQuestion',
    async () => {
        return await getAllQuiz();
    }
) 

const initialState = {
    userName:'',
    loading:false,
    answers:[],
    quizCompleted:false,
    quizTimerDuration:30,
    questionId:0
}
const quizSlice = createSlice({
    name:'quiz',
    initialState,
    reducers:{
     handleUserName:(state,action) => {
        state.userName = action.payload
     },
     handleChangeAnswer : (state, action) => {
        const questionId = action.payload.question;
        const answerId = action.payload.answerKey;
        const newAnswers = state.answers.map(item => {
            if(item.id === questionId) {
                item.userAnswer = answerId;
                item.stylishs.map(sty => {
                    if(sty.id === answerId) sty.isActive = true;
                    else sty.isActive = false;
                    return sty;
                })
            }
            return item
        });
        state.answers = newAnswers;
     },
     resetAnswer : (state) => {
        state.answers = [];
     },
     handleQuizCompleted : (state,action) => {
        state.quizCompleted = action.payload;
     },
     quizTimer: (state,action) => {
        state.quizTimerDuration = action.payload
     },
     handleChangeQuestion: (state,action) => {
        state.questionId = action.payload
     }
    },
    extraReducers:(builder) => {
        builder
        .addCase(QuizAsync.pending,(state)=> {
            state.loading = true
        })
        .addCase(QuizAsync.fulfilled,(state,action)=> {
            state.loading = false;
            let tenQuestionIndex = [];
            while(tenQuestionIndex.length < 10) {
                const randomIndex = Math.floor(Math.random()*action.payload.length);
                if(!tenQuestionIndex.includes(randomIndex)) tenQuestionIndex.push(randomIndex);
            }
            const randomData =  tenQuestionIndex.map(index => action.payload[index]);
            const newAnswers = randomData.map(item =>(
                {
                    ...item,
                    stylishs:item.body.split('\n').map((sty,index) =>(
                        {
                            id:index,
                            answer:sty,
                            isActive:false
                        }
                    )),
                    correctAnswer:Math.floor(Math.random()*4),
                    userAnswer:null,
                }
            ))
            state.answers = newAnswers;
        })
        .addCase(QuizAsync.rejected,(state)=> {
            state.loading = true
        })
    }
})

export default quizSlice.reducer;
export const { handleUserName, handleChangeAnswer, resetAnswer, handleQuizCompleted, quizTimer,handleChangeQuestion } = quizSlice.actions;
