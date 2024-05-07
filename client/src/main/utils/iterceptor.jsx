import axios from "axios";
import Swal from "sweetalert2";

const instance = axios.create({
    baseURL: 'http://localhost:8000/student-manager',
    responseType: 'json',
});

const setupInterceptors = () => {
    instance.interceptors.request.use((request) => {
        const authentication = localStorage.getItem("auth");
        if (authentication && request.method !== "GET") {
            const authenticationResp = JSON.parse(authentication);
            const token = authenticationResp.token;
            request.headers['Authorization'] = 'Bearer ' + token;
            request.headers['Cros-Orrigin'] = instance.headers;
        }
        return request;
    });

    instance.interceptors.response.use(
        (response) => {
            return response.data ? response.data : {statusCode: response.status};
        },
        (error) => {
            console.log(error)
            let res = {};
            if (error.response) {
                res.data = error.response.data;
                res.status = error.response.status;
                res.headers = error.response.headers;
                if (error.response.status === 500) {
                    localStorage.clear();
                    Swal.fire({
                        icon: 'error',
                        title: 'Access Denied',
                        text: 'Your session has expired. Please log in again.',
                    }).then(() => {
                        setTimeout(() => {
                                window.location.href = '/login';
                            }
                            , 5000)
                    });
                }
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            window.location.href = '/404-not-found';
            return Promise.reject(error);
        }
    );
};

setupInterceptors();

export default instance;
