import { QuestionAnswer } from "@/shared/types/questionanswer";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AssessmentAttempt{
    assessmentAttemptDict: {[assessmentId: number]: {[questionId: number]: QuestionAnswer}}
}

const initialState: AssessmentAttempt = {
    assessmentAttemptDict: {}
}

const assessmentAttemptSlice = createSlice({
    name: 'assessmentAttempt',
    initialState,
    reducers: {
        updateAnswerToAssessmentAttemptQuestion: (state, action: PayloadAction<{assessmentId: number, questionId: number, providedAnswer: QuestionAnswer}| null>)=>{
            if(action.payload ){
                let currentQuestionsState = state.assessmentAttemptDict[action.payload.assessmentId];
                if(!currentQuestionsState){
                    currentQuestionsState = {}
                }
                
                currentQuestionsState[action.payload.questionId] = action.payload.providedAnswer;
            
                state.assessmentAttemptDict[action.payload.assessmentId] = {...state.assessmentAttemptDict[action.payload.assessmentId], ...currentQuestionsState};
            }
        }
    }
})

export const {updateAnswerToAssessmentAttemptQuestion} = assessmentAttemptSlice.actions;

export const selectSingleAssesssmentAttempt = (state: {assessmentAttempt: AssessmentAttempt}, assessmentId?: number) : {[questionId: number]: QuestionAnswer} | null => {
   if(!assessmentId){
    return null;
   }

   return state.assessmentAttempt.assessmentAttemptDict[assessmentId];
} 

export default assessmentAttemptSlice.reducer;