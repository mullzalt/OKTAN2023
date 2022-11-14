const useFormatDate = (date) => {
    var myDate = new Date(date);
    const format = { year: 'numeric', month: 'short', day: 'numeric' }

    const formatedDate = myDate.toLocaleDateString('id-ID', format)

    return formatedDate
}

const useDateFormatYMD = (date) => {
    var myDate = new Date(date)
    const formatedDate = (myDate.getFullYear() + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate());
    return formatedDate
}

export { useFormatDate, useDateFormatYMD }