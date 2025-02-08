using Microsoft.AspNetCore.Mvc; // Required for [HttpGet], [HttpPost]
using Microsoft.EntityFrameworkCore; // Required for DbContext
using QuickMartServer.Data;  // Your DbContext
using QuickMartServer.Models;  // Your Cart model

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly QuickMartContext _context;

    public CartController(QuickMartContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
    {
        return await _context.Carts.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Cart>> AddToCart(Cart cart)
    {
        _context.Carts.Add(cart);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCarts), new { id = cart.Id }, cart);
    }
}
