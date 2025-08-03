using System.Security.Claims;
using Application;
using Microsoft.AspNetCore.Authorization;

namespace Web.Controllers;

using Domain;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
[Authorize]
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
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
        {
            return new List<WishlistItem>();
        }
        
        var items = await _wishlistRepository.GetAllForUserAsync(userId);
        return items;
    }
    
    [HttpPost]
    public async Task<IActionResult> AddWishlistItem([FromBody] WishlistItem newItem)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
    
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("User ID not found in token.");
        }
        newItem.UserId = userId;
    
        await _wishlistRepository.AddAsync(newItem);
        
        return CreatedAtAction(nameof(GetWishlistItems), new { id = newItem.Id }, newItem);
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteWishlistItem(int id)
    {
        var item = await _wishlistRepository.GetByIdAsync(id);
        if (item == null)
        {
            return NotFound();
        }

        await _wishlistRepository.DeleteAsync(id);
        
        return NoContent();
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateWishlistItem(int id, [FromBody] WishlistItem updatedItem)
    {
        if (id != updatedItem.Id)
        {
            return BadRequest("ID mismatch.");
        }
        
        var existingItem = await _wishlistRepository.GetByIdAsync(id);
        if (existingItem == null)
        {
            return NotFound();
        }

        await _wishlistRepository.UpdateAsync(updatedItem);
        
        return NoContent();
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<WishlistItem>> GetWishlistItem(int id)
    {
        var item = await _wishlistRepository.GetByIdAsync(id);

        if (item == null)
        {
            return NotFound();
        }

        return Ok(item);
    }
}