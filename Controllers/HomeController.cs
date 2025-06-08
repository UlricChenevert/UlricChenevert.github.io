using Microsoft.AspNetCore.Mvc;

namespace NemoEsuriat.Controllers;

public class HomeController : Controller
{
    [Route("")]
    public IActionResult Index()
    {
        return PhysicalFile(Directory.GetCurrentDirectory() + "\\wwwroot\\HTML\\index.html", "text/html");
    }
}
