import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = {
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = action.payload
            let productItem = state.cartItems.find(product => product.id === item.id)

            if (productItem) {
                productItem.quantity += 1
            } else {
                state.cartItems = [item, ...state.cartItems]
            }

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            toast.success('Your product has been saved.', {
                position: "top-right"
            })
        },

        removeFromCart(state, action) {
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload)
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
            toast.error('Product removed from cart.', {
                position: "top-right"
            })
        },

        clearCartItems(state) {
            localStorage.removeItem('cartItems')
            state.cartItems = []
        }
    }
})

const cartReducer = cartSlice.reducer;
export const { addToCart, removeFromCart, clearCartItems } = cartSlice.actions;
export default cartReducer;