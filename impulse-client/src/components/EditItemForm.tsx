'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { wishlistService } from '@/services/wishlistService';

// We need the WishlistItem type here
type WishlistItem = {
    id: number;
    itemName: string;
    price: number;
    productUrl: string;
    dateAdded: string;
    currency: string;
    imageUrl?: string;
};

// The form takes the item to be edited as a prop
export default function EditItemForm({ item }: { item: WishlistItem }) {
    const router = useRouter();
    const [formData, setFormData] = useState(item);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            // If the input is 'price', convert it to a number
            [name]: name === 'price' ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const success = await wishlistService.updateItem(formData.id, formData);
        if (success) {
            alert('Item updated!');
            router.push('/');
            router.refresh();
        } else {
            alert('Failed to update item.');
        }
    };


    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Edit Wish</h2>
            <div className="space-y-4">
                <input name="itemName" value={formData.itemName} onChange={handleChange} type="text" required className="w-full p-2 border rounded" />

                <div className="flex gap-2">
                    <input name="price" value={formData.price} onChange={handleChange} type="number" step="0.01" required className="w-3/4 p-2 border rounded" />
                    <select name="currency" value={formData.currency} onChange={handleChange} required className="w-1/4 p-2 border rounded bg-white dark:bg-gray-800">
                        <option>NOK</option>
                        <option>USD</option>
                        <option>EUR</option>
                    </select>
                </div>

                <input name="productUrl" value={formData.productUrl} onChange={handleChange} type="url" required className="w-full p-2 border rounded" />

                <input name="imageUrl" value={formData.imageUrl || ''} onChange={handleChange} type="url" placeholder="Image URL (optional)" className="w-full p-2 border rounded" />

                <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Save Changes
                </button>
            </div>
        </form>
    );
}