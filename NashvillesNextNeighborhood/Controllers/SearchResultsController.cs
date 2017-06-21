using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
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
        //Get User ID
        [System.Web.Http.Route("api/Get/Result")]
        [System.Web.Http.HttpGet]
        public List<SearchResults> GetAll()
        {
            var uid = User.Identity.GetUserId();
            return _context.SearchResult.Where(x => x.UID == uid).ToList();
        }




        // POST api/Save/Result
        [System.Web.Http.Route("api/Save/Result")]
        [System.Web.Http.HttpPost]
        public HttpResponseMessage SaveResultsToDb([FromBody] SearchResults value)
        {
            value.UID = User.Identity.GetUserId();
            _context.SearchResult.Add(value);
            _context.SaveChanges();
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        //GET api/Get/Result
//        [System.Web.Http.Route("api/Get/Result")]
//        [System.Web.Http.HttpGet]
//        public IEnumerable<SearchResults> GetResultsFromDb()
//        {
//
//            return _context.SearchResult;
//        }

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

        [System.Web.Http.Route("api/Get/Result/{id}")]
        [System.Web.Http.HttpGet]
        public List<SearchResults> GetSingleMarker(int id)
        {
//            var currentMarker = _context.SearchResult.Find(id);
//            var markerId = User.Identity.GetUserId();

            return _context.SearchResult.Where(x => x.Id == id).ToList();

        }

    }
}
