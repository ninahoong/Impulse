'use client'; // This makes it a Client Component

import { useEffect, useState } from 'react';
import { wishlistService } from '@/services/wishlistService';

// Define the type here as this component "owns" the data
type WishlistItem = {
    id: number;
    itemName: string;
    price: number;
    productUrl: string;
    dateAdded: string;
    currency: string;
    imageUrl?: string;
};

export default function Wishlist() {
    const [items, setItems] = useState<WishlistItem[]>([]);

    // Fetch data on the client side when the component loads
    useEffect(() => {
        async function getWishlistItems() {
            const res = await fetch('http://localhost:5298/api/wishlist');
            if (res.ok) {
                setItems(await res.json());
            }
        }
        getWishlistItems();
    }, []); // The empty array ensures this runs only once on mount

    // Handle the delete button click
    const handleDelete = async (id: number) => {
        const success = await wishlistService.deleteItem(id);
        if (success) {
            // To update the UI instantly, filter the deleted item out of the local state.
            setItems(currentItems => currentItems.filter(item => item.id !== id));
        } else {
            alert('Failed to delete item.');
        }
    };

    return (
        <div className="space-y-4">
            {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 border rounded-lg shadow-sm items-center">
                    {item.imageUrl && (
                        <img src={item.imageUrl} alt={item.itemName} className="w-24 h-24 object-cover rounded-md" />
                    )}
                    <div className="flex-grow">
                        <h2 className="text-xl font-semibold">{item.itemName}</h2>
                        <p className="text-lg text-green-600">
                            {item.price.toFixed(2)} {item.currency}
                        </p>
                        <a href={item.productUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            View Product
                        </a>
                    </div>
                    {/* --- THE DELETE BUTTON --- */}
                    <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 self-start"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}