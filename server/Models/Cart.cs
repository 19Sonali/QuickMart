using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuickMartServer.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int ProductId { get; set; } // 🔹 Ensure it's required

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]
        public int Quantity { get; set; } // 🔹 Add validation

        [ForeignKey("ProductId")]
        public Product? Product { get; set; } // 🔹 Nullable for EF navigation
    }
}
