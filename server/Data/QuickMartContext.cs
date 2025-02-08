using Microsoft.EntityFrameworkCore;
using QuickMartServer.Models;

namespace QuickMartServer.Data // ✅ Add this namespace
{
    public class QuickMartContext : DbContext
    {
        public QuickMartContext(DbContextOptions<QuickMartContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Payment> Payments { get; set; }
    }
}
