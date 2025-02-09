using System.ComponentModel.DataAnnotations; // Required for [Key] and validation attributes
using System.ComponentModel.DataAnnotations.Schema; // Required for Entity Framework Core

namespace QuickMartServer.Models
{
    public class Customer
    {
        [Key] // 🔹 Marks this as the Primary Key
        public int CustomerID { get; set; }

        [Required(ErrorMessage = "First name is required")] // 🔹 Ensures FirstName cannot be null
        public string FirstName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Last name is required")]
        public string LastName { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")] // 🔹 Ensures proper email format
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Phone number is required")]
        [Phone(ErrorMessage = "Invalid phone number format")]
        public string Phone { get; set; } = string.Empty;

        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; } = string.Empty;
    }
}
