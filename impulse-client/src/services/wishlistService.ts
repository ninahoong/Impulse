const API_BASE_URL = 'http://localhost:5298/api';

type NewWishlistItem = {
    itemName: string;
    price: number;
    productUrl: string;
    currency: string;
    imageUrl?: string;
};

export const wishlistService = {
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

    async deleteItem(id: number) {
        try {
            const res = await fetch(`${API_BASE_URL}/wishlist/${id}`, {
                method: 'DELETE',
            });
            return res.ok;
        } catch (error) {
            console.error('Error in wishlistService.deleteItem:', error);
            return false;
        }
    },

    async updateItem(id: number, item: any) {
        try {
            const res = await fetch(`${API_BASE_URL}/wishlist/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            return res.ok;
        } catch (error) {
            console.error('Error in wishlistService.updateItem:', error);
            return false;
        }
    },
};