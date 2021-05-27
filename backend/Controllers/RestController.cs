using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace RestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {

        private readonly TaskDbContext _context;
        private readonly ILogger<TasksController> _logger;

        public TasksController(ILogger<TasksController> logger, TaskDbContext context)
        {
            _logger = logger;
            _context = context;
        }


        [HttpGet]
        public async Task<IActionResult> All(){
            var tasks = await _context.TasksSet.Include(x => x.Status).ToListAsync();
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTaskById(int id){
            var task = await _context.TasksSet.FirstOrDefaultAsync(x => x.Id == id);

            if(task == null) return NotFound();

            return Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask(Task task){
            if(ModelState.IsValid){
                task.StatusId = (int)ESTATUS.Active;
                await _context.TasksSet.AddAsync(task);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetTaskById", new {task.Id}, task);
            }

            return new JsonResult("Internal Server Error") {
                StatusCode = 500
            };
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTaskById(int id, Task task){
            if(id != task.Id) return BadRequest();

            var _task = await _context.TasksSet.FirstOrDefaultAsync(x => x.Id == id);

            if(_task == null) return NotFound();

            _task.Title = task.Title;
            _task.Description = task.Description;
            _task.StatusId = task.StatusId;

            await _context.SaveChangesAsync();

            var tasks = await _context.TasksSet.Include(x => x.Status).ToListAsync();

            return Ok(tasks);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskById(int id){
            var task = await _context.TasksSet.FirstOrDefaultAsync(X => X.Id == id);

            if(task == null) return NotFound();

            _context.TasksSet.Remove(task);
            await _context.SaveChangesAsync();

            return Ok(task);
        }



        /*private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }*/
    }
}
