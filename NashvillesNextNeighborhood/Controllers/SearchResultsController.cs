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
        public HttpResponseMessage SaveResultsToDb(SearchResults searchResults)
        {
            _context.SearchResult.Add(searchResults);
            _context.SaveChanges();

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        //GET api/Get/Result
        [System.Web.Http.Route("api/Get/Result")]
        [System.Web.Http.HttpGet]
        public IEnumerable<SearchResults> GetResultsFromDb()
        {
            return _context.SearchResult;
        }

        //DELETE api/Delete/Result
        [System.Web.Http.Route("api/Delete/Result/{id}")]
        [System.Web.Http.HttpDelete]
        public HttpResponseMessage GetResultsFromDb(int id)
        {
            var current = _context.SearchResult.Find(id);
                _context.SearchResult.Remove(current);
                _context.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK);

        }
    }
}
