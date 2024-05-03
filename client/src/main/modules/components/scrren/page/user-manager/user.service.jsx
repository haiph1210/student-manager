import instance from "../../../../../utils/iterceptor";

const REQUEST_MAPPING = '/users/';
export const getAll = async () => {
    return await instance.get(REQUEST_MAPPING);
}

export const detail = async (id) => {
    return await instance.get(REQUEST_MAPPING + '/' + id);
}

export const add = async ({request}) => {
    return await instance.post(REQUEST_MAPPING, request);
}

export const update = async (id, {request}) => {
    return await instance.post(REQUEST_MAPPING + '/update/' + id, request);
}


export const deleted = async (id) => {
    return await instance.post(REQUEST_MAPPING + '/delete/' + id);
}