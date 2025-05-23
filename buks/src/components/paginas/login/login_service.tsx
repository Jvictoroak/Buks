import { login_model } from "../login/login_model";

const login = async (email: string, senha: string) => {
    return await fetch(`http://localhost:3000/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            senha: senha
        }),
    })
        .then((response) => response.json());
}

const login_service = {
    login
};

export default login_service;