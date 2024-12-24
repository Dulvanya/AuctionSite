// Repositories/IBidRepository.cs
using AuctionManagementAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AuctionManagementAPI.Repositories
{
    public interface IBidRepository
    {
        Task<Bid> AddBid(Bid bid);
        Task<IEnumerable<Bid>> GetBidsByAuctionItemId(int auctionItemId);
        Task<IEnumerable<Bid>> GetBidsByUserId(int userId);
        Task<Bid> GetHighestBidForAuctionItem(int auctionItemId);
    }
}
