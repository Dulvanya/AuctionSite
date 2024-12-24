// Services/ConfigurationService.cs
/*namespace AuctionManagementAPI.Services
{
    public sealed class ConfigurationService
    {
        private static ConfigurationService _instance = null;
        private static readonly object _lock = new object();

        public string DatabaseConnectionString { get; private set; }  = string.Empty;

        private ConfigurationService()
        {
            // Set the configuration values here or read from appsettings.json
            DatabaseConnectionString = "DefaultConnection";
        }

        public static ConfigurationService Instance
        {
            get
            {
                if (_instance == null)
                {
                    lock (_lock)
                    {
                        if (_instance == null)
                        {
                            _instance = new ConfigurationService();
                        }
                    }
                }
                return _instance;
            }
        }
    }
}
*/

using Microsoft.Extensions.Configuration;

namespace AuctionManagementAPI.Services
{
    public class ConfigurationService
    {
        private static readonly ConfigurationService _instance = new ConfigurationService();
        private readonly IConfiguration _configuration;

        private ConfigurationService()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json");

            _configuration = builder.Build();
        }

        public static ConfigurationService Instance => _instance;

        public string DatabaseConnectionString => _configuration.GetConnectionString("DefaultConnection") 
            ?? throw new InvalidOperationException("Database connection string is not configured.");
    }
}
