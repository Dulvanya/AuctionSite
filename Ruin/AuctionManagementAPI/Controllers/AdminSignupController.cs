// Controllers/AdminSignupController.cs
using AuctionManagementAPI.Models;
using AuctionManagementAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;

namespace AuctionManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminSignupController : ControllerBase
    {
        private readonly IAdminRepository _adminRepository;

        public AdminSignupController(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Signup([FromBody] Admin admin)
        {
            // Check if admin with the given username already exists
            var existingAdmin = await _adminRepository.GetAdminByUsername(admin.Username);
            if (existingAdmin != null)
            {
                return BadRequest("Username is already taken.");
            }

            // Hash the password before saving the admin
            admin.Password = BCrypt.Net.BCrypt.HashPassword(admin.Password);

            // Add the new admin to the database
            var newAdmin = await _adminRepository.AddAdmin(admin);
            return Ok(newAdmin);
        }
    }
}
