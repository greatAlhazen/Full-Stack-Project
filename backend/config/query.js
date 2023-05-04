// calculate pagination data
const calculatePagination = (value) => {
    const page = Math.abs(value.page) || 1;
    const limit = Math.abs(value.limit) || 50;
    const skip = ( page - 1 ) * limit

    return [
        skip,
        limit
    ]
}


module.exports = calculatePagination