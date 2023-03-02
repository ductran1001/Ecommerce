"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStaticProps = void 0;
const Banner_1 = require("@/components/pages/Home/Banner");
const Features_1 = require("@/components/pages/Home/Features");
const Layout_1 = require("@/components/common/Layout");
const ProductHome_1 = require("@/components/pages/Home/ProductHome");
const Home = ({ dataSliders, dataCategories, dataProductsGroupCategory }) => {
    return (<Layout_1.Layout dataCategories={dataCategories}>
            <Banner_1.Banner dataSliders={dataSliders}/>
            <div className="bg-white flex flex-col gap-y-4">
                <Features_1.Features />
                <ProductHome_1.ProductHome dataProductsGroupCategory={dataProductsGroupCategory}/>
            </div>
        </Layout_1.Layout>);
};
var getStaticProps_1 = require("lib/getStaticProps");
Object.defineProperty(exports, "getStaticProps", { enumerable: true, get: function () { return getStaticProps_1.getStaticProps; } });
exports.default = Home;
