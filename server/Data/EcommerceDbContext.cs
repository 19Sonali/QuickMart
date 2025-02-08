using Microsoft.EntityFrameworkCore;
using QuickMart.Models;  // Change EcommerceAPI.Models to your actual project namespace

namespace QuickMart.Data  // Use correct namespace
{
    public class EcommerceDbContext : DbContext
    {
        public EcommerceDbContext(DbContextOptions<EcommerceDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Payment> Payments { get; set; }
    }
}
