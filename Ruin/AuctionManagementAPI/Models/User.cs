// Models/User.cs
using System.ComponentModel.DataAnnotations;

namespace AuctionManagementAPI.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        public required string Username { get; set; }

        [Required]
        public required string Password { get; set; }

        [Required]
        public required string Email { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
