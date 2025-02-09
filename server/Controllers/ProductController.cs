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

    // ✅ Get all products
    // GET: api/Product
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        try
        {
            var products = await _context.Products.ToListAsync();

            if (products == null || products.Count == 0)
            {
                return NotFound(new { message = "No products found" });
            }

            return Ok(products);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while fetching products", error = ex.Message });
        }
    }

    // ✅ Get a single product by ID
    // GET: api/Product/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProductById(int id)
    {
        try
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound(new { message = $"Product with ID {id} not found" });
            }

            return Ok(product);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while fetching the product", error = ex.Message });
        }
    }
}
