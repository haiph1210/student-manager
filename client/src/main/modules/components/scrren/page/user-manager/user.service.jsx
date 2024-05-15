import instance from "../../../../../utils/iterceptor";

const REQUEST_MAPPING = '/users';
export const getAll = async (role) => {
    return await instance.get(REQUEST_MAPPING,{
        params: { role }
    });
}
export const findAllByClassId = async (classId) => {
    return await instance.get(REQUEST_MAPPING + "/class/" + classId);
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
export const addOrUpdateUserToClass = async (userId, classId) => {
    return await instance.post(REQUEST_MAPPING + '/addOrUpdateUserToClass/user/' + userId + '/class/' + classId);
}
export const removeUserToClass = async (userId) => {
    return await instance.post(REQUEST_MAPPING + '/removeUserToClass/user/' + userId);
}
export const resetPassword = async (userId) => {
    return await instance.post(REQUEST_MAPPING + '/resetPassword/' + userId);
}