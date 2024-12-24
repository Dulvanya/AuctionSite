// Repositories/AdminRepository.cs
using AuctionManagementAPI.Data;
using AuctionManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AuctionManagementAPI.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly AuctionDbContext _context;

        public AdminRepository(AuctionDbContext context)
        {
            _context = context;
        }

        // Add new admin
        public async Task<Admin> AddAdmin(Admin admin)
        {
            await _context.Admins.AddAsync(admin); // Use Admins DB set
            await _context.SaveChangesAsync();
            return admin;
        }

        // Fetch an admin by username
        public async Task<Admin> GetAdminByUsername(string username)
        {
            return await _context.Admins.FirstOrDefaultAsync(a => a.Username == username); // Search in Admins
        }

        // Fetch an admin by ID
        public async Task<Admin> GetAdminById(int adminId)
        {
            return await _context.Admins.FindAsync(adminId); // Fetch by AdminId
        }

        // Update admin information
        public async Task<Admin> UpdateAdmin(Admin admin)
        {
            _context.Admins.Update(admin); // Update Admin
            await _context.SaveChangesAsync();
            return admin;
        }
    }
}
