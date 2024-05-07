const AUTHENTICATION = 'auth';
export const getRole = () => {
    let resp = '';
    const authResp = JSON.parse(localStorage.getItem(AUTHENTICATION));
    console.log(authResp)
    if (authResp) {
        resp = authResp.userInfo.role;
    }
    return resp;
}