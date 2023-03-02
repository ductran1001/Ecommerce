"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Layout_1 = require("@/components/common/Layout");
const Breadcrumb_1 = require("@/components/common/Breadcrumb");
const SidebarAccount_1 = require("@/components/pages/Account/SidebarAccount");
const ManageAddress_1 = require("@/components/pages/Account/ManageAddress");
const ManageAddressPage = (props) => {
    const page = 'My Account';
    return (<Layout_1.Layout>
            <Breadcrumb_1.Breadcrumb page={page}/>
            <div className="container lg:grid grid-cols-12 items-start gap-6 pt-4 pb-16">
                <SidebarAccount_1.SidebarAccount />
                <ManageAddress_1.ManageAddress />
            </div>
        </Layout_1.Layout>);
};
exports.default = ManageAddressPage;
