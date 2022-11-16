const makePagination = (Page, Size) => {
    const size = (parseInt(Size) < 1) ? 10 : (isNaN(Size)) ? 10 : parseInt(Size)
    const page = (parseInt(Page) < 1) ? 1 : (isNaN(Page)) ? 1 : parseInt(Page)

    const offset = (page - 1) * size
    const limit = size
    const currentPage = page

    const result = { offset, limit, currentPage }
    return result
}

const paginateResult = (Data, Page, Limit) => {
    const { count: totalItem, rows: rows } = Data
    const currentPage = Page
    const totalPages = Math.ceil(totalItem / Limit)

    const result = { totalItem, totalPages, rows, currentPage }
    return result
}

const paginationResults = ({ totalItem, limit, rows, currentPage }) => {
    const totalPages = Math.ceil(totalItem / limit)

    const result = { totalItem, totalPages, rows, currentPage }
    return result
}

module.exports = {
    makePagination,
    paginateResult,
    paginationResults,
}