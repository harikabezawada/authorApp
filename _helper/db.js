



async function mongoConnect (){
    var db;
    MongoClient.connect("mongodb://localhost:27017", function(e, client) {
        if(e) {
          console.log(e)
          throw {error:'Database connection failed'}
         }
    
          db = client.db('mydb');
        // console.log(db)
        return client
        // collections.users = db.collection('users')
       });
     return db
 }

  

   module.exports = {mongoConnect}