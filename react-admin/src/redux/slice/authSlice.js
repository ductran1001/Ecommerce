"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.logoutUser = exports.getUser = exports.authSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    user: null,
};
exports.authSlice = (0, toolkit_1.createSlice)({
    name: 'auth',
    initialState: initialState,
    reducers: {
        getUser: (state, action) => {
            state.user = action.payload;
        },
        logoutUser: (state, action) => {
            state.user = action.payload.user;
        },
        updateUser: (state, action) => {
            // state.user = action.payload;
            return Object.assign(Object.assign({}, state), { user: action.payload });
        },
    },
});
// Action creators are generated for each case reducer function
_a = exports.authSlice.actions, exports.getUser = _a.getUser, exports.logoutUser = _a.logoutUser, exports.updateUser = _a.updateUser;
exports.default = exports.authSlice.reducer;
