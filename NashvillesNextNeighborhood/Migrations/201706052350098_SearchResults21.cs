namespace NashvillesNextNeighborhood.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SearchResults21 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.SearchResults", "Address", c => c.String());
            AddColumn("dbo.SearchResults", "District", c => c.Int(nullable: false));
            AddColumn("dbo.SearchResults", "Cost", c => c.Int(nullable: false));
            AddColumn("dbo.SearchResults", "PermitType", c => c.String());
            AddColumn("dbo.SearchResults", "Purpose", c => c.String());
            AddColumn("dbo.SearchResults", "DescriptionOfBuild", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.SearchResults", "DescriptionOfBuild");
            DropColumn("dbo.SearchResults", "Purpose");
            DropColumn("dbo.SearchResults", "PermitType");
            DropColumn("dbo.SearchResults", "Cost");
            DropColumn("dbo.SearchResults", "District");
            DropColumn("dbo.SearchResults", "Address");
        }
    }
}
