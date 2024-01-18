using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Cornote_Fullstack.Server.Models
{
    [BsonIgnoreExtraElements]
    public class Note
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("UserId")]
        public string UserId { get; set; } = null!;

        [BsonElement("title")]
        public string Title { get; set; } = null!;

        [BsonElement("body")]
        public string Body { get; set; } = null!;
    }
}
