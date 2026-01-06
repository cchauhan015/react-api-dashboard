import { useState } from "react";
import { addUser } from "../services/api";

const UserForm = ({ refresh }) => {
    const [name, setName] = useState("");

    const submit = async () => {
        await addUser({ name });
        setName("");
        refresh();
    };

    return (
        <>
            <input value={name} onChange={e => setName(e.target.value)} />
            <button onClick={submit}>Add</button>
        </>
    );
};

export default UserForm;
