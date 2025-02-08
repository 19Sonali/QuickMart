using Microsoft.AspNetCore.Mvc;  // Required for HttpPost, ControllerBase
using QuickMartServer.Models;
 
using Microsoft.EntityFrameworkCore; // Required for DbContext
using QuickMartServer.Data;  // Your database context


[Route("api/[controller]")]
[ApiController]
public class CheckoutController : ControllerBase
{
    private readonly QuickMartContext _context;

    public CheckoutController(QuickMartContext context)
    {
        _context = context;
    }

    [HttpPost("customer")]
    public async Task<ActionResult<Order>> StoreCustomerDetails(Order order)
    {
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(StoreCustomerDetails), new { id = order.OrderID }, order);
    }

    [HttpPost("payment")]
    public async Task<ActionResult<Payment>> StorePaymentDetails(Payment payment)
    {
        _context.Payments.Add(payment);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(StorePaymentDetails), new { id = payment.PaymentID }, payment);
    }
}
