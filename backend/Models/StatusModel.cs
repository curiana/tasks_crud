using System.Collections.Generic;
using System.Text.Json.Serialization;

public class Status{
    public int Id { get; set; }
    public string Description { get; set; }

    [JsonIgnore]
    public ICollection<Task> Tasks { get; set; }
}