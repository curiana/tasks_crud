using Microsoft.EntityFrameworkCore;

public class TaskDbContext : DbContext{

    public DbSet<Task> TasksSet {get;set;} 
    public DbSet<Status> Status { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder){
        modelBuilder.Entity<Status>()
        .HasMany(c => c.Tasks)
        .WithOne(e => e.Status);

        modelBuilder.Entity<Task>()
        .HasOne(e => e.Status)
        .WithMany(x => x.Tasks);

        modelBuilder.Entity<Status>().HasData(
            new Status{
                Id = 1,
                Description = "Activa"
            },
            new Status{
                Id = 2,
                Description = "Inactiva"
            },
            new Status{
                Id=3,
                Description = "Completada"
            }
        );
        
    }

    public TaskDbContext(DbContextOptions<TaskDbContext> options) : base (options){}

}