angular.module('OGTicketsApp.services')
.service('BDService', ['localStorageService', function(localStorageService) {

	//listas quemadas
	var savedUserList=[
		{ "name": "Manuel Mendoza", "id": "cl01", "active": true, "email": "manuelmendoza@gmail.com", "password": "Abcdefg1", "gender": "Masculino", "personalId": "115290295", "birthday": "1994-04-29T06:00:00.000Z", "userType": "ut02" },
		{ "name": "Juan Pérez", "id": "cl02", "active": true, "email": "juanperez@gmail.com", "password": "Juanperez2", "gender": "Masculino", "personalId": "109820432", "birthday": "1984-06-22T06:00:00.000Z", "userType": "ut02" },
		{ "name": "Karla Jiménez", "id": "cl03", "active": false, "email": "karlajimenez@yahoo.es", "password": "Karlita26", "gender": "Femenino", "personalId": "112980324", "birthday": "1990-06-26T06:00:00.000Z", "userType": "ut02" },
		{ "name": "Naty Mata", "id": "cl04", "active": true, "email": "natymata@gmail.com", "password": "123", "gender": "Femenino", "personalId": "304080245", "birthday": "1986-01-26T06:00:00.000Z", "userType": "ut02" },
/*promotores*/
		{ "name": "Cheese Productions", "password": "Holahola77", "id": "pr01", "active": true, "email": "cheeseproductions@gmail.com", "personalId": "3816497372", "areaOfSpecialization": "Conciertos", "phoneOne": "60324127", "address": "Desamparados, San José", "phoneTwo": "22236543", "userType": "ut03" },
		{ "name": "Jonathan Ryzowy", "password": "Distrito55", "active": true, "email": "ryzowy@gmail.com", "personalId": "105720123", "areaOfSpecialization": "Cultura", "phoneOne": "88328319", "id": "pr02", "address": "Santa Ana, Costa Rica", "userType": "ut03" },
		{ "name": "Francisca Productions", "password": "Francisquita2", "active": false, "id": "pr03", "email": "info@franciscaproductions.com", "personalId": "3692134812", "areaOfSpecialization": "Deportes", "phoneOne": "22138844", "address": "Santo Domingo, Heredia", "userType": "ut03"},
/*cajeros*/
		{ "name": "Juanita Hidalgo Rodríguez", "active": true, "password": "Hidalgo92", "id": "cs01", "gender": "Femenino", "email": "j.hidalgo.rodriguez@hotmail.com", "phone": "88120922", "birthday": "1991-10-21T06:00:00.000Z", "userType": "ut04" },
		{ "name": "Josefina Duarte", "password": "Duarte7621", "active": true, "id": "cs02", "gender": "Femenino", "email": "josefita@yahoo.com", "phone": "22216709", "birthday": "1983-09-12T06:00:00.000Z", "userType": "ut04" },
		{ "name": "Carlos Ugalde", "password": "Ugalde2223", "active": true, "id": "cs03", "gender": "Masculino", "email": "carlosugalde_8732@hotmail.com", "phone": "73902476", "birthday": "1993-01-29T06:00:00.000Z", "userType": "ut04"},
/*admin*/		
		{"name": "Admin", "id": "ad01", "password": "admin", "email": "oxyGenAdmin@gmail.com", "userType": "ut01", "active": true}
	];

	var savedEventsList=[
		{ "startHour": "7:00pm", "endHour": "10:00pm",  "siteId": "si03", "active": true, "description": "Viene Rihanna con su World Tour, un verdadero show que no te podés perder", "date": "2016-04-07T06:00:00.000Z", "id": "ev01", "name": "Rihanna World Tour", "ticketsPrice": 35500, "eventType": "et01", "capacity": 6000, "image": "imagen6.jpg", "promoterId": "pr02" },
		{ "startHour": "10:00pm", "endHour": "9:30pm", "active": true, "siteId": "si03", "description": "Costa Rica recibe a Jamaica", "name": "Costa Rica vs Jamaica", "id": "ev02", "date": "2016-04-17T06:00:00.000Z", "eventType": "et01", "ticketsPrice": 8000, "capacity": 7000, "image": "imagen4.jpg", "promoterId": "pr02"  },
		{ "startHour": "8:00pm", "endHour": "9:00pm", "active": true, "siteId": "si02", "description": "Revive y canta junto con Jaime Gamboa y Malpaís las canciones inolvidables que nos dejó Fidel Gamboa", "name": "Malpaís en concierto" , "id": "ev03", "date": "2016-05-16T06:00:00.000Z", "eventType": "et01", "ticketsPrice": 5000, "capacity": 3000, "image": "imagen2.jpg", "promoterId": "pr01" }
	];

	var savedSiteList=[
		{ "id": "si01", "name":"Teatro Nacional", "phoneOne": 20101110, "phoneTwo": 20101111, "capacity": 4000, "latitude": 125, "longitude": 346, "address": "Avenida Segunda entre Calles 3 y 5, Centro, San José, Costa Rica", "active": true },
		{ "id": "si02", "name":"Bar el Observatorio", "phoneOne": 22230725, "phoneTwo": "", "capacity": 300, "latitude": 458, "longitude": 154, "address": "La California, San José, Costa Rica", "active": true },
		{ "id": "si03", "name":"Estadio Nacional", "phoneOne": 25490700, "phoneTwo": "", "capacity": 36500, "latitude": 127, "longitude": 452, "address": "Parque Metropolitano la Sabana, San José, Costa Rica", "active": true }
	];

	var savedTransactionList=[
		{"id": "tr01", "cancelled": true, "transactionType": "tt01", "eventId": "ev02", "ticketsAmount" : 2, "idClient": "cl02", "active": true, "trCode":"pu-cl02-ev02-0329-tr01" }
	];

	var savedEventTypeList = [
		{"name": "Música", "id": "et01", "value": "musica"}, 
		{"name": "Cultura", "id": "et02", "value": "cultura"}, 
		{"name": "Deportes", "id": "et03", "value": "deportes"}, 
		{"name": "Teatro", "id": "et04", "value": "teatro"}, 
		{"name": "Arte", "id": "et05", "value": "arte"}
	];

	var savedPromoterRegisterRequest = [
		//solicitudes aprobadas
		{ "approved": true, "pendingCheck": false, "name": "Cheese Productions", "password": "Holahola77", "id": "rq01", "email": "cheeseproductions@gmail.com", "personalId": "3816497372", "areaOfSpecialization": "Conciertos", "phoneOne": "60324127", "address": "Desamparados, San José", "phoneTwo": "22236543", "userType": 3 },
		{ "approved": true, "pendingCheck": false, "name": "Jonathan Ryzowy", "password": "Distrito55", "email": "ryzowy@gmail.com", "personalId": "105720123", "areaOfSpecialization": "Cultura", "phoneOne": "88328319", "id": "rq02", "address": "Santa Ana, Costa Rica", "userType": 3 },
		{ "approved": true, "pendingCheck": false, "name": "Francisca Productions", "password": "Francisquita2", "id": "rq03", "email": "info@franciscaproductions.com", "personalId": "3692134812", "areaOfSpecialization": "Deportes", "phoneOne": "22138844", "address": "Santo Domingo, Heredia", "userType": 3 },
		//solicitudes no aprovadas
		{ "approved": false, "pendingCheck": true, "name": "Degree Productions", "password": "degree1", "id": "rq04", "email": "degree@gmail.com", "personalId": "5864597372", "areaOfSpecialization": "Arte", "phoneOne": "75632589", "address": "Escazu, San José", "phoneTwo": "25639856", "userType": 3 },
		{ "approved": false, "pendingCheck": true, "name": "Yoda Productions", "password": "yoda1", "email": "yadainfo@gmail.com", "personalId": "305690589", "areaOfSpecialization": "Teatro", "phoneOne": "75698632", "id": "rq05", "address": "Moravia, Costa Rica", "userType": 3 },
		{ "approved": false, "pendingCheck": true, "name": "Backstage Productions", "password": "bs1234", "id": "rq06", "email": "bsinfo@backstage.com", "personalId": "13698756", "areaOfSpecialization": "Música", "phoneOne": "29865647", "address": "Paraíso, Cartago", "userType": 3 },

	];


	//metodos ara cargar la base de datos con datos

	//quemar los datos de usuarios
	var userList= function () {
		return localStorageService.getOrArray("userList", savedUserList);
	};

	//quemar los datos de evento
	var eventsList= function () {
		return localStorageService.getOrArray("eventsList", savedEventsList);
	};

	//quemar los datos de sitio
	var siteList= function () {
		return localStorageService.getOrArray("siteList", savedSiteList);
	};

	//quemar los datos de transacciones
	var transactionList= function () {
		return localStorageService.getOrArray("transactionList", savedTransactionList);
	};
	 
	//quemar los datos del tipo de evento
	var eventTypeList= function () {
		return localStorageService.getOrArray("eventTypeList", savedEventTypeList);
	};

	//quemar los datos del tipo de evento
	var promoterRegisterRequest= function () {
		return localStorageService.getOrArray("promoterRegisterRequest", savedPromoterRegisterRequest);
	};


//puntos de acceso de los metodos del servicio:
	return{
		userList:userList,
		eventsList:eventsList,
		siteList:siteList,
		transactionList:transactionList,
		eventTypeList:eventTypeList,
		promoterRegisterRequest:promoterRegisterRequest
	};
}]);//end -service-




