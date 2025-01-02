using Cornote_Fullstack.Server.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Cornote_Fullstack.Server.Services
{
    public class NoteServices
    {
        private readonly IMongoCollection<Note> _notesCollection;

        public NoteServices(IOptions<DatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.ConnectionString);
            var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _notesCollection = mongoDb.GetCollection<Note>(settings.Value.NotesCollectionName);
        }

        // get all Notes
        public async Task<List<Note>> GetNotesForUserAsync(string userId)
        {
            if (userId == null)
            {
                // Handle the case where user ID is not available (e.g., user is not authenticated)
                return new List<Note>();
            }

            var filter = Builders<Note>.Filter.Eq("UserId", userId);
            var sort = Builders<Note>.Sort.Descending("_id");

            var result = await _notesCollection.FindAsync(filter, new FindOptions<Note>
            {
                Sort = sort
            });

            return await result.ToListAsync();
        //return await _notesCollection.Find(_ => true).ToListAsync();
        }

        // get Note by id
        public async Task<Note> GetAsync(string id) =>
            await _notesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        // add new Note 
        public async Task CreateAsync(Note newNote) =>
            await _notesCollection.InsertOneAsync(newNote);

        // update Note
        public async Task UpdateAsync(string id, Note updateNote) =>
            await _notesCollection.ReplaceOneAsync(x => x.Id == id, updateNote);

        // delete Note
        public async Task RemoveAsync(string id) =>
            await _notesCollection.DeleteOneAsync(x => x.Id == id);
    }
}
