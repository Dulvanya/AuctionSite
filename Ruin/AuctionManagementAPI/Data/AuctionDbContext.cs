// Data/AuctionDbContext.cs
/*using Microsoft.EntityFrameworkCore;
using AuctionManagementAPI.Models;

namespace AuctionManagementAPI.Data
{
    public class AuctionDbContext : DbContext
    {
        public AuctionDbContext(DbContextOptions<AuctionDbContext> options) : base(options)
        {
        }

        // DbSet for Users
        public DbSet<User> Users { get; set; }

        // DbSet for AuctionItems
        public DbSet<AuctionItem> AuctionItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // You can add any custom configurations here if needed, such as relationships or constraints

            // Example: Setting default values or relationships if needed
            // modelBuilder.Entity<AuctionItem>().Property(a => a.StartingBid).HasDefaultValue(0);
        }
    }
}*/

// Data/AuctionDbContext.cs
using AuctionManagementAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace AuctionManagementAPI.Data
{
    public class AuctionDbContext : DbContext
    {
        public AuctionDbContext(DbContextOptions<AuctionDbContext> options) : base(options)
        {
        }

        public DbSet<AuctionItem> AuctionItems { get; set; }  // DbSet for AuctionItem
        public DbSet<User> Users { get; set; }  // DbSet for User
        public DbSet<Bid> Bids { get; set; }//
        public DbSet<Admin> Admins { get; set; } // DbSet for Admins
    }
}

