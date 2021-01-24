import axios from "axios";
import {LoginType} from "../redux/profile-reducer";
import {SendFileDataType} from "../Orders/Order/Docs/Docs";
import {OrdersFiltersType} from "../redux/order-reducer";
import {UsersFiltersType} from "../redux/user-reducer";

let token = null;
if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
}

export const instance = axios.create({
    baseURL: 'http://express/api/admin/',
    //baseURL: 'https://expressapi.agaev.digital/api/admin/',
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
    getAll(data: UsersFiltersType) {
        return instance.post("user/getAll", {...data})
            .then(response => response.data);
    },

    getOne(id: number) {
        return instance.get(`user/getOne/${id}`)
            .then(response => response.data);
    },

    delete(id: number) {
        return instance.delete("user/delete")
            .then(response => response.data);
    },
};

export const orderAPI = {
    getAll(data: OrdersFiltersType) {
        return instance.post("order/getAll", {...data})
            .then(response => response.data);
    },

    getOne(id: number) {
        return instance.get("order/getOne/" + id)
            .then(response => response.data);
    },

    delete(id: number) {
        return instance.post("order/delete", {id})
            .then(response => response.data);
    },

    sendFile(data: SendFileDataType, orderId: number) {
        const formData = new FormData();
        formData.append("file", data.file);
        formData.append("doc_type", data.doc_type);
        formData.append("doc_name", data.doc_name);
        formData.append("orderId", orderId + "");
        return instance.post('order/file', formData, {
            headers: {
                "Content-Type": 'multipart/form-data',
                "processData": false,
                "contentType": false,
            }
        }).then(response => response.data);
    },

    deleteFile(id: number) {
        return instance.post('order/file/delete', {id})
            .then(response => response.data);
    },
};

export const pageAPI = {
    sendData(data: any) {
        return instance.post("page/set", {...data})
            .then(response => response.data);
    },

    getData() {
        return instance.get("page/get")
            .then(response => response.data);
    },
}

export const dadataAPI = {
    getAdrress(address: string) {
        return instance.post("query/address", {address})
            .then(response => response.data);
    },
}