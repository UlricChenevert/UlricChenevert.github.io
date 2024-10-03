using Microsoft.AspNetCore.Mvc;

[assembly: ApiController]
var builder = WebApplication.CreateBuilder(args);

// string PublicFolder = builder.Configuration.GetValue<string>("PublicFolder") ?? 
//     throw new Exception("Public Folder Not Configured");

builder.Services.AddControllers();

var app = builder.Build();

if (builder.Environment.IsDevelopment()) {
    app.UseDeveloperExceptionPage(); 
}

app.UseDefaultFiles();
app.UseStaticFiles();

// app.UseHttpsRedirection();
// app.UseAuthorization();

app.MapControllers();

app.Run();
