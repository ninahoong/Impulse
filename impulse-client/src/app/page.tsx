async function getWishlistItems() {
  // We fetch data from our .NET backend.
  // Make sure your .NET API is running!
  // The port (e.g., 7123) might be different for you. Check the Rider console.
  const res = await fetch('http://localhost:5298/api/wishlist', {
    cache: 'no-store' // Disables caching for development
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data from API');
  }

  return res.json();
}

// Define a type for our item to use in the component
type WishlistItem = {
  id: number;
  itemName: string;
  price: number;
  productUrl: string;
  dateAdded: string;
};

export default async function HomePage() {
  const items: WishlistItem[] = await getWishlistItems();

  return (
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
        <div className="space-y-4">
          {items.map((item) => (
              <div key={item.id} className="p-4 border rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold">{item.itemName}</h2>
                <p className="text-lg text-green-600">${item.price.toFixed(2)}</p>
                <a href={item.productUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  View Product
                </a>
              </div>
          ))}
        </div>
      </main>
  );
}