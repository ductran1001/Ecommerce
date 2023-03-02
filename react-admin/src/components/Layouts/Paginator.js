"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paginator = void 0;
const react_paginate_1 = __importDefault(require("react-paginate"));
const Paginator = ({ totalPages, currentPage, navigator, search }) => {
    const getQuery = search === null || search === void 0 ? void 0 : search.replace(`?page=${currentPage}`, '');
    const handlePageClick = (event) => navigator(getQuery ? `?page=${event.selected + 1}${getQuery}` : `?page=${event.selected + 1}`);
    return (<div className="py-8">
            <react_paginate_1.default nextLabel="next >" onPageChange={handlePageClick} pageRangeDisplayed={3} marginPagesDisplayed={2} pageCount={totalPages} previousLabel="< previous" pageClassName="page-item" pageLinkClassName="page-link" previousClassName="page-item" previousLinkClassName="page-link" nextClassName="page-item" nextLinkClassName="page-link" breakLabel="..." breakClassName="page-item" breakLinkClassName="page-link" containerClassName="pagination" forcePage={currentPage - 1} hrefBuilder={(page, pageCount) => (page >= 1 && page <= pageCount ? `?page=${page}` : '#')} hrefAllControls/>
        </div>);
};
exports.Paginator = Paginator;
