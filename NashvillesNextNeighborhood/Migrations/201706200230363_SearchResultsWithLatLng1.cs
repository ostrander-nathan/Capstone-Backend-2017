namespace NashvillesNextNeighborhood.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SearchResultsWithLatLng1 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.SearchResults", "Lat", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.SearchResults", "Lng", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.SearchResults", "Lng", c => c.Int(nullable: false));
            AlterColumn("dbo.SearchResults", "Lat", c => c.Int(nullable: false));
        }
    }
}
