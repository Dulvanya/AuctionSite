using AuctionManagementAPI.Data;
using AuctionManagementAPI.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using AuctionManagementAPI.Services;
using Microsoft.Extensions.Options;


namespace AuctionManagementAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Register DbContext with MySQL provider
            builder.Services.AddDbContext<AuctionDbContext>(options =>
                options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), 
                new MySqlServerVersion(new Version(9, 0, 1)))); // Replace with your MySQL version

            // Register the repository services with the DI container
            builder.Services.AddScoped<IUserRepository, UserRepository>(); // Example for registering another repository
            builder.Services.AddScoped<IAuctionItemRepository, AuctionItemRepository>();
            builder.Services.AddScoped<IBidRepository, BidRepository>();
            builder.Services.AddScoped<IAdminRepository, AdminRepository>();

            // Load EmailSettings from configuration and bind it
            builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));

            // Register the EmailService with DI, injecting the EmailSettings configuration
            builder.Services.AddScoped<IEmailService, EmailService>(sp =>
            {
                var emailSettings = sp.GetRequiredService<IOptions<EmailSettings>>().Value;
                return new EmailService(emailSettings.SmtpServer, emailSettings.SmtpPort, emailSettings.SmtpUser, emailSettings.SmtpPass);
            });

            var serviceProvider = builder.Services.BuildServiceProvider();
            var repo = serviceProvider.GetService<IAuctionItemRepository>();
            if (repo == null)
            {
                Console.WriteLine("IAuctionItemRepository is not registered!");
            }


            // CORS policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", policy =>
                {
                    policy.WithOrigins("http://localhost:5173")  // React's dev server
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();  // Important if you're using cookies or session tokens
                });
            });

            var app = builder.Build();

            // CORS Middleware must be placed before HTTPS redirection
            app.UseCors("AllowAll");

            // HTTPS redirection
            app.UseHttpsRedirection();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // Routing and authorization
            app.UseRouting();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
