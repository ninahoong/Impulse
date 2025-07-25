namespace Domain;

public class WishlistItem
{
    public int Id { get; set; }
    public required string ItemName { get; set; }
    public decimal Price { get; set; }
    public required string ProductUrl { get; set; }
    public DateTime DateAdded { get; set; }
    public required String Currency { get; set; } = "NOK";
    public string? ImageUrl { get; set; }

}