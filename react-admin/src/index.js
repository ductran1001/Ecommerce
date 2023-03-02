"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
require("./index.css");
const App_1 = __importDefault(require("./App"));
const reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
require("numeral/locales/vi");
const react_router_dom_1 = require("react-router-dom");
const store_1 = __importDefault(require("./redux/store"));
const react_redux_1 = require("react-redux");
const react_hot_toast_1 = require("react-hot-toast");
const react_query_1 = require("@tanstack/react-query");
const react_query_devtools_1 = require("@tanstack/react-query-devtools");
// Create a client
const queryClient = new react_query_1.QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});
const root = client_1.default.createRoot(document.getElementById('root'));
root.render(<react_1.default.Fragment>
        <react_redux_1.Provider store={store_1.default}>
            <react_router_dom_1.BrowserRouter>
                <react_hot_toast_1.Toaster />
                <react_query_1.QueryClientProvider client={queryClient}>
                    <react_query_devtools_1.ReactQueryDevtools initialIsOpen={false}/>
                    <App_1.default />
                </react_query_1.QueryClientProvider>
            </react_router_dom_1.BrowserRouter>
        </react_redux_1.Provider>
    </react_1.default.Fragment>);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
(0, reportWebVitals_1.default)();
