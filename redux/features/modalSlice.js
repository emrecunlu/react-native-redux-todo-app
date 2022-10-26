import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisible: false,
    activeTodo: false,
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.isVisible = true;
            state.activeTodo = action.payload
        },
        closeModal: (state) => {
            state.isVisible = false
            state.activeTodo = false
        }
    }
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer