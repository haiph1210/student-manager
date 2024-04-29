import instance from "../../../../utils/iterceptor";

export const login = async ({request}) => {
    return await instance.post('/auth/login', request);
}