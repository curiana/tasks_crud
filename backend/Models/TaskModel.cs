
using System.ComponentModel.DataAnnotations.Schema;

[Table("Tasks")]
public class Task{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public Status Status { get; set; }
    public int StatusId { get; set; }
}