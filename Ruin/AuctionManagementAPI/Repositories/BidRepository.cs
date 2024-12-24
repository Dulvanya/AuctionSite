// Repositories/BidRepository.cs
/*using AuctionManagementAPI.Data;
using AuctionManagementAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AuctionManagementAPI.Repositories
{
    public class BidRepository : IBidRepository
    {
        private readonly AuctionDbContext _context;

        public BidRepository(AuctionDbContext context)
        {
            _context = context;
        }

        public async Task<Bid> AddBid(Bid bid)
        {
            await _context.Bids.AddAsync(bid); // Add the bid to the context
            await _context.SaveChangesAsync(); // Save changes to the database
            return bid; // Return the newly created bid
        }

        public async Task<IEnumerable<Bid>> GetBidsByAuctionItemId(int auctionItemId)
        {
            return await _context.Bids
                                 .Include(b => b.User)
                                 .Include(b => b.AuctionItem)
                                 .Where(b => b.AuctionItemId == auctionItemId)
                                 .ToListAsync();
        }

        public async Task<IEnumerable<Bid>> GetBidsByUserId(int userId)
        {
            return await _context.Bids
                                 .Include(b => b.User)
                                 .Where(b => b.UserId == userId)
                                 .ToListAsync();
        }
    }
}
*/

// Repositories/BidRepository.cs
using AuctionManagementAPI.Data;
using AuctionManagementAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AuctionManagementAPI.Repositories
{
    public class BidRepository : IBidRepository
    {
        private readonly AuctionDbContext _context;

        public BidRepository(AuctionDbContext context)
        {
            _context = context;
        }

        // Add a new bid
        public async Task<Bid> AddBid(Bid bid)
        {
            await _context.Bids.AddAsync(bid);  // Add bid to the database context
            await _context.SaveChangesAsync();  // Save changes to the database
            return bid;  // Return the newly created bid
        }

        // Get bids by auction item ID
        public async Task<IEnumerable<Bid>> GetBidsByAuctionItemId(int auctionItemId)
        {
            return await _context.Bids
                                 .Include(b => b.User)
                                 .Include(b => b.AuctionItem)
                                 .Where(b => b.AuctionItemId == auctionItemId)
                                 .ToListAsync();
        }

        // Get bids by user ID
        public async Task<IEnumerable<Bid>> GetBidsByUserId(int userId)
        {
            return await _context.Bids
                                 .Include(b => b.User)
                                 .Where(b => b.UserId == userId)
                                 .ToListAsync();
        }
        public async Task<Bid> GetHighestBidForAuctionItem(int auctionItemId)
        {
            return await _context.Bids
                .Where(b => b.AuctionItemId == auctionItemId)
                .OrderByDescending(b => b.Amount)
                .FirstOrDefaultAsync();
        }
    }
}
