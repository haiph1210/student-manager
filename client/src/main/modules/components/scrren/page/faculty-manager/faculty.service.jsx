import instance from "../../../../../utils/iterceptor";

export const getAll = async () => {
    return await instance.get('/faculties');
}

export const detail = async (id) => {
    return await instance.get('/faculties/' + id);
}

export const add = async ({request}) => {
    return await instance.post('/faculties', request);
}

export const update = async (id, {request}) => {
    return await instance.post('/faculties/update/' + id, request);
}


export const deleted = async (id) => {
    return await instance.post('/faculties/delete/' + id);
}