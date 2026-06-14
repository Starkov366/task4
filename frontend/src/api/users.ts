const BASE_URL = import.meta.env.VITE_BASE_URL;

const safeFetch = async (res: Response) => {
    const text = await res.text();

    try {
        return text ? JSON.parse(text) : {};
    } catch {
        return text;
    }
};

export const getUsers = async () => {
    const res = await fetch(`${BASE_URL}/users`);
    if (!res.ok) throw new Error("Error loading users");
    return safeFetch(res);
};

export const blockUsers = async (ids: number[]) => {
    const res = await fetch(`${BASE_URL}/users/block`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
    });

    return safeFetch(res);
};

export const unblockUsers = async (ids: number[]) => {
    const res = await fetch(`${BASE_URL}/users/unblock`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
    });

    return safeFetch(res);
};

export const deleteUsers = async (ids: number[]) => {
    const res = await fetch(`${BASE_URL}/users/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
    });

    return safeFetch(res);
};

export const deleteUnverified = async () => {
    const res = await fetch(`${BASE_URL}/users/delete-unverified`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    return safeFetch(res);
};