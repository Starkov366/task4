import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styled.module.scss";
import {
    getUsers,
    blockUsers,
    unblockUsers,
    deleteUsers,
    deleteUnverified,
} from "../../api/users";

const UserManagement = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [filter, setFilter] = useState("");

    const navigate = useNavigate();


    const getMe = () => {
        const raw = localStorage.getItem("user");
        if (!raw) return null;

        try {
            const parsed = JSON.parse(raw);
            return parsed?.user ?? parsed;
        } catch {
            return null;
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        navigate("/authorization", { replace: true });
    };

    const loadUsers = async () => {
        const data = await getUsers();
        setUsers(data);
        return data;
    };


    const checkSelf = async (latestUsers: any[]) => {
        const me = getMe();
        if (!me?.email) return;

        const freshMe = latestUsers.find((u) => u.email === me.email);


        if (!freshMe) {
            logout();
            return;
        }

        const status = (freshMe.status || "").toLowerCase();

     
        if (status === "blocked" || status === "unverified") {
            logout();
            return;
        }

    
        localStorage.setItem("user", JSON.stringify(freshMe));
    };

    useEffect(() => {
        (async () => {
            const data = await loadUsers();
            await checkSelf(data);
        })();
    }, []);

    const runAction = async (action: any) => {
        await action();

        const data = await loadUsers();

       
        await checkSelf(data);
    };

    const toggleSelectAll = () => {
        if (selected.length === users.length) {
            setSelected([]);
        } else {
            setSelected(users.map((u) => u.id));
        }
    };

    const toggleSelect = (id: number) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((i) => i !== id)
                : [...prev, id]
        );
    };

    const filteredUsers = users.filter(
        (u) =>
            u.name?.toLowerCase().includes(filter.toLowerCase()) ||
            u.email?.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.toolbar}>
                <div className={styles.actions}>
                    <button onClick={() => runAction(() => blockUsers(selected))}>
                        Block
                    </button>

                    <button onClick={() => runAction(() => unblockUsers(selected))}>
                        Unblock
                    </button>

                    <button onClick={() => runAction(() => deleteUsers(selected))}>
                        Delete
                    </button>

                    <button onClick={() => runAction(() => deleteUnverified())}>
                        Delete unverified
                    </button>
                </div>

                <input
                    className={styles.filter}
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={
                                    selected.length === users.length &&
                                    users.length > 0
                                }
                                onChange={toggleSelectAll}
                            />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Last seen</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredUsers.map((u) => (
                        <tr key={u.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selected.includes(u.id)}
                                    onChange={() => toggleSelect(u.id)}
                                />
                            </td>

                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.status}</td>
                            <td>{u.last_login?.slice(0, 10)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagement;