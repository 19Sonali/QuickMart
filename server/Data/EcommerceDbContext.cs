using Microsoft.EntityFrameworkCore;
using QuickMartServer.Models;  // Ensure this matches your actual project namespace

namespace QuickMartServer.Data  // Ensure the correct namespace
{
    public class EcommerceDbContext : DbContext
    {
        public EcommerceDbContext(DbContextOptions<EcommerceDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Cart> Carts { get; set; }  // ✅ Corrected property name (plural)
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Payment> Payments { get; set; }
    }
}
