import EditItemForm from '@/components/EditItemForm';

// This function fetches a single item by its ID
async function getWishlistItem(id: string) {
    const res = await fetch(`http://localhost:5298/api/wishlist/${id}`, { cache: 'no-store' });
    if (!res.ok) {
        return null;
    }
    return res.json();
}

export default async function EditPage(props: { params: { id: string } }) {
    const { params } = props;

    const item = await getWishlistItem(params.id);

    if (!item) {
        return <p className="text-center text-red-500">Item not found.</p>;
    }

    return (
        <main className="container mx-auto p-8">
            <EditItemForm item={item} />
        </main>
    );
}