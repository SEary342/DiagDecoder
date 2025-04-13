import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface SelectionState {
  spnSelected: number | null
  fmiSelected: string | null
}

// Function to load the state from localStorage with validation
const loadFromLocalStorage = (): SelectionState => {
  try {
    const stored = localStorage.getItem("selectionState")
    if (stored) {
      const parsedState = JSON.parse(stored)

      // Ensure required keys are present and return defaults if missing
      return {
        spnSelected: parsedState.spnSelected ?? null,
        fmiSelected: parsedState.fmiSelected ?? null,
      }
    }
  } catch (e) {
    console.error("Error loading from localStorage", e)
  }
  return { spnSelected: null, fmiSelected: null }
}

// Function to save the state to localStorage
const saveToLocalStorage = (state: SelectionState) => {
  try {
    localStorage.setItem("selectionState", JSON.stringify(state))
  } catch (e) {
    console.error("Error saving to localStorage", e)
  }
}

// Initialize state from localStorage
const initialState: SelectionState = loadFromLocalStorage()

export const selectionSlice = createSlice({
  name: "selection",
  initialState,
  reducers: {
    setSpnSelected: (state, action: PayloadAction<number | null>) => {
      state.spnSelected = action.payload
      saveToLocalStorage(state)
    },
    setFmiSelected: (state, action: PayloadAction<string | null>) => {
      state.fmiSelected = action.payload
      saveToLocalStorage(state)
    },
  },
})

export const { setSpnSelected, setFmiSelected } = selectionSlice.actions
export default selectionSlice.reducer
