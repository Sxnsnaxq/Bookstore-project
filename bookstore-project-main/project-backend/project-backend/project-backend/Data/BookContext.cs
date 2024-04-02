using project_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace project_backend.Data
{
    public class BookContext : DbContext
    {
        //Constructor
        public BookContext(
            DbContextOptions<BookContext> options) : base(options) { }

        public DbSet<Book> books { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Mapping + จัดการ relations
            modelBuilder.Entity<Book>().ToTable("books");
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
