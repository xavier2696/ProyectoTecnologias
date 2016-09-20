'use strict';

/**
 * @ngdoc function
 * @name proyectoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the proyectoApp
 */
angular.module('proyectoApp')
    .controller('MainCtrl', ['$http', '$scope', function($http, $scope) {

        $scope.emotions = [];
        $scope.url = "";
        $scope.emotionDescriptions = [];
        $scope.attributes = [];

        $scope.obtainEmotions = function() {
            //if(document.getElementById("imagen").clientHeight == "500" && document.getElementById("imagen").clientWidth=="600")
            //    location.reload();
            document.getElementById("imagen").style.height = "";
                    document.getElementById("imagen").style.width = "";
            $scope.emotions = [];
            $scope.emotionDescriptions = [];
            $scope.attributes = [];
            document.getElementById("imagen").src = $scope.url;
            $(".square").remove();
            $http.post('https://api.projectoxford.ai/face/v1.0/detect/?returnFaceAttributes=age,gender,facialHair,smile,glasses', { "url": $scope.url }, {
                        headers: { 'Ocp-Apim-Subscription-Key': 'db698e8c967245728d9d65c5e70abd9b' }
                    }).success(function(data2) {
                        data2.forEach(function(atributo) {
                            var atributos = "Edad: "+atributo.faceAttributes.age;
                            if (atributo.faceAttributes.gender == "male")
                                atributos += "\nGenero: Masculino";
                            else
                                atributos += "\nGenero: Femenino";
                            if(atributo.faceAttributes.glasses !== "NoGlasses")
                                atributos += "\nUtiliza Lentes";
                            $scope.attributes.push(atributos);
                            //console.log(data2);
                        });
                    }).error(function(data2) {
                        console.log("error");
                    });
            $http.post('https://api.projectoxford.ai/emotion/v1.0/recognize', { "url": $scope.url }, {
                headers: { 'Ocp-Apim-Subscription-Key': '837991f885f649f48649c4a36f4c387f' }
            }).success(function(data) {                

                $scope.emotions = data;
                var image_wrapper = $(".image-wrapper");
                var numberFaces = 0;
                var square;
                var descriptionTooltip;
                var contador = 0;
                $scope.emotions.forEach(function(emotion) {
                    var style = "";
                    for (var i in emotion.faceRectangle) {
                        
                        if(i == "height" || i == "top"){
                            //console.log(emotion.faceRectangle[i]*500/document.getElementById("imagen").height);
                            style += i + ":" + emotion.faceRectangle[i]*500/(parseInt(document.getElementById("imagen").clientHeight)) + "px;";
                            //console.log("Altura: "+document.getElementById("imagen").clientHeight);

                        }else{  
                            //console.log(emotion.faceRectangle[i]*600/document.getElementById("imagen").width);
                            style += i + ":" + emotion.faceRectangle[i]*600/(parseInt(document.getElementById("imagen").clientWidth)) + "px;";
                            //console.log("Anchura: "+document.getElementById("imagen").clientWidth);
                        }
                    }
                    

                    descriptionTooltip = document.createElement("a");
                    square = document.createElement("div");
                    square.setAttribute("class", "square");
                    square.setAttribute("style", style);

                    numberFaces++;
                    var description = "";
                    if (emotion.scores.anger > 0.9)
                        description += "Mucha ira, ";
                    else if (emotion.scores.anger > 0.3)
                        description += "Un poco de ira, ";
                    if (emotion.scores.contempt > 0.9)
                        description += "Mucho desprecio, ";
                    else if (emotion.scores.contempt > 0.3)
                        description += "Un poco de desprecio, ";
                    if (emotion.scores.disgust > 0.9)
                        description += "Mucho disgusto, ";
                    else if (emotion.scores.disgust > 0.3)
                        description += "Un poco de disgusto, ";
                    if (emotion.scores.fear > 0.9)
                        description += "Mucho miedo, ";
                    else if (emotion.scores.fear > 0.3)
                        description += "Un poco de miedo, ";
                    if (emotion.scores.happiness > 0.9)
                        description += "Mucha felicidad, ";
                    else if (emotion.scores.happines > 0.3)
                        description += "Un poco de felicidad, ";
                    if (emotion.scores.sadness > 0.3)
                        description += "Mucha tristeza, ";
                    else if (emotion.scores.sadness > 0.3)
                        description += "Un poco de tristeza, ";
                    if (emotion.scores.surprise > 0.9)
                        description += "Mucha sorpresa, ";
                    else if (emotion.scores.surprise > 0.3)
                        description += "Un poco de sorpresa, ";
                    if (emotion.scores.neutral > 0.3)
                        description += "No muestra emociones";
                    if (description.length == 0)
                        description = "No se puede determinar la emocion.";
                    else
                        description = description.slice(0, description.length - 2);
                    var objectDescription = {};
                    var scores = "";
                    for (var i in emotion.scores) {
                        //scores += "\n\r"+i + ":" + (emotion.scores[i] * 100).toPrecision(4) + "%";
                    }

                    square.setAttribute("data-toggle", "tooltip");
                    square.setAttribute("title", $scope.attributes[contador]+"\n"+description+""+scores);

                    image_wrapper.append(square);
                    $('[data-toggle="tooltip"]').tooltip();
                    contador++;
                });
                document.getElementById("imagen").style.height = "500px";
                    document.getElementById("imagen").style.width = "600px";
                    $scope.url = "";
            }).error(function(data) {
                console.log("error");
            });
        }
    }]);
