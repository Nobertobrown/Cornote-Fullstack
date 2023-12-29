using Cornote_Fullstack.Server.Models;
using Cornote_Fullstack.Server.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Cornote_Fullstack.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly NoteServices _notesServices;

        public NotesController(NoteServices notesServices)
        {
            _notesServices = notesServices;
        }


        // GET: api/note
        [HttpGet]
        public async Task<List<Note>> Get() => await _notesServices.GetAsync();

        // GET api/note/64a51019c925955cfda51194
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Note>> Get(string id)
        {
            Note note = await _notesServices.GetAsync(id);
            //var note = await _notesServices.GetAsync(id);
            if (note == null)
            {
                return NotFound();
            }

            return note;
        }

        // POST api/note
        [HttpPost]
        public async Task<ActionResult<Note>> Post(Note newNote)
        {
            await _notesServices.CreateAsync(newNote);
            return CreatedAtAction(nameof(Get), new { id = newNote.Id }, newNote);
        }

        // PUT api/note/64a51019c925955cfda51194
        [HttpPut("{id:length(24)}")]
        public async Task<ActionResult> Put(string id, Note updateNote)
        {
            Note note = await _notesServices.GetAsync(id);
            if (note == null)
            {
                return NotFound("There is no note with this id: " + id);
            }

            updateNote.Id = note.Id;

            await _notesServices.UpdateAsync(id, updateNote);

            return Ok("Updated Successfully");
        }

        // DELETE api/note/658e9015631bf33501d6d3b4
        [HttpDelete("{id:length(24)}")]
        public async Task<ActionResult> Delete(string id)
        {
            Note note = await _notesServices.GetAsync(id);
            if (note == null)
            {
                return NotFound("There is no note with this id: " + id);
            }

            await _notesServices.RemoveAsync(id);

            return Ok("Deleted Successfully");
        }
    }
}
