using AuctionManagementAPI.Models;
using AuctionManagementAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using AuctionManagementAPI.Services;

namespace AuctionManagementAPI.Controllers
{
    public class ReminderController : ControllerBase
{
    private readonly ReminderService _reminderService;

    public ReminderController(ReminderService reminderService)
    {
        _reminderService = reminderService;
    }

    [HttpPost("send-reminders")]
    public async Task<IActionResult> SendReminders()
    {
        await _reminderService.SendReminderEmailsForEndedAuctions();
        return Ok(new { Message = "Reminder emails sent successfully." });
    }
}

}