using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuickMartServer.Data;
using QuickMartServer.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

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
        return await _context.Carts
            .Include(c => c.Product) // 🔹 Include Product details
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Cart>> AddToCart([FromBody] Cart cart) // 🔹 Ensure JSON is correctly mapped
    {
        if (cart == null)
        {
            return BadRequest("Invalid cart data.");
        }

        _context.Carts.Add(cart);
        await _context.SaveChangesAsync();

        // 🔹 Fetch the inserted cart with Product details
        var newCart = await _context.Carts
            .Include(c => c.Product)
            .FirstOrDefaultAsync(c => c.Id == cart.Id);

        return CreatedAtAction(nameof(GetCarts), new { id = cart.Id }, newCart);
    }
}
