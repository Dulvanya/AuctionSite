using AuctionManagementAPI.Validation; // Add this

namespace AuctionManagementAPI.Models
{
    public class AuctionItem
    {
        public int Id { get; set; }
        public required string ItemName { get; set; }
        public required string Description { get; set; }
        public required string Category { get; set; }
        public required decimal StartingBid { get; set; }
        public required DateTime StartDate { get; set; }
        
        [DateGreaterThan("StartDate", ErrorMessage = "End date must be greater than start date.")]
        public required DateTime EndDate { get; set; }
        public required string ImageUrl { get; set; }
    }
}
