using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Newtonsoft.Json;

namespace NashvillesNextNeighborhood.Models
{
    public class SearchResults
    {
        [Key]
        public int Id { get; set; }
        public string UserDescription { get; set; }
        public int ZipCode { get; set; }
        public string Address { get; set; }
        public int District { get; set; }
        public int Cost { get; set; }
        public string PermitType { get; set; }
        public string Purpose { get; set; }
        public string DescriptionOfBuild { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        [Required]
        public string UID { get; set; }

    }
}