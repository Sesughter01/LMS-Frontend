import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Programme {
    id: number,
    programmeName: string,
    programmeDescription: string,
    isDefault: boolean,
    createdBy: number,
    createdByCategory: string, 
    createdAt: string
    updatedAt: string
}

interface ProgrammeState {
    defaultProgramme: Programme | null,
    userProgrammes: Programme[] | null
}

const initialState: ProgrammeState = {
    defaultProgramme: null,
    userProgrammes: [] 
}

const programmeSlice = createSlice({
    name: 'programme',
    initialState,
    reducers: {
       setDefaultProgramme: (state, action: PayloadAction<Programme | null>) => {
            state.defaultProgramme = action.payload;
       },
       setUserProgrammes: (state, action: PayloadAction<Programme[] | null>)=> {
        state.userProgrammes = action.payload;

        if(action.payload){
            for(let programmeRecord of action.payload){
                if(programmeRecord.isDefault){
                    state.defaultProgramme = programmeRecord;
                    return;
                }
            }
        }
       }
    }
});

export const {setDefaultProgramme, setUserProgrammes} = programmeSlice.actions;

export const selectDefaultProgramme = (state: {programme: ProgrammeState}) : Programme | null => state.programme.defaultProgramme;
export const selectUserProgrammes = (state: {programme: ProgrammeState}): Programme[] | null => state.programme.userProgrammes;

export default programmeSlice.reducer;