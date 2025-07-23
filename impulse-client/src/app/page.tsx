import AddItemForm from '@/components/AddItemForm';
import Wishlist from '@/components/Wishlist';

export default function HomePage() {
    return (
        <main className="container mx-auto p-8">
            <AddItemForm />

            <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

            <Wishlist />
        </main>
    );
}