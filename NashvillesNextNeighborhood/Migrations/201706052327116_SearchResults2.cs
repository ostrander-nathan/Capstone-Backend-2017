namespace NashvillesNextNeighborhood.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SearchResults2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.SearchResults",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserDescription = c.String(),
                        ZipCode = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.SearchResults");
        }
    }
}
