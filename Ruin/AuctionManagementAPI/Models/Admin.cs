// Models/Admin.cs
using System.ComponentModel.DataAnnotations;

namespace AuctionManagementAPI.Models
{
    public class Admin
    {
        [Key]
        public int AdminId { get; set; }

        [Required]
        public required string Username { get; set; }

        [Required]
        public required string Password { get; set; }

        [Required]
        [EmailAddress]
        public required string Email { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now; // Auto-sets to current date
    }
}
