// Repositories/UserRepository.cs
using AuctionManagementAPI.Data;
using AuctionManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AuctionManagementAPI.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AuctionDbContext _context;

        public UserRepository(AuctionDbContext context)
        {
            _context = context;
        }

        public async Task<User> AddUser(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> GetUserByUsername(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        }
        public async Task<User> GetUserById(int userId)
        {
            return await _context.Users.FindAsync(userId); // Fetch the user by UserId
        }
        public async Task<User> UpdateUser(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }
    }
}
