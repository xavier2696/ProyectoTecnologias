'use strict';

/**
 * @ngdoc function
 * @name proyectoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the proyectoApp
 */
angular.module('proyectoApp')
  .controller('MainCtrl',['$http','$scope', function ($http,$scope) {
    
    $scope.emotions = [];
    $scope.url = "";
    $scope.emotionDescriptions = [];

    $scope.obtainEmotions = function(){
    	$scope.emotions = [];
    	$scope.emotionDescriptions = [];
    	document.getElementById("imagen").src = $scope.url;
    	console.log($scope.url);
    	$http.post('https://api.projectoxford.ai/emotion/v1.0/recognize', { "url": $scope.url }, {headers: {'Ocp-Apim-Subscription-Key': '837991f885f649f48649c4a36f4c387f'} 
    	}).success(function(data) {
			$scope.emotions = data;
			console.log(data);
			var numberFaces = 0;
			$scope.emotions.forEach(function(emotion) {  
				numberFaces++;
				var description = "";
				if(emotion.scores.anger > 0.9)
					description+="Mucha ira, ";
				else if(emotion.scores.anger > 0.5)
					description +="Un poco de ira, ";
				if(emotion.scores.contempt > 0.9)
					description+="Mucho desprecio, ";
				else if(emotion.scores.contempt > 0.5)
					description +="Un poco de desprecio, ";
				if(emotion.scores.disgust > 0.9)
					description+="Mucho disgusto, ";
				else if(emotion.scores.disgust > 0.5)
					description +="Un poco de disgusto, ";
				if(emotion.scores.fear > 0.9)
					description+="Mucho miedo, ";
				else if(emotion.scores.fear > 0.5)
					description +="Un poco de miedo, ";
				if(emotion.scores.happiness > 0.9)
					description+="Mucha felicidad, ";
				else if(emotion.scores.happines > 0.5)
					description +="Un poco de felicidad, ";
				if(emotion.scores.sadness > 0.9)
					description+="Mucha tristeza, ";
				else if(emotion.scores.sadness > 0.5)
					description +="Un poco de tristeza, ";
				if(emotion.scores.surprise > 0.9)
					description+="Mucha sorpresa, ";
				else if(emotion.scores.surprise > 0.5)
					description +="Un poco de sorpresa, ";
				if(description.length == 0)
					description = "No se puede determinar las emociones";
				else
					description = description.slice(0,description.length-2);
				var objectDescription = {}
				objectDescription.text = description;
				objectDescription.number = numberFaces;
				$scope.emotionDescriptions.push(objectDescription);
			});
        }).error(function(data) {
            console.log("error");
        });
    }
  }]);
