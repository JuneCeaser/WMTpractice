import { useEffect, useState } from "react";

const API = "http://localhost:5000/api/items"; // TODO: change after deploying backend

export default function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  const load = async () => {
    const res = await fetch(API);
    setItems(await res.json());
  };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({ name, description });
    const headers = { "Content-Type": "application/json" };
    if (editId) {
      await fetch(`${API}/${editId}`, { method: "PUT", headers, body });
    } else {
      await fetch(API, { method: "POST", headers, body });
    }
    setName(""); setDescription(""); setEditId(null);
    load();
  };

  const edit = (item) => {
    setEditId(item._id);
    setName(item.name);
    setDescription(item.description || "");
  };

  const remove = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Item Manager</h1>
      <form onSubmit={submit} style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>
      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead><tr><th>Name</th><th>Description</th><th>Actions</th></tr></thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <button onClick={() => edit(item)}>Edit</button>{" "}
                <button onClick={() => remove(item._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
