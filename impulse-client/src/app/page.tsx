import AddItemForm from '@/components/AddItemForm';

async function getWishlistItems() {
  const res = await fetch('http://localhost:5298/api/wishlist', {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data from API');
  }

  return res.json();
}

// Defining type for item
type WishlistItem = {
    id: number;
    itemName: string;
    price: number;
    productUrl: string;
    dateAdded: string;
    currency: string;
    imageUrl?: string;
};

export default async function HomePage() {
    const items: WishlistItem[] = await getWishlistItems();

    return (
        <main className="container mx-auto p-8">
            <AddItemForm />

            <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
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
                    </div>
                ))}
            </div>
        </main>
    );
}