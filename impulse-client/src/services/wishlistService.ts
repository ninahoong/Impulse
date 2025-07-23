const API_BASE_URL = 'http://localhost:5298/api';

// Define the type for a new item, without the 'id' or 'dateAdded'
type NewWishlistItem = {
    itemName: string;
    price: number;
    productUrl: string;
};

export const wishlistService = {
    // --- Function to add a new item ---
    async addItem(item: NewWishlistItem) {
        try {
            const res = await fetch(`${API_BASE_URL}/wishlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });

            if (!res.ok) {
                throw new Error('Failed to add item. Backend responded with an error.');
            }
            return await res.json();
        } catch (error) {
            console.error('Error in wishlistService.addItem:', error);
            return null;
        }
    },
};