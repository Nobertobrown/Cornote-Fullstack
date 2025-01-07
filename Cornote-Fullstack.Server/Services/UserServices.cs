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
            var connectionString = settings.Value.ConnectionString;
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new Exception("MongoDB connection string is missing or invalid.");
            }

            var mongoClient = new MongoClient(connectionString);
            var mongoDb = mongoClient.GetDatabase(settings.Value.DatabaseName);
            _userCollection = mongoDb.GetCollection<User>(settings.Value.UsersCollectionName);
        }

        // get User by id
        public async Task<User> GetAsync(string id) =>
            await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        // add new User
        public async Task CreateAsync(User newUser)
        {
            User existingUser = await _userCollection.Find(x => x.Auth0Id == newUser.Auth0Id).FirstOrDefaultAsync();
            if (existingUser != null) { throw new Exception("User already exists."); }
            await _userCollection.InsertOneAsync(newUser);
        }

        // update User
        /* public async Task UpdateAsync(string id, User updateUser) =>
             await _usersCollection.ReplaceOneAsync(x => x.Id == id, updateUser);*/
    }
}
