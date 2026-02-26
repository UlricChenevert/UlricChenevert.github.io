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

        if (!System.IO.File.Exists(fullPath))
        {
            return NotFound($"Index.html not found at: {fullPath}");
        }

        var html = System.IO.File.ReadAllText(fullPath);
        return Content(html, "text/html");
    }
}