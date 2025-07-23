'use client';

import { wishlistService } from '@/services/wishlistService';

export default function AddItemForm() {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const newItem = {
            itemName: formData.get('itemName') as string,
            price: parseFloat(formData.get('price') as string),
            productUrl: formData.get('productUrl') as string,
        };

        const result = await wishlistService.addItem(newItem);

        if (result) {
            alert('Item added successfully!');
            window.location.reload(); // Reload to see the updated list
        } else {
            alert('Failed to add item. Check the console for errors.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Add New Wish</h2>
            <div className="space-y-4">
                <input name="itemName" type="text" placeholder="Item Name" required className="w-full p-2 border rounded" />
                <input name="price" type="number" step="0.01" placeholder="Price" required className="w-full p-2 border rounded" />
                <input name="productUrl" type="url" placeholder="Product URL" required className="w-full p-2 border rounded" />
                <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Add to Wishlist
                </button>
            </div>
        </form>
    );
}