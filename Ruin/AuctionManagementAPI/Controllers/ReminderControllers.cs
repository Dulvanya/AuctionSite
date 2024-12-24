// ReminderController.cs

using AuctionManagementAPI.Models;
using AuctionManagementAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using AuctionManagementAPI.Services;

[ApiController]
[Route("api/[controller]")]
public class ReminderControllers : ControllerBase
{
    private readonly IEmailService _emailService;

    public ReminderControllers(IEmailService emailService)
    {
        _emailService = emailService;
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendReminder([FromBody] ReminderRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            await _emailService.SendEmailAsync(request.Email, "Reminder", request.Message);
            return Ok(new { message = "Reminder sent successfully!" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Failed to send reminder.", error = ex.Message });
        }
    }
}

public class ReminderRequest
{
    public string Email { get; set; }
    public string Message { get; set; }
}
