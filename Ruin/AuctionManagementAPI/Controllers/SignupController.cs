// Controllers/SignupController.cs
using AuctionManagementAPI.Models;
using AuctionManagementAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;

namespace AuctionManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SignupController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public SignupController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Signup([FromBody] User user)
        {
            // Log the incoming user object
            //Console.WriteLine($"Received Signup Request: {JsonConvert.SerializeObject(user)}");
            
            // Check if username already exists
            var existingUser = await _userRepository.GetUserByUsername(user.Username);
            if (existingUser != null)
            {
                return BadRequest("Username is already taken.");
            }

            // Hash the password (implement your hashing logic here or use a library)
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            // Add the new user
            var newUser = await _userRepository.AddUser(user);
            return Ok(newUser);
        }
    }
}