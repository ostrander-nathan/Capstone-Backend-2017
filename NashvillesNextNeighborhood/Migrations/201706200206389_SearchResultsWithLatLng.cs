namespace NashvillesNextNeighborhood.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SearchResultsWithLatLng : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SearchResults", "Lat", c => c.Int(nullable: false));
            AddColumn("dbo.SearchResults", "Lng", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.SearchResults", "Lng");
            DropColumn("dbo.SearchResults", "Lat");
        }
    }
}
