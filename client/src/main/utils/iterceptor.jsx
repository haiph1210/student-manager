import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:8000',
    responseType: 'json',

})


instance.interceptors.request.use((request) => {
    const token = localStorage.getItem("token")
        ? JSON.parse(token)
        : null;
    if (token && request.method !== "GET") {
        request.headers['Authorization'] = 'Bearer' + token;
        request.headers['Cros-Orrigin'] = instance.headers;
    }
    return request;
})

instance.interceptors.response.use(
    (response) => {
        return response.data ? response.data : { statusCode: response.status };
    },
    (error) => {
        let res = {};
        if (error.response) {
            res.data = error.response.data;
            res.status = error.response.status
            res.headers = error.response.headers
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        return res;
    }

)

export default instance;