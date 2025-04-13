import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { faultCode } from "../types/faultCodes"

interface FaultCodesState {
  list: faultCode[]
}

const loadFromLocalStorage = (): FaultCodesState => {
  try {
    const stored = localStorage.getItem("faultCodes")
    if (stored) {
      return { list: JSON.parse(stored) }
    }
  } catch (e) {
    console.error("Error loading from localStorage", e)
  }
  return { list: [] }
}

const initialState: FaultCodesState = loadFromLocalStorage()

const faultCodesSlice = createSlice({
  name: "faultCodes",
  initialState,
  reducers: {
    setFaultCodes(state, action: PayloadAction<faultCode[]>) {
      state.list = action.payload
      localStorage.setItem("faultCodes", JSON.stringify(state.list))
    },
    clearFaultCodes(state) {
      state.list = []
      localStorage.removeItem("faultCodes")
    },
  },
})

export const { setFaultCodes, clearFaultCodes } = faultCodesSlice.actions
export default faultCodesSlice.reducer
