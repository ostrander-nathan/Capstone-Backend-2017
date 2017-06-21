using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NashvillesNextNeighborhood.Models;

namespace NashvillesNextNeighborhood.Tests.Controllers
{
    [TestClass]
    public class SearchTest

    {
        [TestMethod]
        public void TestSearchResultsExist()
        {
            SearchResults searchResults = new SearchResults();
            Assert.IsNotNull(searchResults);
        }
    }
    
}
