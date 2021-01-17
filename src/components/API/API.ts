import axios from "axios";
import {LoginType} from "../redux/profile-reducer";
import {SendFileDataType} from "../Orders/Order/Docs/Docs";

let token = null;
if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
}

export const instance = axios.create({
    baseURL: 'http://express/api/admin/',
    headers: {
        'api-key': token,
    }
});

export const authAPI = {
    checkUser() {
        return instance.get("auth/check")
            .then(response => response.data);
    },

    loginUser(data: LoginType) {
        return instance.post("auth/login", {...data})
            .then(response => response.data);
    },

    logoutUser() {
        return instance.post("auth/logout")
            .then(response => response.data);
    },

    registerUser(data: any) {
        return instance.post("auth/register", {...data})
            .then(response => response.data);
    }
};

export const userAPI = {
    getAll(data: any) {
        return instance.post("user/getAll", {...data})
            .then(response => response.data);
    },

    getOne(id: number) {
        return instance.post("user/getOne", {id})
            .then(response => response.data);
    },

    delete(id: number) {
        return instance.delete("user/delete")
            .then(response => response.data);
    },
};

export const orderAPI = {
    getAll(data: any) {
        return instance.post("order/getAll", {...data})
            .then(response => response.data);
    },

    getOne(id: number) {
        return instance.get("order/getOne/" + id)
            .then(response => response.data);
    },

    delete(id: number) {
        return instance.delete("order/delete")
            .then(response => response.data);
    },

    sendFile(data: SendFileDataType, order_id: string) {
        const formData = new FormData();
        formData.append("img", data.file);
        return instance.post('order/file', {formData, doc_type: data.doc_type, doc_name: data.doc_name, order_id}, {
            headers: {
                "Content-Type": 'multipart/form-data',
                "processData": false,
                "contentType": false,
            }
        }).then(response => response.data);
    },
};

export const dadataAPI = {
    getAdrress(address: string) {
        return instance.post("query/address", {address})
            .then(response => response.data);
    },
}