import axios from "axios";
import { API_URL } from "../config";

const downloadFile = async (path, filename) => {
    await axios({
        url: path,
        method: 'GET',
        responseType: 'blob'
    })
        .then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', filename)
            document.body.appendChild(link)
            link.click()
        })
        .catch(err => {
            throw err
        })
}

export default downloadFile