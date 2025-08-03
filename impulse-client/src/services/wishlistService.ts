const API_BASE_URL = 'http://localhost:5298/api';

const getAuthHeaders = () => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('token');
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};

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
                headers: getAuthHeaders(),
                body: JSON.stringify(item),
            });
            return res.ok ? await res.json() : null;
        } catch (error) {
            console.error('Error in wishlistService.addItem:', error);
            return null;
        }
    },

    async deleteItem(id: number) {
        try {
            const res = await fetch(`${API_BASE_URL}/wishlist/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders(),
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
                headers: getAuthHeaders(),
                body: JSON.stringify(item),
            });
            return res.ok;
        } catch (error) {
            console.error('Error in wishlistService.updateItem:', error);
            return false;
        }
    },
};