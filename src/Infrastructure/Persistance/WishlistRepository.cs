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
        item.DateAdded = DateTime.UtcNow; // Set the date when adding
        _context.WishlistItems.Add(item);
        await _context.SaveChangesAsync();
    }
}