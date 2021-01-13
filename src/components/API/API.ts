import axios from "axios";

const instance = axios.create({
    baseURL: 'https://express/api/',
    headers: {
        'api-key': '0861c10b-4ee2-4a6e-b799-407b779627f6',
    }
});

export const authAPI = {
    checkUser() {
        return instance.get("auth/check")
            .then(response => response.data);
    },

    loginUser(data) {
        return instance.post("auth/login", {...data})
            .then(response => response.data);
    },

    logoutUser() {
        return instance.post("auth/logout")
            .then(response => response.data);
    },

    registerUser(data) {
        return instance.post("auth/register", {...data})
            .then(response => response.data);
    }
};

export const userAPI = {
    getAll(data) {
        return instance.post("user/getAll", {...data})
            .then(response => response.data);
    },

    getOne(id: number) {
        return instance.get("user/getOne")
            .then(response => response.data);
    },

    delete(id: number) {
        return instance.delete("user/delete")
            .then(response => response.data);
    },
};

export const orderAPI = {
    getAll(data) {
        return instance.post("order/getAll", {...data})
            .then(response => response.data);
    },

    getOne(id: number) {
        return instance.get("order/getOne")
            .then(response => response.data);
    },

    delete(id: number) {
        return instance.delete("order/delete")
            .then(response => response.data);
    },
};