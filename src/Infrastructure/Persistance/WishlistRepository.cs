using Application;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistance;

public class WishlistRepository : IWishlistRepository
{
    private readonly ApplicationDbContext _context;

    public WishlistRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<WishlistItem>> GetAllAsync()
    {
        return await _context.WishlistItems.ToListAsync();
    }
    
    public async Task AddAsync(WishlistItem item)
    {
        item.DateAdded = DateTime.UtcNow; 
        _context.WishlistItems.Add(item);
        await _context.SaveChangesAsync();
    }
    
    public async Task<WishlistItem?> GetByIdAsync(int id)
    {
        return await _context.WishlistItems.FindAsync(id);
    }
    
    public async Task DeleteAsync(int id)
    {
        var itemToDelete = await _context.WishlistItems.FindAsync(id);
        if (itemToDelete != null)
        {
            _context.WishlistItems.Remove(itemToDelete);
            await _context.SaveChangesAsync();
        }
    }

    public async Task UpdateAsync(WishlistItem updatedItem)
    {
        var existingItem = await _context.WishlistItems.FindAsync(updatedItem.Id);
        
        if (existingItem != null)
        {
            existingItem.ItemName = updatedItem.ItemName;
            existingItem.Price = updatedItem.Price;
            existingItem.Currency = updatedItem.Currency;
            existingItem.ProductUrl = updatedItem.ProductUrl;
            existingItem.ImageUrl = updatedItem.ImageUrl;
            
            await _context.SaveChangesAsync();
        }
    }
}