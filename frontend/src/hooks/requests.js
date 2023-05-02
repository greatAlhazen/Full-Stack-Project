const API_URL = 'http://localhost:8080/v1';

async function httpGetPlanets() {
	const response = await fetch(`${API_URL}/planets`);
	return await response.json();
}

async function httpGetLaunches() {
	const response = await fetch(`${API_URL}/flights`);
	const data = await response.json();
	return data.sort((a,b) => {
		return a.launchNumber > b.launchNumber
	})
}

async function httpSubmitLaunch(flight) {
	try {
		return await fetch(`${API_URL}/flights`, {
		  method: "post",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(flight),
		});
	  } catch(err) {
		return {
		  ok: false,
		};
	  }
}

async function httpAbortLaunch(id) {
	try{
		return await fetch(`${API_URL}/flights/${id}`,{
			method:'delete'
		})
	}catch(err){
		return {
			ok:'false'
		}
	}
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
