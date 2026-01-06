import { X } from "lucide-react";
import { useState } from "react";

const AddProductModal = ({ onClose, onAdd }) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");

    const submit = () => {
        if (!title || !price) return;

        onAdd({
            title,
            price: Number(price),
            stock: Number(stock),
            category,
            description: "New product added from dashboard",
            thumbnail: "https://i.imgur.com/1As0akH.png"
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-md">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                    <h3 className="text-lg font-bold">Add Product</h3>
                    <button onClick={onClose}><X /></button>
                </div>

                <div className="p-6 space-y-4">
                    <input className="w-full border rounded-lg px-4 py-2"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input className="w-full border rounded-lg px-4 py-2"
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <input className="w-full border rounded-lg px-4 py-2"
                        type="number"
                        placeholder="Stock"
                        value={stock}
                        onChange={e => setStock(e.target.value)}
                    />
                    <input className="w-full border rounded-lg px-4 py-2"
                        placeholder="Category"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    />
                </div>

                <div className="px-6 py-4 border-t flex justify-end gap-3">
                    <button onClick={onClose} className="border px-4 py-2 rounded-lg">
                        Cancel
                    </button>
                    <button onClick={submit} className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;
