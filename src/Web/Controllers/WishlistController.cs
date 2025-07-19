using Application;

namespace Web.Controllers;

using Domain;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class WishlistController : ControllerBase
{
    private readonly IWishlistRepository _wishlistRepository;

    public WishlistController(IWishlistRepository wishlistRepository)
    {
        _wishlistRepository = wishlistRepository;
        
    }

    [HttpGet]
    public async Task<List<WishlistItem>> GetWishlistItems()
    {
        Console.WriteLine("WishlistController::GetWishlistItems()");
        var items = await _wishlistRepository.GetAllAsync();
        return items;
    }
}