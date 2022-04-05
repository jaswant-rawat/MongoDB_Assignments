//use mongo_practice
//collection--movies



//first attempt above to insert one

db.movies.insertMany([{
    title:'Fight Club',
    writer:'Chuck Palahniuko',
    year:1999,
    actors:["Brad Pitt",
    "Edward Norton"]
},{
    title:'Pulp Fiction',
    writer:'Quentin Tarantino',
    year:1994,
    actors:["John Travolta",
    "Uma Thurman"]
},
{
    title:'Inglorious Basterds',
    writer:'Quentin Tarantino',
    year:2009,
    actors:["Brad Pitt",
    "Diane Kruger",
    "Eli Roth"]
},
{
    title:'The Hobbit: An Unexpected Journey',
    writer:'J.R.R Tolkein',
    year:2012,
    franchise: "The Hobbit" 
},
{
    title:'The Hobbit: The Desolationof Smaug',
    writer:'J.R.R Tolkein',
    year:2013,
    franchise: "The Hobbit"   
},
{
    title:'The Hobbit: The Battle of the Five Armies',
    writer:'J.R.R Tolkein',
    year:2012,
    franchise: "The Hobbit",
    synopsis:"Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness."
},
{
    title:'Pee Wee Hermans Big Adventure'
   
},
{
    title:'Avatar'
}])


//---------------------------------- Queries for find ---------------------------------------------------------------------------
//finding all the documents


//1
db.movies.find()





//for finding all documents with writer set to Quentin Tarantino
//2
db.movies.find({writer:'Quentin Tarantino'}).pretty()

//for finding all documents where actors include "Bradd Pitt"
//3
db.movies.find({actors:"Brad Pitt"}).pretty()

//get all the documents where franchise set to ("The Hobbit")
//4
db.movies.find({franchise:"The Hobbit"}).pretty()

//get all the movies released in the 90s 
//5
db.getCollection("movies").find({$and:[{year:{$lt:2000}},{year:{$gte:1990}}]})


//get all the movies released before 2000 or after 2010 
//6
db.getCollection("movies").find({$or:[{year:{$lt:2000}},{year:{$gt:2010}}]})

//---------------------------------- Queries for update ---------------------------------------------------

//1. add a synopsis to The Hobbit: An Unexpected Journey : A reluctant hobbit Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it from the dragon Smaug.

db.movies.update({title:"The Hobbit: An Unexpected Journey"},{$set:{synopsis : "A reluctant hobbit Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it from the dragon Smaug." }})

//2. add a synopsis to "The Hobbit: The Desolation of Smaug": "The dwarves along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of amysterious and magical ring."
 db.movies.update({title:"The Hobbit: The Desolation of Smaug"},{$set:{synopsis : "The dwarves along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of amysterious and magical ring." }})

//3. add an actor named "Samuel L. Jackson" to the movie "Pulp Fiction"
 db.movies.update({title:"Pulp Fiction"},{$set:{actors: ["John Travolta","Uma Thurman","Samuel L. Jackson"]}})
    

//---------------------------------- Queries for text search ---------------------------------------------------------------------------

  

db.movies.createIndex({synopsis:"text"})



//1. find all movies that have a synopsis that contains the word "Bilbo" 
db.movies.find({$text:{$search:"Bilbo"}})

//2. find all movies that have a synopsis that contains the word "Gandalf"
db.movies.find({$text:{$search:"Gandalf"}})

//3. find all movies that have a synopsis that contains the word "Bilbo" and not the word "Gandalf"  
db.movies.find({$text:{$search:"\"Bilbo\" -Gandalf"}})

//4. find all movies that have a synopsis that contains the word "dwarves" or "hobbit"
db.movies.find({$text:{$search:"dwarves hobbit"}})

//5. find all movies that have a synopsis that contains the word "gold" and "dragon"
db.movies.find({$text:{$search:"\"gold\" \"dragon\" " }})


//---------------------------------- Queries for Delete --------------------------------------------------------------

//delete the movie Pee Wee Hermans Big Adventure


//1. delete the movie "Pee Wee Herman's Big Adventure"
db.movies.deleteOne({ title: "Pee Wee Herman's Big Adventure"})

//2. delete the movie "Avatar"
    db.movies.deleteOne({ title: "Avatar"})

//---------------------------------- Queries for collections ---------------------------------------------------------------------------


db.users.insertMany([{
    "username":"GoodGuyGreg",
    "last_name":"Good Guy"},
    {"username":"ScumbagSteve",
    "full_name":[
        {"first":"Scumbag",
        "last":"Steve"}]}])



db.posts.insertMany([{
    "username":"GoodGuyGreg",
    "title":"Passes out at party",
    "body":"Wakes up early and cleans house",
    },
    {
        "username":"GoodGuyGreg",
        "title":"Steals your identity",
        "body":"raisesnyour credit score",
        },
        {
            "username":"GoodGuyGreg",
            "title":"Reports a bug in your code",
            "body":"Sends you a Pull Request",
            },
            {
                "username":"ScumbagSteve",
                "title":"Borrows something",
                "body":"Sells it",
                },
                {
                    "username":"ScumbagSteve",
                    "title":"Borrows everything",
                    "body":"The end",
                    },
                    {
                        "username":"ScumbagSteve",
                        "title":"Forks your repo on github",
                        "body":"Sets to private",
                        }
                    ])
    
    
    
                    db.comments.insertMany([{
                        "username":"GoodGuyGreg",
                        "comment":"Hope you got a good deal!",
                        "post": [ObjectId("624c393d1dcf773da6bdb2b8")],
                        },
                        {
                            "username":"GoodGuyGreg",
                            "comment":"What's mine is yours!",
                            "post": [ ObjectId("624c393d1dcf773da6bdb2b9")],
                            },
                            {
                                "username":"GoodGuyGreg",
                                "comment":"Don't violate the licensing agreement!",
                                "post":[ObjectId("624c393d1dcf773da6bdb2ba")],
                                },
                                {
                                    "username":"ScumbagSteve",
                                    "comment":"It still isn't clean",
                                    "post":[ObjectId("624c393d1dcf773da6bdb2b5")],
                                    },
                                    {
                                        "username":"ScumbagSteve",
                                        "comment":"Denied your PR cause i found a hack",
                                        "post":[ ObjectId("624c393d1dcf773da6bdb2b7")],
                                        }
                                        ])
                                        )
    
    



//1. find all users
db.user.find()    

//2. find all posts
    db.posts.find()

//3. find all posts that was authored by "GoodGuyGreg" 
    db.posts.find({username:"GoodGuyGreg"})

//4. find all posts that was authored by "ScumbagSteve"
    db.posts.find({username:"ScumbagSteve"})
    
//5. find all comments 
    db.comments.find() 

//6. find all comments that was authored by "GoodGuyGreg"
    db.comments.find({username:"GoodGuyGreg"})

//7. find all comments that was authored by "ScumbagSteve"
    db.comments.find({username:"ScumbagSteve"})

//8. find all comments belonging to the post "Reports a bug in your code"
db.comments.find({post:"624c393d1dcf773da6bdb2b7"})


