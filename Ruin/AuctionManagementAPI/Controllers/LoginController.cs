// Controllers/LoginController.cs
/*using AuctionManagementAPI.Models;
using AuctionManagementAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;

namespace AuctionManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public LoginController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // Check if the user exists in the database
            var user = await _userRepository.GetUserByUsername(request.Username);
            if (user == null)
            {
                return BadRequest("Invalid username or password.");
            }

            // Verify the password using BCrypt
            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return BadRequest("Invalid username or password.");
            }

            // If login is successful, you can return user info or token here (if JWT is implemented)
            // For now, we'll just return a success message
            return Ok(new { Message = "Login successful!", User = user.Username });
        }
    }
}
*/

using AuctionManagementAPI.Models;
using AuctionManagementAPI.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using BCrypt.Net;

namespace AuctionManagementAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public LoginController(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            // Check if the user exists in the database
            var user = await _userRepository.GetUserByUsername(request.Username);
            if (user == null)
            {
                return BadRequest("Invalid username or password.");
            }

            // Verify the password using BCrypt
            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return BadRequest("Invalid username or password.");
            }

            // If login is successful, generate JWT token
            var token = GenerateJwtToken(user);

            // Return the token in the response
            return Ok(new { Token = token, Message = "Login successful!" });
        }

        private string GenerateJwtToken(User user)
        {
            // Get JWT settings from configuration
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings["SecretKey"];
            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];
            var expiresInMinutes = int.Parse(jwtSettings["ExpiresInMinutes"]);

            // Create security key
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

            // Create credentials
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Create claims
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("userId", user.UserId.ToString()) // Corrected to UserId
            };

            // Create token
            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(expiresInMinutes),
                signingCredentials: credentials
            );

            // Return serialized token
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
