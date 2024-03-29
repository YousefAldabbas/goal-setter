import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';
const initialState = {
    goals: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

// Create new goal

export const createGoal = createAsyncThunk('goals/create', async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.createGoal(goalData, token);

    } catch (error) {
        const message =
          (error.response & error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
});

// Get user goals
export const getGoals = createAsyncThunk('goals/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.getGoals(token);
    } catch (error) {
        const message =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})


// Delete new goal

export const deleteGoal = createAsyncThunk('goals/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.deleteGoal(id, token);

    } catch (error) {
        const message =
          (error.response & error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
});
 const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: ( builder ) => {
        builder
        .addCase(createGoal.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(createGoal.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            /* Adding the new goal to the goals array. */
            state.goals.push(action.payload);
        })
        .addCase(createGoal.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload.message;
        })
        .addCase(getGoals.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(getGoals.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.goals = action.payload;
        })
        .addCase(getGoals.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload.message;
        })
        .addCase(deleteGoal.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(deleteGoal.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.goals = state.goals.filter(goal => goal._id !== action.payload.id);
        })
        .addCase(deleteGoal.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload.message;
        })

    }
})


export const { reset } = goalSlice.actions;
export default goalSlice.reducer;