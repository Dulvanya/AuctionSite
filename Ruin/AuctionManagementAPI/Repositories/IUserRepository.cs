// Repositories/IUserRepository.cs
using AuctionManagementAPI.Models;

namespace AuctionManagementAPI.Repositories
{
    public interface IUserRepository
    {
        Task<User> AddUser(User user);
        Task<User> GetUserByUsername(string username);
        Task<User> GetUserById(int userId); // Add this method
        Task<User> UpdateUser(User user); // Add this to the interface
    }
}
