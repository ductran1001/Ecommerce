"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Main = void 0;
const react_1 = __importDefault(require("react"));
const Header_1 = require("./Header");
const Sidebar_1 = require("./Sidebar");
const react_redux_1 = require("react-redux");
const Main = ({ children }) => {
    const [showSidebar, setShowSidebar] = react_1.default.useState(false);
    const { user } = (0, react_redux_1.useSelector)((state) => state.auth);
    return (<div className="min-h-screen flex flex-col">
            {user && (<>
                    <Header_1.Header showSidebar={showSidebar} handleShowSidebar={() => setShowSidebar((pre) => !pre)}/>

                    <div className="flex flex-row overflow-hidden bg-white pt-16 h-screen">
                        <Sidebar_1.Sidebar showSidebar={showSidebar} handleShowSidebar={() => setShowSidebar((pre) => !pre)}/>
                        <main className="h-full w-full bg-gray-50 relative overflow-y-auto md:ml-64">{children}</main>
                    </div>
                </>)}

            {!user && (<div className="flex flex-row overflow-hidden bg-gray-50 pt-16 h-screen">
                    <main className="h-full w-full bg-gray-50 relative overflow-y-auto">{children}</main>
                </div>)}
        </div>);
};
exports.Main = Main;
