import Axios from "axios";


let axiosInstance = Axios.create({
    baseURL:'https://tasty-burger-online.firebaseio.com/'
})

export default axiosInstance;