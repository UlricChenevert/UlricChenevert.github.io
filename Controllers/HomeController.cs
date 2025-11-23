using Microsoft.AspNetCore.Mvc;

namespace NemoEsuriat.Controllers;

public class HomeController : Controller
{
    // [Route("")]
    public IActionResult Index()
    {
        var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "HTML", "index.html");

        return PhysicalFile(fullPath, "text/html");
    }
}
