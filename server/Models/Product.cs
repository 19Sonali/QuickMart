using System.ComponentModel.DataAnnotations;

namespace QuickMartServer.Models
{
    public class Product
    {
        [Key]
        public int ProductID { get; set; }

        [Required(ErrorMessage = "Product name is required")]
        public string Name { get; set; } = string.Empty; // 🔹 Fixes CS8618 warning

        public string Description { get; set; } = string.Empty; // 🔹 Prevents null exceptions

        [Required(ErrorMessage = "Price is required")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than zero")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "Stock is required")]
        [Range(0, int.MaxValue, ErrorMessage = "Stock cannot be negative")]
        public int Stock { get; set; }
    }
}
