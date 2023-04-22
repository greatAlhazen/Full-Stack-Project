const flights = new Map();

let latestLaunchNumber = 125

// example data
const flight = {
    launchNumber:125,
    mission:'Kepler discover',
    rocket:'Terran 1',
    destination:'kepler-62 f',
    date:new Date('October 12,2028'),
    customers: ['GreatAlhazen','NASA'],
    upcoming:true,
    success:true,
}

// add example data to map object
flights.set(flight.launchNumber,flight);

function getAllFlights () {
    return Array.from(flights.values());
}

// addFlight to map object
function setFlight(flight){
    latestLaunchNumber++;
    flights.set(latestLaunchNumber,Object.assign(flight,{
        launchNumber: latestLaunchNumber,
        customers: ['GreatAlhazen','NASA'],
        upcoming:true,
        success:true,
    }))
}

function existFlight(id){
   return flights.has(id);
}

// delete flight
function abortFlight(id){
    const abortedFlight = flights.get(id);
    abortedFlight.upcoming = false;
    abortedFlight.success = false;
    return abortedFlight;
}

module.exports = {
    getAllFlights,
    setFlight,
    existFlight,
    abortFlight
}