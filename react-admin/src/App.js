"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const Main_1 = require("components/Layouts/Main");
const routes_1 = require("routes");
const App = () => <Main_1.Main>{(0, react_router_dom_1.useRoutes)(routes_1.routes)}</Main_1.Main>;
exports.default = App;
