const Flights = require('./flights.mongo');
const Planets = require('./planets.mongo');

let latestLaunchNumber = 125

// example data
const flight = {
    launchNumber:125,
    mission:'Kepler discover',
    rocket:'Terran 1',
    destination:'Kepler-62 f',
    date:new Date('October 12,2028'),
    customers: ['GreatAlhazen','NASA'],
    upcoming:true,
    success:true,
}

save(flight);


async function getAllFlights () {
    const response = await Flights.find({},{'_id':0,'__v':0});
    console.log(response)
    return response
}

// save flight in mongo
async function save(flight){
    const planet = await Planets.findOne({
        keplerName:flight.destination
    });

    if(!planet){
        throw new Error('Planet not found');
    }
    await Flights.updateOne({
        launchNumber:flight.launchNumber,
    },flight,
    {upsert:true});
}

async function getLatestNumber(){
    const latestNumber = await Flights.findOne().sort('-launchNumber');
    if(!latestNumber){
        return 100;
    }
    return latestNumber.launchNumber;
}

// addFlight to map object
async function setFlight(flight){
    const launchNumber = await getLatestNumber() + 1;
    const newFlight = Object.assign(flight,{
        upcoming:true,
        success:true,
        customers: ['GreatAlhazen','NASA'],
        launchNumber
    });

    await save(newFlight);
}

async function existFlight(id){
   return await Flights.findOne({
    launchNumber:id
   });
}

// delete flight
async function abortFlight(id){
    const aborted =  await Flights.updateOne({
        launchNumber:id
    },{
        upcoming:false,
        success:false,
    });

    return aborted.acknowledged && aborted.modifiedCount === 1;
}

module.exports = {
    getAllFlights,
    setFlight,
    existFlight,
    abortFlight
}