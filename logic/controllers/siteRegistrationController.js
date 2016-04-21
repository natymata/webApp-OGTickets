angular.module('OGTicketsApp.controllers')
.controller('siteRegistrationController', ['$scope','localStorageService','formService','siteService', '$window','$routeParams', function ($scope,localStorageService, formService, siteService, $window,$routeParams) {

	$scope.newSite={};
	$scope.error="";

	var picture = '';
	//Saves on src the url generated for the picture
	$scope.savePicture=function(src){
		picture = src;
	};
	//Funcion del boton de registro de evento, agarra todos los datos del formulario.
	$scope.registerSite=function () {
		$scope.newSite.image = picture;
		result= siteService.registerSite($scope.newSite);
		var siteId;
		if(result.value){
			siteId= result.siteId;
			$scope.newSite={};
			formService.clear($scope.formNewSite);
			$window.location.href = ('#/site-profile/'+siteId);
			$scope.error="";
		}else{
			$scope.error="El sitio ya existe";
		}
	}; 

	//Editar sitio.
	var siteId= $routeParams.siteId;
	var currentSite= siteService.retrieveSite(siteId);
	$scope.newSite= currentSite;
	

	if(siteId==undefined){
		$scope.editing= false;
	}else{
		$scope.editing= true;
	};

	$scope.editSite=function(){
		siteService.replaceSite(siteId, $scope.newSite);
		$scope.newSite={};
		formService.clear($scope.formNewSite);
		$window.location.href = ('#/site-profile/'+siteId);
	};

	//Expresiones regulares, para validad campos de formulario
	$scope.expCapacity = /^[\ |0-9]{1,5}$/;
	$scope.expDecimalLatitude = /^-?\d{0,2}(?:,\s?\d{3})*(?:\.\d*)?$/;
	$scope.expDecimalLongitude = /^-?\d{0,3}(?:,\s?\d{3})*(?:\.\d*)?$/;
	
}]);