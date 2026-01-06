import React, { useEffect, useState } from "react";
import { Package, Star } from "lucide-react";
import AddProductModal from "../components/AddProductModal";

const ProductsView = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // ✅ Fetch products
    useEffect(() => {
        fetch("https://dummyjson.com/products?limit=10")
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    // ✅ Add product (DummyJSON)
    const addProduct = async (product) => {
        try {
            const res = await fetch("https://dummyjson.com/products/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product)
            });

            const newProduct = await res.json();

            // add product temporarily in UI
            setProducts(prev => [newProduct, ...prev]);
        } catch (err) {
            console.error("Add product failed", err);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Products</h2>
                    <p className="text-gray-500 mt-1">Manage your product catalog</p>
                </div>

                <button
                    onClick={() => setShowForm(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition flex items-center gap-2"
                >
                    <Package size={18} />
                    Add Product
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4">Rating</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        Loading products...
                                    </td>
                                </tr>
                            ) : (
                                products.map(product => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-lg bg-gray-100 p-1 border shrink-0">
                                                    <img
                                                        src={product.thumbnail || "https://via.placeholder.com/150"}
                                                        alt={product.title}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                <span className="font-medium text-sm text-gray-900">
                                                    {product.title}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                                            {product.category}
                                        </td>

                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            ${product.price}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                ${product.stock > 50
                                                        ? "bg-emerald-100 text-emerald-800"
                                                        : product.stock > 10
                                                            ? "bg-yellow-100 text-yellow-800"
                                                            : "bg-red-100 text-red-800"
                                                    }`}
                                            >
                                                {product.stock} in stock
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                                <Star size={14} className="fill-amber-400 text-amber-400" />
                                                {product.rating || "4.5"}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showForm && (
                <AddProductModal
                    onClose={() => setShowForm(false)}
                    onAdd={addProduct}
                />
            )}
        </div>
    );
};

export default ProductsView;
