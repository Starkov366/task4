const BASE_URL = import.meta.env.VITE_BASE_URL;

const parseResponse = async (res: Response) => {
    const text = await res.text();

    let data: any = {};

    try {
        data = text ? JSON.parse(text) : {};
    } catch {
        data = text;
    }

    if (!res.ok) {
        throw new Error(
            typeof data === "string"
                ? data
                : data?.message || "Request failed"
        );
    }

    return data;
};

export const register = async (
    name: string,
    email: string,
    password: string
) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
    });

    return parseResponse(res);
};

export const login = async (email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    return parseResponse(res);
};

export const verify = async (token: string) => {
    const res = await fetch(`${BASE_URL}/auth/verify/${token}`);

    return parseResponse(res);
};
export const findByEmail = async (email: string) => {
    const res = await fetch(`${BASE_URL}/auth/email/${email}`, {
        method: "GET",
    });

    return parseResponse(res);
};