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

    // 🔹 Fetch all cart items including product details
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
    {
        var carts = await _context.Carts
            .Include(c => c.Product) // ✅ Fetch product details
            .ToListAsync();
        
        return Ok(carts);
    }

    // 🔹 Add product to cart
    [HttpPost]
    public async Task<ActionResult<Cart>> AddToCart([FromBody] Cart cart)
    {
        if (cart == null || cart.ProductId <= 0 || cart.Quantity <= 0)
        {
            return BadRequest("Invalid cart data.");
        }

        // 🔹 Check if the product exists before adding to the cart
        var product = await _context.Products.FindAsync(cart.ProductId);
        if (product == null)
        {
            return NotFound("Product not found.");
        }

        // 🔹 Create new cart item
        var cartItem = new Cart
        {
            ProductId = cart.ProductId,
            Quantity = cart.Quantity
        };

        _context.Carts.Add(cartItem);
        await _context.SaveChangesAsync();

        // 🔹 Fetch newly added cart item with product details
        var newCartItem = await _context.Carts
            .Include(c => c.Product)
            .FirstOrDefaultAsync(c => c.Id == cartItem.Id);

        return CreatedAtAction(nameof(GetCarts), new { id = cartItem.Id }, newCartItem);
    }

    // 🔹 Remove an item from the cart
    [HttpDelete("{id}")]
    public async Task<IActionResult> RemoveFromCart(int id)
    {
        var cartItem = await _context.Carts.FindAsync(id);
        if (cartItem == null)
        {
            return NotFound("Cart item not found.");
        }

        _context.Carts.Remove(cartItem);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}