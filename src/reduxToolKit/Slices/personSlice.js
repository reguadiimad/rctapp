import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    persons: [],
    status: 'idle',
    error: null,
}


export const fetchPersons = createAsyncThunk('Slices/fetchPersons',
    async() => {
        const respons = await fetch('http://localhost:8000/persons/')
        return respons.json()
    }
);

export const addPerson = createAsyncThunk(
  'persons/addPerson',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/persons/create/', {
        method: 'POST',
        body: formData,
        headers: {

        },
      });

      if (!response.ok) {
        throw new Error('Failed to create person');
      }

      const data = await response.json();
      return data; // Will contain the newly added person data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const personsSlice = createSlice({
    name: 'persons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPersons.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchPersons.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.persons = action.payload;
        })
        .addCase(fetchPersons.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(addPerson.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addPerson.fulfilled, (state, action) => {
          state.loading = false;
          state.persons.push(action.payload); // Add new person to the state
        })
        .addCase(addPerson.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
    
  });


  export default personsSlice.reducer;