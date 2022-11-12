
const jsonResponse = (isSuccess, Messsage = null, Data = null) => {
    const data = (Data === null) ? undefined : Data

    const msg = (Messsage === null) ? undefined : Messsage

    if (isSuccess === true) {
        return {
            msg,
            data
        }
    }

    if (isSuccess === false) {
        const errors = (data === null) ? undefined : data

        return {
            msg,
            errors
        }
    }

    return { errors: "Format unsupported" }
}

module.exports = jsonResponse