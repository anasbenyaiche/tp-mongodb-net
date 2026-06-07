using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver.GeoJsonObjectModel;

namespace BankFlux;

// Client de la banque
public class Customer
{
    [BsonId, BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string FullName { get; set; } = default!;
    public string Email { get; set; } = default!;     // unique en pratique
    public string City { get; set; } = default!;
    public string? Phone { get; set; }
    public int LoyaltyPoints { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;   // toujours UTC
}

// Compte bancaire — référence son client (customerId)
public class Account
{
    [BsonId, BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    [BsonRepresentation(BsonType.ObjectId)]
    public string CustomerId { get; set; } = default!;
    public string AccountNumber { get; set; } = default!;
    public string Type { get; set; } = "checking";    // checking | savings
    public string Status { get; set; } = "active";     // active | pending | closed
    [BsonRepresentation(BsonType.Decimal128)]
    public decimal Balance { get; set; }               // argent => Decimal128
    public string Currency { get; set; } = "EUR";
    public DateTime OpenedAt { get; set; } = DateTime.UtcNow;
}

// Opération — référence son compte (accountId)
public class Transaction
{
    [BsonId, BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    [BsonRepresentation(BsonType.ObjectId)]
    public string AccountId { get; set; } = default!;
    public string Type { get; set; } = default!;       // deposit | withdrawal | transfer
    [BsonRepresentation(BsonType.Decimal128)]
    public decimal Amount { get; set; }
    public string Label { get; set; } = default!;
    public DateTime Date { get; set; } = DateTime.UtcNow;
}

// Agence — géolocalisée (pour l'atelier géospatial)
public class Branch
{
    [BsonId, BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string Name { get; set; } = default!;
    public Address Address { get; set; } = default!;   // objet imbriqué
    public GeoJsonPoint<GeoJson2DGeographicCoordinates> Location { get; set; } = default!;
}

public class Address
{
    public string Street { get; set; } = default!;
    public string City { get; set; } = default!;
    public string Zip { get; set; } = default!;
}
