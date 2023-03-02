"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error = void 0;
const Error = (message) => {
    return (<div className="flex items-center justify-center text-red-500 h-[50vh]">An error has occurred: {message}</div>);
};
exports.Error = Error;
