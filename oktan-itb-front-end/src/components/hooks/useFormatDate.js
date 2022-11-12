const useFormatDate = (date) => {
    var myDate = new Date(date);
    const format = { year: 'numeric', month: 'short', day: 'numeric' }
    
    const formatedDate = myDate.toLocaleDateString('id-ID', format)
    
    return formatedDate
}

export {useFormatDate}