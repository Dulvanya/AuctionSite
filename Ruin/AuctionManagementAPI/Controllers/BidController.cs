// Controllers/BidController.cs
/*using AuctionManagementAPI.Models;
using AuctionManagementAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AuctionManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BidController : ControllerBase
    {
        private readonly IBidRepository _bidRepository;

        public BidController(IBidRepository bidRepository)
        {
            _bidRepository = bidRepository;
        }

        // Submit a new bid
        // Controllers/BidController.cs
    [HttpPost]
    public async Task<IActionResult> AddBid([FromBody] AddBidRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new { Message = "Invalid data.", Errors = ModelState });
        }

        try
        {
            var userId = request.UserId;  // Get user from the request (e.g., from form or token)

            // Create the bid object using only the necessary data
            var bid = new Bid
            {
                AuctionItemId = request.AuctionItemId,  // Use foreign key ID
                UserId = userId,                        // Use foreign key ID
                Amount = request.Amount,
                Timestamp = DateTime.UtcNow,
                TransactionId = request.TransactionId // Example transaction ID
            };

            var newBid = await _bidRepository.AddBid(bid);  // Call to save bid in the repository

            return CreatedAtAction(nameof(GetBidsByAuctionItem), new { auctionItemId = newBid.AuctionItemId }, newBid);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = "An error occurred while submitting the bid.", Details = ex.Message });
        }
    }


        // Get bids for a specific auction item
        [HttpGet("auction/{auctionItemId}")]
        public async Task<IActionResult> GetBidsByAuctionItem(int auctionItemId)
        {
            var bids = await _bidRepository.GetBidsByAuctionItemId(auctionItemId);
            return Ok(bids);
        }

        // Get bids by user ID
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetBidsByUser(int userId)
        {
            var bids = await _bidRepository.GetBidsByUserId(userId);
            return Ok(bids);
        }
    }
}
*/

// Controllers/BidController.cs
using AuctionManagementAPI.Models;
using AuctionManagementAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AuctionManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BidController : ControllerBase
    {
        private readonly IBidRepository _bidRepository;

        public BidController(IBidRepository bidRepository)
        {
            _bidRepository = bidRepository;
        }

        // Submit a new bid
        [HttpPost]
        public async Task<IActionResult> AddBid([FromBody] AddBidRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid data.", Errors = ModelState });
            }

            try
            {
                // Create the bid object using only the necessary data
                var bid = new Bid
                {
                    AuctionItemId = request.AuctionItemId,  // Use foreign key ID
                    UserId = request.UserId,                // Use foreign key ID
                    Amount = request.Amount,
                    Timestamp = DateTime.UtcNow,
                    TransactionId = request.TransactionId  // Optional: transaction ID (PayPal or similar)
                };

                var newBid = await _bidRepository.AddBid(bid);  // Call repository to save the bid

                return CreatedAtAction(nameof(GetBidsByAuctionItem), new { auctionItemId = newBid.AuctionItemId }, newBid);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while submitting the bid.", Details = ex.Message });
            }
        }

        // Get bids for a specific auction item
        [HttpGet("auction/{auctionItemId}")]
        public async Task<IActionResult> GetBidsByAuctionItem(int auctionItemId)
        {
            var bids = await _bidRepository.GetBidsByAuctionItemId(auctionItemId);
            return Ok(bids);
        }

        // Get bids by user ID
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetBidsByUser(int userId)
        {
            var bids = await _bidRepository.GetBidsByUserId(userId);
            return Ok(bids);
        }
    }
}
