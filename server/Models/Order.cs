using System.ComponentModel.DataAnnotations;  // Required for [Key]
using System.ComponentModel.DataAnnotations.Schema; 

namespace QuickMartServer.Models
{
    public class Order
    {
        [Key] 
        public int OrderID { get; set; }

        [Required(ErrorMessage = "Customer name is required")] 
        public string CustomerName { get; set; } = string.Empty; // 🔹 Prevents null reference errors

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; } = string.Empty;

        [Required(ErrorMessage = "Total amount is required")]
        [Range(0, double.MaxValue, ErrorMessage = "Total amount must be a positive number")]
        public decimal TotalAmount { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.Now; // ✅ Default value assigned
    }
}
