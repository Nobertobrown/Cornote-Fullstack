using Cornote_Fullstack.Server.Models;
using Cornote_Fullstack.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Cornote_Fullstack.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NoteController : ControllerBase
    {
        private readonly NoteServices _noteServices;

        public NoteController(NoteServices noteServices)
        {
            _noteServices = noteServices;
        }


        // GET: /note
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<List<Note>>> GetNotesForCurrentUser()
        {
            var userId = User.FindFirst("sub")?.Value;
            var notes = await _noteServices.GetNotesForUserAsync(userId);
            return Ok(notes);
        }


        // GET /note/64a51019c925955cfda51194
        [HttpGet("{id:length(24)}")]
        [Authorize]
        public async Task<ActionResult<Note>> Get(string id)
        {
            Note note = await _noteServices.GetAsync(id);
            if (note == null)
            {
                return NotFound();
            }

            return note;
        }

        // POST /note
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Note>> Post(Note newNote)
        {
            await _noteServices.CreateAsync(newNote);
            return CreatedAtAction(nameof(Get), new { id = newNote.Id }, newNote);
        }

        // PUT /note/64a51019c925955cfda51194
        [HttpPut("{id:length(24)}")]
        [Authorize]
        public async Task<ActionResult> Put(string id, Note updateNote)
        {
            Note note = await _noteServices.GetAsync(id);
            if (note == null)
            {
                return NotFound("There is no note with this id: " + id);
            }

            updateNote.Id = note.Id;

            await _noteServices.UpdateAsync(id, updateNote);

            return Ok("Updated Successfully");
        }

        // DELETE /note/658e9015631bf33501d6d3b4
        [HttpDelete("{id:length(24)}")]
        [Authorize]
        public async Task<ActionResult> Delete(string id)
        {
            Note note = await _noteServices.GetAsync(id);
            if (note == null)
            {
                return NotFound("There is no note with this id: " + id);
            }

            await _noteServices.RemoveAsync(id);

            return Ok("Deleted Successfully");
        }
    }
}
