"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaticProps = void 0;
const Layout_1 = require("@/components/common/Layout");
const Breadcrumb_1 = require("@/components/common/Breadcrumb");
const ProductPage = ({ dataSliders, dataCategories, dataProducts }) => {
    const page = 'Product';
    return (<Layout_1.Layout>
            <Breadcrumb_1.Breadcrumb page={page}/>

            <div className="container relative grid items-start gap-6 pt-4 pb-16 lg:grid-cols-4"></div>
        </Layout_1.Layout>);
};
exports.default = ProductPage;
var getStaticProps_1 = require("lib/getStaticProps");
Object.defineProperty(exports, "getStaticProps", { enumerable: true, get: function () { return getStaticProps_1.getStaticProps; } });
