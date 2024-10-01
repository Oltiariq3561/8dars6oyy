import React, { useState, useRef } from 'react';

function Home() {
    const [products, setProducts] = useState([]);
    const nameRef = useRef();
    const descriptionRef = useRef();
    const priceRef = useRef();
    const categoryRef = useRef();

    const handleAddProduct = (event) => {
        event.preventDefault();

        const newProduct = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
            price: priceRef.current.value,
            category_id: categoryRef.current.value,
        };

        fetch("https://auth-rg69.onrender.com/api/products", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(newProduct)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setProducts([...products, data]);
                nameRef.current.value = '';
                descriptionRef.current.value = '';
                priceRef.current.value = '';
                categoryRef.current.value = '';
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <form onSubmit={handleAddProduct} className="bg-white p-6 rounded shadow-md space-y-4 w-full max-w-md">
                <h2 className="text-xl font-bold">Add Product</h2>
                <input ref={nameRef} type="text" placeholder="Product ..." required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <input ref={descriptionRef} type="text" placeholder="Description..." required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input ref={priceRef} type="number" placeholder="Price..." required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input ref={categoryRef} type="number" placeholder="ID..." required className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <button type="submit" className="bg-gray-700 text-white py-3 rounded-md hover:bg-gray-600 transition-all duration-200 w-full" > Add </button>
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full max-w-6xl">
                {products.map((value) => (
                    <div key={value.id} className="border border-gray-300 p-4 rounded-md bg-white shadow-md">
                        <h3 className="text-lg font-semibold">{value.name}</h3>
                        <p>{value.description}</p>
                        <p className="font-bold">${value.price}</p>
                        <p>ID: {value.category_id}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;