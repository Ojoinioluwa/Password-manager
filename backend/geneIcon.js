const axios = require("axios")
const BASE_URL = "https://www.google.com/s2/favicons"
const genIcon = async (domain, size)=> {
    try {
        const response = await axios.get(`${BASE_URL}?domain=${domain}&sz=${size}`)
        console.log(response.data)
    } catch (error) {
        console.log("an error occured", error)
    }
    
}

genIcon("dev.to", 256)