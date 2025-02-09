using Microsoft.EntityFrameworkCore;
using QuickMartServer.Models;
using QuickMartServer.Data;

var builder = WebApplication.CreateBuilder(args);

// ✅ Add CORS Policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:5173") // React App URL
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<QuickMartContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");  // ✅ Apply CORS Policy Before Authorization
app.UseAuthorization();
app.MapControllers();

app.Run();
