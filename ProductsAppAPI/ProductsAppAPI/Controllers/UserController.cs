using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ProductsAppAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private string _userEmail = "test@mail.com";
        private string _userPassword = "Qwerty1";

        [HttpPost]
        public IActionResult Authorize([FromBody] UserAuthModel model)
        {
            if(model.Email.Equals(_userEmail) && model.Password.Equals(_userPassword))
            {
                return Ok(true);
            }

            return BadRequest(false);
        }
    }

    public class UserAuthModel
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
