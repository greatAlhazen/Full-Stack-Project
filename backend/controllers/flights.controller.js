const calculatePagination = require("../config/query");
const { getAllFlights, setFlight, existFlight, abortFlight } = require("../model/flights.model");

async function getFlights(req,res){
    const {skip,limit} = calculatePagination(req.query);
   return res.status(200).json(await getAllFlights(skip,limit));
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

async function deleteFlight(req,res){
    const id = Number(req.params.id);
    
    const isFlight = await existFlight(id)
    if(!isFlight){
        return res.status(400).json({
            error:'Flight not found'
        })
    }

    const abort = await abortFlight(id);
    if(!abort){
       return res.status(400).json({
            error:'Flight not aborted'
        });
    }

    res.status(200).json({
        ok:true
    });
}

module.exports = {
    getFlights,
    addFlight,
    deleteFlight
}