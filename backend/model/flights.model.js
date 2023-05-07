const axios = require('axios');
const Flights = require('./flights.mongo');
const Planets = require('./planets.mongo');

const SPACEX_API_URL = 'https://api.spacexdata.com/v5/launches/query';

// load data from api
async function loadSpaceXApi() {
    const response = await axios.post(SPACEX_API_URL, {
        query: {},
        options: {
          pagination: false,
          populate: [
            {
              path: 'rocket',
              select: {
                name: 1
              }
            },
            {
              path: 'payloads',
              select: {
                'customers': 1
              }
            }
          ]
        }
      });

      if(response.status !== 200){
        console.log('Load data failed');
        throw new Error('Load data failed');
      }

      const flightDocs = response.data.docs;
      // get all data one by one and save to database
      for(const flightDoc of flightDocs){
        const payloads = flightDoc['payloads'];
        const customers = payloads.flatMap((payload) =>{
            return payload['customers']
        })
        const flight = {
            launchNumber:flightDoc['flight_number'],
            mission:flightDoc['name'],
            rocket:flightDoc['rocket']['name'],
            date:flightDoc['date_local'],
            upcoming:flightDoc['upcoming'],
            success:flightDoc['success'],
            customers
        }
        await save(flight);
      }
}


async function getAllFlights (skip,limit) {
    const response = await Flights.find({},{'_id':0,'__v':0})
    .sort({launchNumber:-1})
    .skip(skip)
    .limit(limit);
    return response
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
    const planet = await Planets.findOne({
        keplerName:flight.destination
    });

    if(!planet){
        throw new Error('Planet not found');
    }

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

// save flight in mongo
async function save(flight){
    await Flights.updateOne({
        launchNumber:flight.launchNumber,
    },flight,
    {upsert:true});
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
    abortFlight,
    loadSpaceXApi,
}