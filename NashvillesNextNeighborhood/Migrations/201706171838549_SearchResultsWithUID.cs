namespace NashvillesNextNeighborhood.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SearchResultsWithUID : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SearchResults", "UID", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.SearchResults", "UID");
        }
    }
}
