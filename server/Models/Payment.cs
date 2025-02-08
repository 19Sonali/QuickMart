using System.ComponentModel.DataAnnotations;

namespace QuickMartServer.Models
{
    public class Payment
    {
        [Key]
        public int PaymentID { get; set; }

        [Required(ErrorMessage = "Order ID is required")]
        public int OrderID { get; set; }

        [Required(ErrorMessage = "Payment method is required")]
        public string PaymentMethod { get; set; } = string.Empty; // 🔹 Fixes CS8618 warning

        [Required]
        public string PaymentStatus { get; set; } = "Pending"; // ✅ Default value assigned
    }
}
