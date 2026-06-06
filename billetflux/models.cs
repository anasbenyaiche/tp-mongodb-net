using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver.GeoJsonObjectModel;

public class Event
{
    [BsonId, BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string Title { get; set; } = default!;
    public string Category { get; set; } = default!;   
    public string Status { get; set; } = "draft";       
    public List<string> Tags { get; set; } = new();
    public Venue Venue { get; set; } = default!;
    public List<Session> Sessions { get; set; } = new();
}

public class Venue
{
    public string Name { get; set; } = default!;
    public Address Address { get; set; } = default!;
    public GeoJsonPoint<GeoJson2DGeographicCoordinates> Location { get; set; } = default!;
}

public class Address
{
    public string Street { get; set; } = default!;
    public string City   { get; set; } = default!;
    public string Zip    { get; set; } = default!;
    public string Country { get; set; } = "France";
}

public class Session
{
    public DateTime Date { get; set; }                 
    public string Hall { get; set; } = default!;
    public int Capacity { get; set; }
    public int Sold { get; set; }
    [BsonRepresentation(BsonType.Decimal128)]
    public decimal Price { get; set; }
}

public class Customer
{
    [BsonId, BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string FullName { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string City { get; set; } = default!;
    public int LoyaltyPoints { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Order
{
    [BsonId, BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    [BsonRepresentation(BsonType.ObjectId)] public string CustomerId { get; set; } = default!;
    [BsonRepresentation(BsonType.ObjectId)] public string EventId    { get; set; } = default!;
    public DateTime SessionDate { get; set; }
    public List<OrderItem> Items { get; set; } = new();
    [BsonRepresentation(BsonType.Decimal128)]
    public decimal Total { get; set; }
    public string Status { get; set; } = "confirmed";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class OrderItem
{
    public string Category { get; set; } = default!;    // Carré Or | Cat. 1 | Cat. 2
    public int Quantity { get; set; }
    [BsonRepresentation(BsonType.Decimal128)]
    public decimal UnitPrice { get; set; }
}
