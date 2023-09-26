using Microsoft.AspNetCore.Mvc;

namespace ProductsAppAPI;

[ApiController]
[Route("[controller]")]
public class BooksController : ControllerBase
{
    private static List<Book> _books = InitBooks();

    public BooksController()
    {
    }

    [HttpGet]
    public IActionResult GetAllBooks()
    {
        return Ok(_books);
    }

    [HttpGet("{id}")]
    public IActionResult GetBook(int id)
    {
        var book = _books.Where(b => b.Id == id).FirstOrDefault();

        return book != null ? Ok(book) : NotFound(id);
    }

    [HttpPut("buy")]
    public IActionResult BuyBook([FromBody] PaymentModel payment)
    {
        var book = _books.Where(b => b.Id == payment.BookId).FirstOrDefault();
        if (book != null)
        {
            book.State = "Sold";
            return NoContent();
        }
        return NotFound();
    }

    [HttpPut("rent")]
    public IActionResult RentBook([FromBody] PaymentModel payment)
    {
        var book = _books.Where(b => b.Id == payment.BookId).FirstOrDefault();
        if (book != null)
        {
            book.State = "Rented";
            book.RentUntil = payment.RentTerm;
            return NoContent();
        }
        return NotFound();
    }

    private static List<Book> InitBooks()
    {
        Book book1 = new Book
        {
            Id = 0,
            Name = "The Hunger Games (The Hunger Games, #1)",
            Author = "Suzanne Collins",
            Description = "A dystopian novel set in a post-apocalyptic society where young individuals are chosen to participate in a televised death match.",
            Size = 374, // This is a placeholder, as the actual size in pages or bytes isn't provided.
            ImageUrl = "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1586722975i/2767052.jpg", // Placeholder link to the book's Goodreads page.
            Price = 10, // Placeholder price.
            State = "Available",
            Genre = "Novel"
        };

        Book book2 = new Book
        {
            Id = 1,
            Name = "Harry Potter and the Order of the Phoenix (Harry Potter, #5)",
            Author = "J.K. Rowling",
            Description = "The fifth installment in the Harry Potter series, where Harry faces challenges at Hogwarts and learns more about Voldemort's past.",
            Size = 870,
            ImageUrl = "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546910265i/2.jpg",
            Price = 12,
            State = "Sold",
            Genre = "Fantasy"
        };

        Book book3 = new Book
        {
            Id = 2,
            Name = "Pride and Prejudice",
            Author = "Jane Austen",
            Description = "A classic novel about the manners and matrimonial machinations among the British upper class.",
            Size = 279,
            ImageUrl = "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1320399351i/1885.jpg",
            Price = 8,
            State = "Available",
            Genre = "Novel"
        };

        Book book4 = new Book
        {
            Id = 3,
            Name = "To Kill a Mockingbird",
            Author = "Harper Lee",
            Description = "A novel set in the American South during the 1930s, dealing with issues of racism and moral growth.",
            Size = 324,
            ImageUrl = "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1553383690i/2657.jpg",
            Price = 9,
            State = "Rented",
            Genre = "Novel"
        };

        Book book5 = new Book
        {
            Id = 4,
            Name = "The Book Thief",
            Author = "Markus Zusak",
            Description = "A story set in Nazi Germany narrated by Death. It follows a young girl's relationship with her foster parents, the other residents of their neighborhood, and a Jewish fist-fighter.",
            Size = 552,
            ImageUrl = "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1522157426i/19063.jpg",
            Price = 10,
            State = "Available",
            Genre = "Historical"
        };

        Book book6 = new Book
        {
            Id = 5,
            Name = "The Hobbit",
            Author = "J.R.R. Tolkien",
            Description = "The adventure of Bilbo Baggins as he journeys to help a group of dwarves reclaim their homeland from a dragon.",
            Size = 310,
            ImageUrl = "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1546071216i/5907.jpg",
            Price = 18,
            State = "Available",
            Genre = "Fantasy"
        };

        Book book7 = new Book
        {
            Id = 6,
            Name = "The Nightingale",
            Author = "Kristin Hannah",
            Description = "Set in Nazi-occupied France, the story of two sisters and their struggle to survive and resist during World War II.",
            Size = 440,
            ImageUrl = "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1681839850i/21853621.jpg",
            Price = 20,
            State = "Available",
            Genre = "Historical"
        };

        Book book8 = new Book
        {
            Id = 7,
            Name = "The Shining",
            Author = "Stephen King",
            Description = "A psychological horror novel about a family's stay at a haunted hotel during the winter season.",
            Size = 483,
            ImageUrl = "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1353277730i/11588.jpg",
            Price = 16,
            State = "Rented",
            Genre = "Horror"
        };

        Book book9 = new Book
        {
            Id = 8,
            Name = "Gone Girl",
            Author = "Gillian Flynn",
            Description = "A mystery thriller about the sudden disappearance of a woman and the investigation that follows.",
            Size = 432,
            ImageUrl = "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1554086139i/19288043.jpg",
            Price = 14,
            State = "Available",
            Genre = "Mystery"
        };

        Book book10 = new Book
        {
            Id = 9,
            Name = "The Catcher in the Rye",
            Author = "J.D. Salinger",
            Description = "A classic novel about the experiences of a teenager in New York City.",
            Size = 277,
            ImageUrl = "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1398034300i/5107.jpg",
            Price = 22,
            State = "Available",
            Genre = "Novel"
        };

        Book book11 = new Book
        {
            Id = 10,
            Name = "The Lord of the Rings",
            Author = "J.R.R. Tolkien",
            Description = "A epic fantasy series that follows the quest to destroy the One Ring and defeat the Dark Lord Sauron.",
            Size = 1223,
            ImageUrl = "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
            Price = 30,
            State = "Sold",
            Genre = "Fantasy"
        };

        Book book12 = new Book
        {
            Id = 11,
            Name = "The Great Gatsby",
            Author = "F. Scott Fitzgerald",
            Description = "A novel set in the Jazz Age, portraying the American Dream and its decline.",
            Size = 180,
            ImageUrl = "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1490528560i/4671.jpg",
            Price = 18,
            State = "Sold",
            Genre = "Novel"
        };

        Book book13 = new Book
        {
            Id = 12,
            Name = "Dracula",
            Author = "Bram Stoker",
            Description = "A classic gothic horror novel featuring the vampire Count Dracula.",
            Size = 418,
            ImageUrl = "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1387151694i/17245.jpg",
            Price = 14,
            State = "Available",
            Genre = "Horror"
        };

        return new List<Book> { book1, book2, book3, book4, book5, book6, book7, book8, book9, book10, book11, book12, book13};

    }
}
