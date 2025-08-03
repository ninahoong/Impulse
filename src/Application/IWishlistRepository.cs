using Domain;

namespace Application;

public interface IWishlistRepository
{
    Task<List<WishlistItem>> GetAllForUserAsync(string userId);
    Task AddAsync(WishlistItem item); 
    Task<WishlistItem?> GetByIdAsync(int id); 
    Task DeleteAsync(int id);
    Task  UpdateAsync(WishlistItem item);
}