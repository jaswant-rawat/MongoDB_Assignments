/---------------------------------------- Atlanta Population ----------------------------------------------------------------------------

//1---use db.zipcodes.find() to filter results to only the results where city is ATLANTA and state is GA

db.zipcodes.find({$and:[{city:"ATLANTA",state:"GA"}]})

//2---use db.zipcodes.aggregate with $match to do the same as above 

db.zipcodes.aggregate([{$match:{$and:[{city:"ATLANTA",state:"GA"}]}}])


//3--use $group to count the number of zip codes in Atlanta

db.zipcodes.aggregate([{$match:{city:"ATLANTA"}},
{$group: { _id: "$city",totalZipCodes:{$count:{}}}}]).pretty()


//4--use $group to find the total population in Atlanta

db.zipcodes.aggregate([{$match:{city:"ATLANTA"}},
{$group:{_id:'',"pop":{$sum:'$pop'}}}])


//----------------------------------------- Populations By State ---------------------------------------------
//1-- use aggregate to calculate the total population for each state

db.zipcodes.aggregate( [
    { $group: { _id: "$state", totalPop: { $sum: "$pop" } } }
 ] )



//2--sort the results by population, highest first

db.zipcodes.aggregate( [
    { $group: { _id: "$state", totalPop: { $sum: "$pop" } } },
    {$sort:{pop:1}}
 ] )





 //3--limit the results to just the first 3 results. What are the top 3 states in population?


 db.zipcodes.aggregate([
    {$group: { _id: "$state",totalPopulation:{$sum:"$pop"}}},
 {$sort: {totalPopulation:-1}},{$limit:3}]).pretty()


//----------------------------------------------- Populations by City -----------------------------------

 //1-- use aggregate to calculate the total population for each city you have to use city/state combination). You can use a combination for the id of the $group 1 city: $city, state: $state)



 db.zipcodes.aggregate([
    {$group: { _id: {state:"$state", city:"$city"},
    totalPopulation:{$sum:"$pop"}}}]).pretty()




 //2--sort the results by population, highest first 


 db.zipcodes.aggregate([{$group: { _id: {state:"$state", city:"$city"},
 totalPopulation:{$sum:"$pop"}}},{$sort:{totalPopulation:-1}}]).pretty()





 //3--limit the results to just the first 3 results. What are the top 3 cities in population?



 db.zipcodes.aggregate([{$group: { _id: {state:"$state", city:"$city"},totalPopulation:{$sum:"$pop"}}},
 {$sort:{totalPopulation:-1}},{$limit:3}]).pretty()



 //4--What are the top 3 cities in population in Texas?


db.zipcodes.aggregate([{$match:{state:"TX"}},
{$group: { _id: {state:"$state", city:"$city"},totalPopulation:{$sum:"$pop"}}},
{$sort:{totalPopulation:-1}},{$limit:3}]).pretty()


//--------------------------------------------------- Bonus -----------------------------------------------------
//1--Write a query to get the average city population for each state   

    db.zipcodes.aggregate([
       {$group:{_id: {city:"$city",state:"$state"}, populationAVG: {$avg:"$pop"}}}]).pretty()
 ] )

 //2--What are the top 3 states in terms of average city population?


 db.zipcodes.aggregate([
{$group:{_id: {city:"$city",state:"$state"}, populationSum: {$sum:"$pop"}}},
{$group:{ _id: "$_id.state" , AvgCityPopulation:{$avg:"$populationSum"}}},
 {$sort: {AvgCityPopulation:-1}},{$limit:5}]).pretty()
