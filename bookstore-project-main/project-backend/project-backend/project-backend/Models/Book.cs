using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace project_backend.Models
{
    public class Book
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id { get; set; }
        public string title { get; set; }
        public string author { get; set; }
        public string isbn { get; set; }
        public int publication_year { get; set; }
        public string genre { get; set; }
        public decimal price { get; set; }
        public string imageUrl { get; set; }


    }
}
