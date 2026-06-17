using BnakFlux.Models;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BnakFlux
{
    sealed class MongoContext
    {
        public IMongoClient Client { get; }
        public IMongoDatabase Db { get; }

        public MongoContext(string uri = "mongodb://localhost:27017",
                    string dbName = "bankflux")
        {

            var pack = new ConventionPack
        {
            new CamelCaseElementNameConvention(),
            new IgnoreExtraElementsConvention(true)
        };
            ConventionRegistry.Register("bankflux", pack, _ => true);

            Client = new MongoClient(uri);
            Db = Client.GetDatabase(dbName);
        }
        public IMongoCollection<Customer> Customers => Db.GetCollection<Customer>("customers");
        public IMongoCollection<Account> Accounts => Db.GetCollection<Account>("accounts");
        public IMongoCollection<Transaction> Transactions => Db.GetCollection<Transaction>("transactions");
        public IMongoCollection<Branch> Branches => Db.GetCollection<Branch>("branches");

    } 
}

// new line