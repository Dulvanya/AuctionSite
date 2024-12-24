// Repositories/AuctionItemRepository.cs
using AuctionManagementAPI.Data;
using AuctionManagementAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AuctionManagementAPI.Repositories
{
    public class AuctionItemRepository : IAuctionItemRepository
    {
        private readonly AuctionDbContext _context;

        public AuctionItemRepository(AuctionDbContext context)
        {
            _context = context;
        }

        // Add a new auction item
        public async Task<AuctionItem> AddAuctionItem(AuctionItem auctionItem)
        {
            await _context.AuctionItems.AddAsync(auctionItem);  // Add the item to the database context
            await _context.SaveChangesAsync();  // Save changes to the database
            return auctionItem;  // Return the newly created auction item
        }

        // Get all auction items
        public async Task<IEnumerable<AuctionItem>> GetAuctionItems()
        {
            return await _context.AuctionItems.ToListAsync();  // Return all auction items
        }

        // Get an auction item by ID
        public async Task<AuctionItem> GetAuctionItemById(int id)
        {
            return await _context.AuctionItems.FindAsync(id);  // Find and return the item by its ID
        }
        // Delete an auction item
        public async Task<bool> DeleteAuctionItem(int id)
        {
            var auctionItem = await _context.AuctionItems.FindAsync(id);
            if (auctionItem == null)
            {
                return false;
            }

            _context.AuctionItems.Remove(auctionItem);
            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<IEnumerable<AuctionItem>> GetEndedAuctions()
        {
            return await _context.AuctionItems
                .Where(a => a.EndDate <= DateTime.Now)  // Auction has ended
                .ToListAsync();
        }

    }
}
