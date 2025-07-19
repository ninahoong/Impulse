using Domain;

namespace Application;

public interface IWishlistRepository
{
    Task<List<WishlistItem>> GetAllAsync();
}