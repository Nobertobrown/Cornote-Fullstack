using Cornote_Fullstack.Server.Models;
using Cornote_Fullstack.Server.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Cornote_Fullstack.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserServices _userServices;

        public UserController(UserServices userServices)
        {
            _userServices = userServices;
        }

        // GET /user/64a51019c925955cfda51194
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<User>> Get(string id)
        {
            User user = await _userServices.GetAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST /user
        [HttpPost]
        public async Task<ActionResult<User>> Post(User newUser)
        {
            await _userServices.CreateAsync(newUser);
            return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
        }

        // PUT /user/64a51019c925955cfda51194
        /*[HttpPut("{id:length(24)}")]
        public async Task<ActionResult> Put(string id, User updateUser)
        
            User user = await _userServices.GetAsync(id);
            if (user == null)
            {
                return NotFound("There is no user with this id: " + id);
            }

            updateUser.Id = user.Id;

            await _userServices.UpdateAsync(id, updateUser);

            return Ok("Updated Successfully");
        }*/
    }
}
