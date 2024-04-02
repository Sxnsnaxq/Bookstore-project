using project_backend.Models;
using Microsoft.EntityFrameworkCore;

namespace project_backend.Data
{
    public class OrderContext : DbContext
    {
        //Constructor
        public OrderContext(
            DbContextOptions<OrderContext> options) : base(options) { }

        public DbSet<Order> order { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Mapping + จัดการ relations
            modelBuilder.Entity<Order>().ToTable("order");
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