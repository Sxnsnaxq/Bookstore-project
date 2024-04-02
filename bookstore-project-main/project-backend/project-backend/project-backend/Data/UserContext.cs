using project_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace project_backend.Data
{
    public class UserContext : DbContext
    {
        //Constructor
        public UserContext(
            DbContextOptions<UserContext> options) : base(options) { }

        public DbSet<User> users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Mapping + จัดการ relations
            modelBuilder.Entity<User>().ToTable("users");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string server = "localhost";
            string database = "book";
            string uid = "root";
            string password = "";
            string connectionString = "SERVER=" + server + ";" + "DATABASE=" +
            database + ";" + "UID=" + uid + ";" + "PASSWORD=" + password + ";PORT=3306;SslMode=None;";
            optionsBuilder.UseMySQL(connectionString);
        }


    }
}