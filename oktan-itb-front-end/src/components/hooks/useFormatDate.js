const useFormatDate = (date) => {
    var myDate = new Date(date);
    const format = { year: 'numeric', month: 'short', day: 'numeric' }

    const formatedDate = myDate.toLocaleDateString('id-ID', format)

    return formatedDate
}

const useDateFormatYMD = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export { useFormatDate, useDateFormatYMD }