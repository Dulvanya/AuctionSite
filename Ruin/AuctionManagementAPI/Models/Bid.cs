// Models/Bid.cs
/*using System;

namespace AuctionManagementAPI.Models
{
    public class Bid
    {
        public int Id { get; set; } // Primary key

        // Foreign key referencing AuctionItem
        public int AuctionItemId { get; set; }
        public int AuctionItem { get; set; }

        // Foreign key referencing User
        public int UserId { get; set; }
        public int User { get; set; }

        public decimal Amount { get; set; }
        public DateTime Timestamp { get; set; } // The time the bid was placed
        public string TransactionId { get; set; } // The ID from PayPal or other payment gateway
    }
}
*/

using System;

namespace AuctionManagementAPI.Models
{
    public class Bid
    {
        public int Id { get; set; } // Primary key

        // Foreign key referencing AuctionItem
        public int AuctionItemId { get; set; }
        // Remove the navigation property if not needed for inserts
        public AuctionItem AuctionItem { get; set; } // Optional navigation property

        // Foreign key referencing User
        public int UserId { get; set; }
        // Remove the navigation property if not needed for inserts
        public User User { get; set; } // Optional navigation property

        public decimal Amount { get; set; }
        public DateTime Timestamp { get; set; } // The time the bid was placed
        public string TransactionId { get; set; } // The ID from PayPal or other payment gateway
    }
}
