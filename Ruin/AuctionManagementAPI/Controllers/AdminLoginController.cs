// Controllers/AdminLoginController.cs
using AuctionManagementAPI.Repositories;
using AuctionManagementAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AuctionManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminLoginController : ControllerBase
    {
        private readonly IAdminRepository _adminRepository;

        public AdminLoginController(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] Admin loginData)
        {
            var admin = await _adminRepository.GetAdminByUsername(loginData.Username);

            if (admin == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            // Verify the password
            bool isValidPassword = BCrypt.Net.BCrypt.Verify(loginData.Password, admin.Password);
            if (!isValidPassword)
            {
                return Unauthorized("Invalid username or password.");
            }

            // Handle login logic (JWT token creation, etc.)
            return Ok(new { message = "Login successful", admin });
        }
    }
}
