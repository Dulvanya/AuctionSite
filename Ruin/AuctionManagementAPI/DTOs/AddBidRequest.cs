// DTOs/AddBidRequest.cs
public class AddBidRequest
{
    public int AuctionItemId { get; set; }  // Foreign key ID for AuctionItem
    public int UserId { get; set; }  // Foreign key ID for User
    public decimal Amount { get; set; }  // Bid amount
    public string TransactionId { get; set; }  // Transaction ID, if applicable
}
