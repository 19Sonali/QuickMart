using Microsoft.AspNetCore.Mvc; // Required for API controllers
using Microsoft.EntityFrameworkCore; // Required for DbContext
using QuickMartServer.Data; // Your database context
using QuickMartServer.Models; // Your models (Product, Order, Cart, etc.)
using System.Collections.Generic; // For IEnumerable
using System.Threading.Tasks; // For async/await

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly QuickMartContext _context;

    public ProductController(QuickMartContext context)
    {
        _context = context;
    }

    // GET: api/Product
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        try
        {
            // Retrieve all products from the database
            var products = await _context.Products.ToListAsync();

            // Check if products exist
            if (products == null || products.Count == 0)
            {
                return NotFound(new { message = "No products found" });
            }

            // Return the products with a 200 OK status
            return Ok(products);
        }
        catch (Exception ex)
        {
            // Handle unexpected errors
            return StatusCode(500, new { message = "An error occurred while fetching products", error = ex.Message });
        }
    }
}
