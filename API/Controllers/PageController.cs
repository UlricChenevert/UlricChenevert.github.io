using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web_Application.API.DTOs;

namespace Web_Application.API
{
    [Route("api/[Controller]")]
    [ApiController]
    public class PageController : ControllerBase
    {
        [HttpGet("Test")]
        public ActionResult<TestDTO> Get () {
            return new TestDTO() { message = "Hello World!" };
        } 
    }
}
