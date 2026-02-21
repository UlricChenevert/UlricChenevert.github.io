using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();

// app.UseHttpsRedirection();

app.UseRouting();


if (app.Environment.IsDevelopment())
{
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(
            Path.Combine(builder.Environment.ContentRootPath, "Client", "HTML")),
        RequestPath = "/HTML" 
    });
}

app.UseStaticFiles(); 

app.MapControllers();

app.MapFallbackToController("Index", "Home");

app.Run();
