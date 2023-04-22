const { getAllFlights, setFlight, existFlight, abortFlight } = require("../model/flights.model");

function getFlights(req,res){
   return res.status(200).json(getAllFlights());
}

function addFlight(req,res){
    const flight = req.body;
    const {mission,rocket,destination,date} = flight;

    // blank fields validation 
    if(!mission || !rocket || !destination || !date){
        return res.status(400).json({
            error:'Please fill required fields'
        })
    }

    flight.date = new Date(flight.date);

    // date validation
    if(isNaN(flight.date)){
        return res.status(400).json({
            error:'Invalid date'
        })
    }
    setFlight(flight);
    return res.status(201).json(flight);
}

function deleteFlight(req,res){
    const id = Number(req.params.id);
    
    if(!existFlight(id)){
        return res.status(400).json({
            error:'Flight not found'
        })
    }

    const abort = abortFlight(id);
    res.status(200).json(abort);
}

module.exports = {
    getFlights,
    addFlight,
    deleteFlight
}