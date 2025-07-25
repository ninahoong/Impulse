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
    
    [HttpPost]
    public async Task<IActionResult> AddWishlistItem([FromBody] WishlistItem newItem)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
    
        // Use the repository to add the new item and save changes
        await _wishlistRepository.AddAsync(newItem);

        // Return a "Created" response with the new item
        return CreatedAtAction(nameof(GetWishlistItems), new { id = newItem.Id }, newItem);
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteWishlistItem(int id)
    {
        var item = await _wishlistRepository.GetByIdAsync(id);
        if (item == null)
        {
            // If the item doesn't exist, return a 404 Not Found response.
            return NotFound();
        }

        await _wishlistRepository.DeleteAsync(id);

        // Return a 204 No Content response, which is standard for a successful delete.
        return NoContent();
    }
}