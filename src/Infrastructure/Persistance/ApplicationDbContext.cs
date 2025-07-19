using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistance;

using Domain;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        
    }
    
    public DbSet<WishlistItem> WishlistItems { get; set; }
}