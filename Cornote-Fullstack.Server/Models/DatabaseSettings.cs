namespace Cornote_Fullstack.Server.Models
{
    public class DatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string NotesCollectionName { get; set; } = null!;
        public string UsersCollectionName { get; set; } = null!;
    }
}
