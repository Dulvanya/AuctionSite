// Repositories/IAdminRepository.cs
using AuctionManagementAPI.Models;

namespace AuctionManagementAPI.Repositories
{
    public interface IAdminRepository
    {
        Task<Admin> AddAdmin(Admin admin);         // Create a new Admin
        Task<Admin> GetAdminByUsername(string username); // Get an Admin by Username
        Task<Admin> GetAdminById(int adminId);     // Get an Admin by Id
        Task<Admin> UpdateAdmin(Admin admin);      // Update Admin information
    }
}
