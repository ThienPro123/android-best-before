import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://d4ba-171-224-178-242.ngrok-free.app/api/",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        timeout: 5000,
    },
});

export default axiosClient;
