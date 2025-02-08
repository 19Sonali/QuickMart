using Microsoft.AspNetCore.Mvc;   // Required for API controllers
using Microsoft.EntityFrameworkCore; // Required for DbContext
using QuickMartServer.Data;  // Your database context
using QuickMartServer.Models;  // Your models (Product, Order, Cart, etc.)

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly QuickMartContext _context;

    public ProductController(QuickMartContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        return await _context.Products.ToListAsync();
    }
}
