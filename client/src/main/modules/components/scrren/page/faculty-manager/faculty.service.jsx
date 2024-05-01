import instance from "../../../../../utils/iterceptor";

export const getAll = async () => {
    return await instance.get('/faculties');
}

export const add = async ({request}) => {
    return await instance.post('/auth/register', request);
}