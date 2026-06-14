import React, { useEffect, useState } from "react";
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

    const load = async () => {
        const data = await getUsers();
        setUsers(data);
    };

    useEffect(() => {
        load();
    }, []);

    const refresh = async () => {
        await load();
        setSelected([]);
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
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const filteredUsers = users.filter(
        (u) =>
            u.name?.toLowerCase().includes(filter.toLowerCase()) ||
            u.email?.toLowerCase().includes(filter.toLowerCase())
    );

    const getStatusClass = (status: string) => {
        switch (status) {
            case "Active":
                return styles.active;
            case "Blocked":
                return styles.blocked;
            case "Unverified":
                return styles.unverified;
            default:
                return "";
        }
    };

    return (
        <div className={styles.wrapper}>
         
            <div className={styles.toolbar}>
                <div className={styles.actions}>
                    <button onClick={() => blockUsers(selected).then(refresh)}>
                        Block
                    </button>
                    <button onClick={() => unblockUsers(selected).then(refresh)}>
                        Unblock
                    </button>
                    <button onClick={() => deleteUsers(selected).then(refresh)}>
                        Delete
                    </button>
                    <button onClick={() => deleteUnverified().then(refresh)}>
                        Delete unverified
                    </button>
                </div>

                <input
                    className={styles.filter}
                    placeholder="Filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            <div className={styles.tableWrapper}>
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

                                <td className={styles.nameCell}>
                                    <div>{u.name}</div>
                                   
                                </td>

                                <td>{u.email}</td>

                                <td>
                                    <span
                                        className={`${styles.status} ${getStatusClass(
                                            u.status
                                        )}`}
                                    >
                                        {u.status}
                                    </span>
                                </td>

                                <td className={styles.lastSeen}>
                                    <div>{u.last_login ? u.last_login.slice(0,10): ""}</div>
                                    <div className={styles.bars}>
                                        <span />
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;