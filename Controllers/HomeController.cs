using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace NemoEsuriat.Controllers;

public class HomeController : Controller
{
    private readonly IWebHostEnvironment _env;

    public HomeController(IWebHostEnvironment env)
    {
        _env = env;
    }

    public IActionResult Index()
    {
        var fullPath = Path.Combine(_env.WebRootPath, "HTML", "index.html");

        Console.Write(fullPath);

        return PhysicalFile(fullPath, "text/html");
    }
}