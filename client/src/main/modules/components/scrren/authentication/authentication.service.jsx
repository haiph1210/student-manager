import instance from "../../../../utils/iterceptor";

export const login = async ({request}) => {
    return await instance.post('/auth/login', request);
}

export const register = async ({request}) => {
    return await instance.post('/auth/register', request);
}