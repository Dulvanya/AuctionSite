using AuctionManagementAPI.Models;
using AuctionManagementAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AuctionManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuctionItemController : ControllerBase
    {
        private readonly IAuctionItemRepository _auctionItemRepository;

        public AuctionItemController(IAuctionItemRepository auctionItemRepository)
        {
            _auctionItemRepository = auctionItemRepository;
        }

        // Add a new auction item
        [HttpPost]
        public async Task<IActionResult> AddAuctionItem([FromBody] AuctionItem auctionItem)
        {
            // Validate the model
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid data.", Errors = ModelState });
            }

            try
            {
                // Add the auction item to the repository
                var newAuctionItem = await _auctionItemRepository.AddAuctionItem(auctionItem);
                return CreatedAtAction(nameof(GetAuctionItem), new { id = newAuctionItem.Id }, newAuctionItem);
            }
            catch (Exception ex)
            {
                // Log the exception (consider using a logging framework)
                return StatusCode(500, new { Message = "An error occurred while adding the auction item.", Details = ex.Message });
            }
        }

        // Get all auction items
        [HttpGet]
        public async Task<IActionResult> GetAuctionItems()
        {
            try
            {
                var items = await _auctionItemRepository.GetAuctionItems();
                return Ok(items);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, new { Message = "An error occurred while retrieving auction items.", Details = ex.Message });
            }
        }

        // Get a specific auction item by id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAuctionItem(int id)
        {
            try
            {
                var item = await _auctionItemRepository.GetAuctionItemById(id);
                if (item == null)
                {
                    return NotFound(new { Message = "Auction item not found." });
                }
                return Ok(item);
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, new { Message = "An error occurred while retrieving the auction item.", Details = ex.Message });
            }
        }
        // Delete a specific auction item by id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuctionItem(int id)
        {
            try
            {
                var deleted = await _auctionItemRepository.DeleteAuctionItem(id);
                if (!deleted)
                {
                    return NotFound(new { Message = "Auction item not found." });
                }
                return NoContent(); // Item successfully deleted, no content to return
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while deleting the auction item.", Details = ex.Message });
            }
        }
    }
}
