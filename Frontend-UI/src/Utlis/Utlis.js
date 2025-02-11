
export function getToken(){
    return localStorage.getItem('token') || sessionStorage.getItem('token')
}

export function  clearTokens(){
    localStorage.clear();
    sessionStorage.clear();
}