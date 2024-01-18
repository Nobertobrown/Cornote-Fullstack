using Cornote_Fullstack.Server.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Cornote_Fullstack.Server.Services
{
    public class UserServices
    {
        private readonly IMongoCollection<User> _userCollection;

        public UserServices(IOptions<DatabaseSettings> settings)
        {
            var mongoClient = new MongoClient(settings.Value.ConnectionString);
            var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _userCollection = mongoDb.GetCollection<User>(settings.Value.UsersCollectionName);
        }

        // get User by id
        public async Task<User> GetAsync(string id) =>
            await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        // add new User
        public async Task CreateAsync(User newUser) =>
            await _userCollection.InsertOneAsync(newUser);

        // update User
        /* public async Task UpdateAsync(string id, User updateUser) =>
             await _usersCollection.ReplaceOneAsync(x => x.Id == id, updateUser);*/
    }
}
