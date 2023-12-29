using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Cornote_Fullstack.Server.Models
{
    public class Note
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("title")]
        public string Title { get; set; } = null!;

        [BsonElement("body")]
        public string Body { get; set; } = null!;
    }
}
