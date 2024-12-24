using AuctionManagementAPI.Repositories;
using AuctionManagementAPI.Models;  // If needed for models like Bid or AuctionItem
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace AuctionManagementAPI.Services
{
    public class ReminderService
    {
        private readonly IAuctionItemRepository _auctionItemRepository;
        private readonly IBidRepository _bidRepository;
        private readonly IEmailService _emailService;

        public ReminderService(IAuctionItemRepository auctionItemRepository, IBidRepository bidRepository, IEmailService emailService)
        {
            _auctionItemRepository = auctionItemRepository;
            _bidRepository = bidRepository;
            _emailService = emailService;
        }

        public async Task SendReminderEmailsForEndedAuctions()
        {
            var endedAuctions = await _auctionItemRepository.GetEndedAuctions();

            foreach (var auction in endedAuctions)
            {
                var highestBid = await _bidRepository.GetHighestBidForAuctionItem(auction.Id);

                if (highestBid != null)
                {
                    await _emailService.SendPaymentReminder(highestBid.User.Email, auction.ItemName, highestBid.Amount);
                }
            }
        }
    }
}
