"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetCart = exports.decrement = exports.increment = exports.removeCartItem = exports.getCart = exports.addToCart = exports.cartSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = [];
exports.cartSlice = (0, toolkit_1.createSlice)({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const newData = {
                _id: action.payload._id,
                name: action.payload.name,
                price: action.payload.price,
                slug: action.payload.slug,
                promotion: action.payload.promotion,
                image: action.payload.imageURL[0],
            };
            const itemExists = state.find((item) => item._id === action.payload._id);
            itemExists ? itemExists.quantity++ : state.push(Object.assign(Object.assign({}, newData), { quantity: 1 }));
            window.localStorage.setItem('cart', JSON.stringify((0, toolkit_1.current)(state)));
        },
        getCart: (state, action) => {
            state.push(action.payload);
        },
        removeCartItem: (state, action) => {
            let index = state.findIndex((item) => item._id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },
        increment: (state, action) => {
            let index = state.findIndex((item) => item._id === action.payload);
            state[index].quantity += 1;
        },
        decrement: (state, action) => {
            let index = state.findIndex((item) => item._id === action.payload);
            state[index].quantity <= 1 ? (state[index].quantity = 1) : (state[index].quantity -= 1);
        },
        resetCart: () => {
            window.localStorage.removeItem('cart');
            return initialState;
        },
    },
});
// Action creators are generated for each case reducer function
_a = exports.cartSlice.actions, exports.addToCart = _a.addToCart, exports.getCart = _a.getCart, exports.removeCartItem = _a.removeCartItem, exports.increment = _a.increment, exports.decrement = _a.decrement, exports.resetCart = _a.resetCart;
exports.default = exports.cartSlice.reducer;
