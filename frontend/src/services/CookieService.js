import Cookies from "universal-cookie"


const cookie = new Cookies();

export const getCookie = (name, option) => {
    if (option === null) {
        return cookie.get(name)
    } else {
        return cookie.get(name, option)
    }
}

export const setCookie = (name, value, option) => {
    if (option === null) {
        return cookie.set(name, value)
    } else {
        return cookie.set(name, value, option)
    }
}

export const removeCookie = (name) => {
    cookie.remove(name);
}