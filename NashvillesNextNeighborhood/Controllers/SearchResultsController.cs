using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using NashvillesNextNeighborhood.Models;

namespace NashvillesNextNeighborhood.Controllers
{
    public class SearchResultsController : ApiController
    {
        private ApplicationDbContext _context;

        public SearchResultsController()
        {
            _context = new ApplicationDbContext();
        }
        // POST api/Save/Result
        [System.Web.Http.Route("api/Save/Result")]
        [System.Web.Http.HttpPost]
        public void SaveResultsToDb(SearchResults searchResults)
        {
            _context.SearchResult.Add(searchResults);
            _context.SaveChanges();
        }
      
    }
}
