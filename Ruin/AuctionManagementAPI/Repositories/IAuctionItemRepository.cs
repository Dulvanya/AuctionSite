// Repositories/IAuctionItemRepository.cs
using AuctionManagementAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AuctionManagementAPI.Repositories
{
    public interface IAuctionItemRepository
    {
        Task<AuctionItem> AddAuctionItem(AuctionItem auctionItem);
        Task<IEnumerable<AuctionItem>> GetAuctionItems();
        Task<AuctionItem> GetAuctionItemById(int id);
        Task<bool> DeleteAuctionItem(int id);  // New method to delete auction items
        Task<IEnumerable<AuctionItem>> GetEndedAuctions();
    }
}
