using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using QuickMartServer.Models; // 🔹 Ensure this is included

namespace QuickMartServer.Models // 🔹 Make sure it's inside the correct namespace
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }

        public int ProductId { get; set; }

        public int Quantity { get; set; }

        // 🔹 Fix CS0246: Ensure that Product is recognized
        [ForeignKey("ProductId")]
        public Product? Product { get; set; } // Allows navigation to Product
    }
}
