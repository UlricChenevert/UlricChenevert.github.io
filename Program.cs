var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

// app.UseHttpsRedirection();

app.UseRouting();

// app.MapStaticAssets();
app.UseStaticFiles(); 

app.MapControllers();

app.MapFallbackToController("Index", "Home");

app.Run();
