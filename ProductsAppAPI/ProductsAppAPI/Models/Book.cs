namespace ProductsAppAPI;

public class Book
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Author { get; set; }
    public string Description { get; set; }
    public int Size { get; set; }
    public string Genre { get; set; }
    public string ImageUrl { get; set; }
    public int Price { get; set; }
    public string State { get; set; }
    public int RentUntil { get; set; }
}
    
public class PaymentModel
{
    public int BookId { get; set;}
    public int RentTerm { get; set; }
}
