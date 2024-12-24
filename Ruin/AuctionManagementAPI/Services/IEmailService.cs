namespace AuctionManagementAPI.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body);
        Task SendBulkEmailAsync(List<string> recipients, string subject, string body);
        Task SendPaymentReminder(string to, string itemName, decimal amount);
    }
}
