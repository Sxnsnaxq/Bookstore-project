using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace project_backend.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int orderID { get; set; }
        public string username { get; set; }
        public int productid { get; set; }
        public string productname { get; set; }
        public string productImage { get; set; }
        
    }
}
