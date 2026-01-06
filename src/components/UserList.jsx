import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/api";

const UserList = () => {
    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        const res = await getUsers();
        setUsers(res.data);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <table>
            <tbody>
                {users.map(user => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>
                            <button onClick={() => deleteUser(user.id).then(loadUsers)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserList;
