
async function addNewauthor(req, res, next) {
    console.log(req.body, typeof (req.body.DOB))
    var date = req.body.DOB.split('-').reverse().join('-')
    console.log(new Date(date))
    req.body.DOB = new Date(date)
    //   req.body.DOB=date
    console.log(req.body, typeof (req.body.DOB))
    try {
        const db = req.app.locals.db;
        console.log('inside', req.app.locals.db)
        let authorData = await db.collection('authors').insertOne(req.body)
        return ({ status: 200, authorData: authorData })

    }
    catch (err) {
        throw err;
    }




}

async function authorDatabyawards(req) {
    console.log(req.body.awards)
    const db = req.app.locals.db;
    //  console.log(db)
    // return await  db.collection('authors').aggregate([ {$project: {
    //     authorName: 1,
    //     numberOfColors: { $cond: { if: { $isArray: "$awards" }, then: { $size: "$awards" }, else: "NA"} }
    //  }}]).toArray()
    try {


        let authorDoc = await db.collection('authors').aggregate(
            [
                {
                    $project: {
                        _id: 1, authorName: 1,
                        "awardsSize": { $size: "$awards" }
                    }
                },
                { $match: { "awardsSize": { $gte: req.body.awards } } }
            ]).toArray()
        return ({ status: 200, authorDoc: authorDoc })
    }
    catch (err) {
        throw err;
    }

}
async function authorDatabyyear(req) {
    try {
        const db = req.app.locals.db;
  

        let authorDoc= await db.collection('authors').aggregate([
            {$match:{"awards":{$elemMatch:{year:{$gte:req.body.year}}}}}
             
    ]).toArray()
        return ({ status: 200, authorDoc: authorDoc })
    }
    catch (err) {
        throw err;
    }
}
async function authorDatabyDob(req) {
    try {
        var date = req.body.date.split('-').reverse().join('-')
        console.log(new Date(date))
     
        const db = req.app.locals.db;
  

          let authorDoc= await db.collection('authors').aggregate([
            {
             "$addFields": {  
                "totalPrice": 
                    {"$sum":"$books.Price"}
                  }},
                  //{$match:{$and:[{totalProfit:{$gte:req.body.price}}]}}
                  {$match:{$and:[{totalProfit:{$gte:req.body.price}},{DOB:{$gte:new Date(date)}}]}},
                //   {"$addFields":{"totalBooksSold":{"$sum":"$books.Price"}}},
                 { "$project":{ "totalPrice":1}}
                 
                
              ]).toArray()

              return ({ status: 200, authorDoc: authorDoc })
    }
    catch (err) {
        throw err;
    }
}
async function authorsProfitdetails(req) {
    try {
        console.log("chee")
        const db = req.app.locals.db;
  

          let authorDoc= await db.collection('authors').aggregate([
            {
             "$addFields": {  
                "totalProfit": {
                  "$sum": {
                    "$map": {
                      "input": "$books",
                      "in": { "$multiply": ["$$this.Price", "$$this.booksSold"] }
                    }
                  }}}},
                  {"$addFields":{"totalBooksSold":{"$sum":"$books.booksSold"}}},
                { "$project":{ "totalProfit":1,"totalBooksSold":1}}
                 
                
              ]).toArray()

              return ({ status: 200, authorDoc: authorDoc })
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    authorsProfitdetails,
    authorDatabyDob,
    authorDatabyyear,
    authorDatabyawards,
    addNewauthor
}