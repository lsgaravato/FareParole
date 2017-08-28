var myAppControllers = angular.module('myAppControllers', []);


myAppControllers.controller('HomeController', [
    '$scope', '$routeParams',
    function ($scope, $routeParams) {

        getAudioElementAndPlay('#audioFareParole');

        $scope.playAudioHint = function (selector) {
            getAudioElementAndPlay(selector);
        }
    }
]);

myAppControllers.controller('ImparaController', [
    '$scope', '$routeParams', '$location',
    function ($scope, $routeParams, $location) {

        //playAudioToccaUnaLettera();
        hintToccaUnaLettera();

        $scope.consonantiRiga1 = $consonantiRiga1;
        $scope.consonantiRiga2 = $consonantiRiga2;
        $scope.consonantiRiga3 = $consonantiRiga3;
        $scope.vocali = $vocali;

        $scope.imgConsonanteCaso = $IMG_LETTERA_CASO;
        $scope.consonanteRandom = getRandomElemento($consonanti);

        function getRandomElemento(array) {
            var randomIndex = Math.floor(Math.random() * array.length);
            return array[randomIndex];
        }
		
		$scope.changeLocation = function(path) {
			$location.path(path);
		}
    }
]);

myAppControllers.controller('DemoVocaliController', [
    '$scope', '$routeParams', '$timeout',
    function ($scope, $routeParams, $timeout) {

        //playAudioToccaUnaLettera();
        hintToccaUnaLettera();

        $scope.currentVocale = null;
        $scope.showBack = false;
        $scope.imgBack = $IMG_LETTERA;
        $scope.imgFront = $IMG_LETTERA;
        $('#v1-vocale').flip({ trigger: 'manual' });

        $scope.setVocale = function (vocale) {

            var vocaleCambiata = $scope.currentVocale == null || vocale.name != $scope.currentVocale.name;

            $scope.currentVocale = vocale;

            if (vocaleCambiata) {
                flipCard();
            }

            // se la carta è stata girata aspetto x ms prima di pronunciare la vocale
            var timeout = vocaleCambiata ? 1100 : 0;
            $timeout(function() {
                var audioElem = getAudioPlayer();
                setSoundToPlay(audioElem, vocale.audioConParola);
                playAudio(audioElem);
            }, timeout);
        };

        function flipCard() {
            if ($scope.showBack) {
                $scope.imgFront = $scope.currentVocale.imageUrl;
            } else {
                $scope.imgBack = $scope.currentVocale.imageUrl;
            }
            $scope.showBack = !$scope.showBack;
            $('#v1-vocale').flip($scope.showBack);
        }

        $scope.vocali = $vocali;
    }
]);


myAppControllers.controller('ScritturaVocaliController', [
    '$scope', '$routeParams', '$timeout',
    function ($scope, $routeParams, $timeout) {

        //playAudioToccaIlBottone();
        hintToccaIlBottone();

        $scope.vocali = $vocali;
        var vocaliRandom = [];
        var audioElem = getAudioPlayer('#audioVocale');
        var suonoAscoltato = false;

        setCurrentVocale();


        $scope.playSoundScrittura = function () {
            clearSelection();
            suonoAscoltato = true;

            playAudio(audioElem);

            audioElem.onended = function() {
                $timeout(function() {
                    //playAudioToccaLaLettera();
                    hintToccaLaLettera();
                }, 400);
            }
        }

        $scope.checkSelection = function (letterName) {
            if (!suonoAscoltato)
                return;

            var element = angular.element('#v2-vocale-' + letterName + ' > img');

            if ($scope.currentVocale.name == letterName) {
                rightAnswer(element);
                setCurrentVocale();
            } else {
                wrongAnswer(element);
            }

        }

        function rightAnswer(element) {
            element.addClass("bg-verde");
            playAudioBene();
        }

        function wrongAnswer(element) {
            element.addClass("bg-rosso");
            playAudioNo();
        }

        function clearSelection() {
            suonoAscoltato = false;
            angular.element('.bg-rosso').removeClass("bg-rosso");
            angular.element('.bg-verde').removeClass("bg-verde");
        }

        //function haIndovinato() {
        //    return angular.element('.bg-verde').length > 0;
        //}

        function setCurrentVocale() {
            if (vocaliRandom.length == 0) {
                vocaliRandom = shuffle(JSON.parse(JSON.stringify($vocali)));
            }
            $scope.currentVocale = vocaliRandom.pop(0);

            audioElem.src = $scope.currentVocale.audioVocale;
            suonoAscoltato = false;
        }
    }
]);



myAppControllers.controller('LetturaVocaliController', [
    '$scope', '$routeParams', '$timeout',
    function ($scope, $routeParams, $timeout) {

        //playAudioToccaIlBottone();
        hintToccaIlBottone();

        $scope.vocali = $vocali;
        var vocaliRandom = [];
        var audioPlayer = getAudioPlayer();

        $scope.showBack = false;
        $scope.imgBack = $IMG_LETTERA;
        $scope.imgFront = $IMG_LETTERA;
        $('#v3-vocale').flip({ trigger: 'manual' });

        setCurrentVocale();

        $scope.playSoundLettura = function () {

            showCard();

            $timeout(function() { playHint(); }, 1100);
        }

        function showCard() {
            if ($scope.showBack) {
                $scope.imgFront = $scope.currentVocale.imageUrl;
            } else {
                $scope.imgBack = $scope.currentVocale.imageUrl;
            }
            $scope.showBack = !$scope.showBack;
            $('#v3-vocale').flip($scope.showBack);
            //document.getElementById('imgCarta').src = $scope.currentVocale.imageUrl;
        }

        function playHint() {
            
            var audioHint = getAudioPlayer('#audioLeggi');
            playAudio(audioHint);
            audioHint.onended = function () {
                $timeout(function () {
                    playAudio(audioPlayer);
                }, 3000);
            };
        }

        audioPlayer.onended = function () {
            setCurrentVocale();
        };
        
        function setCurrentVocale() {
            if (vocaliRandom.length == 0) {
                vocaliRandom = shuffle(JSON.parse(JSON.stringify($vocali)));
            }
            $scope.currentVocale = vocaliRandom.pop(0);

            audioPlayer.src = $scope.currentVocale.audioVocale;
        }
    }
]);


myAppControllers.controller('DemoConsonanteController', [
    '$scope', '$routeParams',
    function ($scope, $routeParams) {

        //playAudioToccaIlBottone();
        hintToccaIlBottone();

        $scope.name = $routeParams.name;

        $scope.consonante = getConsonante($routeParams.name);

        $scope.playAudioConsonante = function () {
            var audioElem = getAudioPlayer();
            playAudio(audioElem);
        };
    }
]);


myAppControllers.controller('DemoSillabeController', [
    '$scope', '$routeParams',
    function ($scope, $routeParams) {

        $scope.nextStep = isConsonanteComplessa($routeParams.name) ? 'scritturaSillabe' : 'costruzioneSillabe';

        //playAudioToccaIlBottone();
        hintToccaIlBottone();
        
        $scope.name = $routeParams.name;

        $scope.sillabe = getSillabePerConsonante($routeParams.name);

        $scope.playSillaba = function(sillaba) {
            var audioPlayer = getAudioPlayer('#audio-' + sillaba.name);
            playAudio(audioPlayer);

            $('.evidenziata').removeClass('evidenziata');
            $('#sillabazione-2-' + sillaba.name).addClass('evidenziata');
        }
    }
]);


myAppControllers.controller('ScritturaSillabeController', [
    '$scope', '$routeParams', '$timeout',
    function ($scope, $routeParams, $timeout) {

        $scope.previousStep = isConsonanteComplessa($routeParams.name) ? 'demoSillabe' : 'costruzioneSillabe';

        //playAudioToccaIlBottone();
        hintToccaIlBottone();

        $scope.name = $routeParams.name;

        var sillabeFiltrate = getSillabePerConsonante($routeParams.name);
        $scope.sillabe = sillabeFiltrate;
        var sillabeRandom = [];
        var audioElem = getAudioPlayer();
        var suonoAscoltato = false;

        setCurrentSillaba();


        $scope.playSoundScrittura = function () {
            clearSelection();
            suonoAscoltato = true;

            playAudio(audioElem);
            
            // suggerimento tocca la sillaba
            audioElem.onended = function() {
                $timeout(function() {
                    //playAudioToccaLaSillaba();
                    hintToccaLaSillaba();
                }, 700);
            };
        }

        $scope.checkSelection = function (sillabaName) {
            if (!suonoAscoltato)
                return;

            var element = angular.element('#sillaba-' + sillabaName + ' > .testo');

            if ($scope.currentSillaba.name == sillabaName) {
                rightAnswer(element);
                setCurrentSillaba();
            } else {
                wrongAnswer(element);
            }

        }

        function rightAnswer(element) {
            element.addClass("bg-verde");
            playAudioBene();
        }

        function wrongAnswer(element) {
            element.addClass("bg-rosso");
            playAudioNo();
        }

        function clearSelection() {
            suonoAscoltato = false;
            angular.element('.bg-rosso').removeClass("bg-rosso");
            angular.element('.bg-verde').removeClass("bg-verde");
        }

        //function haIndovinato() {
        //    return angular.element('.bg-verde').length > 0;
        //}

        function setCurrentSillaba() {
            if (sillabeRandom.length == 0) {
                sillabeRandom = shuffle(JSON.parse(JSON.stringify(sillabeFiltrate)));
            }
            $scope.currentSillaba = sillabeRandom.pop(0);

            audioElem.src = $scope.currentSillaba.audioSillaba;
            suonoAscoltato = false;
        }
    }
]);


myAppControllers.controller('LetturaSillabeController', [
    '$scope', '$routeParams',
    function ($scope, $routeParams) {

        //playAudioToccaIlBottone();
        hintToccaIlBottone();

        $scope.isDisabled = false;
        $('#sillaba').flip({ trigger: 'manual' });

        $scope.name = $routeParams.name;

        var sillabeFiltrate = getSillabePerConsonante($routeParams.name);
        $scope.sillabe = sillabeFiltrate;

        var sillabeRandom = [];
        var audioPlayer = getAudioPlayer();

        //setCurrentSillaba();

        $scope.showBack = false;
        $('.imgBack').html('?');
        $('.imgFront').html('?');
        

        $scope.playSoundLettura = function () {
            //showCard();
            showAndPlayHint();
        }

        //function showCard() {
        //    document.getElementById('imgCarta').src = $scope.currentSillaba.imageUrl;
        //}

        function showAndPlayHint() {
            if ($scope.isDisabled)
                return;

            setCurrentSillaba();
            $scope.showBack = !$scope.showBack;
            $('#sillaba').flip($scope.showBack);

            var audioHint = getAudioPlayer('#audioLeggi');
            playAudio(audioHint);
            $scope.isDisabled = true;
            audioHint.onended = function () {
                setTimeout(function () {
                    //audioPlayer.load();
                    playAudio(audioPlayer);
                    $scope.isDisabled = false;
                }, 3000);
            };
        }

        //audioPlayer.onended = function () {
        //    setCurrentSillaba();
        //};

        function setCurrentSillaba() {
            if (sillabeRandom.length == 0) {
                sillabeRandom = shuffle(JSON.parse(JSON.stringify(sillabeFiltrate)));
            }
            $scope.currentSillaba = sillabeRandom.pop(0);

            audioPlayer.src = $scope.currentSillaba.audioSillaba;

            if ($scope.showBack) {
                $('.imgFront').html($scope.currentSillaba.name.toUpperCase());
            } else {
                $('.imgBack').html($scope.currentSillaba.name.toUpperCase());
            }
        }
    }
]);


myAppControllers.controller('CostruzioneSillabeController', [
    '$scope', '$routeParams',
    function ($scope, $routeParams) {

        // per queste consonanti non esiste il gioco delle sillabe
        if (isConsonanteComplessa($routeParams.name)) {
            window.location.href = '/';
        }

        //playAudioToccaIlBottone();
        hintToccaIlBottone();

        $scope.name = $routeParams.name;

        $scope.consonanteIniziale = getConsonante($routeParams.name);

        var sillabeFiltrate = getSillabePerConsonante($routeParams.name);

        for (var i = 0; i < sillabeFiltrate.length; i++) {
            var vocale = getVocale(sillabeFiltrate[i].vocale);
            sillabeFiltrate[i].imageUrl = vocale.imageUrl;
        }

        
        $scope.sillabe = sillabeFiltrate;
        $scope.sillaba1Indovinata = false;
        $scope.sillaba2Indovinata = false;
        $scope.sillaba1Mostrata = '_';
        $scope.sillaba2Mostrata = '_';

        

        var sillabeRandom = [];
        var audioPlayer = getAudioPlayer();
        var suonoAscoltato = false;

        setCurrentSillaba();

        $scope.playSoundLettura = function () {
            if ($scope.sillaba1Indovinata && $scope.sillaba2Indovinata) {
                setCurrentSillaba();
            }

            clearSelection();
            
            showAndPlayHint();
        }

        function rightAnswer(element) {
            
            playAudioBene();
            element.removeClass("bg-rosso");
            element.addClass("bg-verde");

            // resetto le vocali
            clearErroriVocali();

            if (!$scope.sillaba1Indovinata) {
                $scope.sillaba1Indovinata = true;
                $scope.sillaba1Mostrata = $scope.currentSillaba.s1;
            } else {
                $scope.sillaba2Indovinata = true;
                $scope.sillaba2Mostrata = $scope.currentSillaba.s2;
            }
            
        }

        function wrongAnswer(element) {
            playAudioNo();
            element.removeClass("bg-verde");
            element.addClass("bg-rosso");
        }

        $scope.checkSelection = function (letterName) {
            if (!suonoAscoltato)
                return;

            var letteraDaControllare = ($scope.sillaba1Indovinata) ? $scope.currentSillaba.s2 : $scope.currentSillaba.s1;
            var element = angular.element('#c3-consonante-' + letterName + ' > img');

            // FIXME: Cablatura per il caso particolare della Q, fare un fix generico
            if (letterName == "Q")
                letterName = "QU";

            if (letteraDaControllare == letterName) {
                rightAnswer(element);
            } else {
                wrongAnswer(element);
            }

            if ($scope.sillaba1Indovinata && $scope.sillaba2Indovinata) {
                playAudioVittoria();
            }
        }


        function showAndPlayHint() {

            playAudio(audioPlayer);

            suonoAscoltato = true;

            // dopo 500ms si sente il suggerimento audio "Tocca"
            audioPlayer.onended = function () {
                setTimeout(function() {
                    //playAudioToccaLeLettere();
                    hintToccaLeLettere();
                },200);
            };
        }

        function setCurrentSillaba() {
            if (sillabeRandom.length == 0) {
                sillabeRandom = shuffle(JSON.parse(JSON.stringify(sillabeFiltrate)));
            }
            $scope.currentSillaba = sillabeRandom.pop(0);

            audioPlayer.src = $scope.currentSillaba.audioSillaba;
        }

        function clearErroriVocali() {
            $('.box-consonanti .carta:gt(0) > img').removeClass("bg-rosso");
        }

        function clearSelection() {
            suonoAscoltato = false;
            $scope.sillaba1Indovinata = false;
            $scope.sillaba2Indovinata = false;
            $scope.sillaba1Mostrata = '_';
            $scope.sillaba2Mostrata = '_';
            angular.element('.bg-rosso').removeClass("bg-rosso");
            angular.element('.bg-verde').removeClass("bg-verde");
        }

        function playAudioVittoria() {
            var audioElem = getAudioPlayer('#audioVittoria');
            playAudio(audioElem);
        }
    }
]);

myAppControllers.controller('GiocaController', [
    '$scope', '$routeParams', '$timeout',
    function ($scope, $routeParams, $timeout) {

        getAudioElementAndPlay('#audioGioca');

        $scope.playAudioHint = function (selector) {
            getAudioElementAndPlay(selector);
        }
    }
]);

myAppControllers.controller('GiocaSillabeController', [
    '$scope', '$routeParams', '$timeout',
    function ($scope, $routeParams, $timeout) {

        //playAudioToccaIlBottone();
        hintToccaIlBottone();

        $scope.vocali = $vocali;
        $scope.consonanti = $consonanti;
        $scope.sillabe = $sillabe;
        $scope.combinazioni = creaGrigliaSillabe($consonanti, $vocali, $sillabe);
        $scope.sillabaMostrata = '?';
        $scope.erroriTurno = 0;
        
        var sillabeRandom = [];
        var audioPlayer = getAudioPlayer();
        var suonoAscoltato = false;
        var sillabaIndovinata = false;


        $scope.play = function () {

            if (suonoAscoltato && !sillabaIndovinata) {
                playAudio(audioPlayer); // riascolta suono
                return;
            }
                

            clearSelection();
            setCurrentSillaba();

            playAudio(audioPlayer);

            suonoAscoltato = true;
        }

        $scope.checkSelection = onUserSelection;


        function onUserSelection(sillabaName) {
            if (!suonoAscoltato || sillabaIndovinata)
                return;

            var element = angular.element('#' + sillabaName);

            if ($scope.currentSillaba.name == sillabaName) {
                rightAnswer(element);
            } else {
                wrongAnswer(element);
            }

            if ($scope.erroriTurno == 3) {
                $timeout(function() {
                    onUserSelection($scope.currentSillaba.name);
                }, 500);

            }
        }

        function rightAnswer(element) {

            // indico che la sillaba è stata indovinata
            sillabaIndovinata = true;

            // evidenzia la sillaba premuta in verde in quanto risposta corretta
            element.addClass("bg-verde");

            // mostra nella carta grande la sillaba appena indovinata
            $scope.sillabaMostrata = $scope.currentSillaba.name;

            // se ho indovinato faccio sentire l'audio che dice "Bene!"
            if ($scope.erroriTurno < 3) {
                
                playAudioBene();
                var audioPlayerBene = getAudioPlayer('#audioBene');
                audioPlayerBene.onended = function () {
                    setTimeout(function () {
                        playAudio(audioPlayer);
                        audioPlayerBene.onended = function () { };
                    }, 100);
                };
                
                playAudio(audioPlayerBene);
            } 
        }

        function wrongAnswer(element) {
            var audioPlayerNo = getAudioPlayer('#audioNo');
            audioPlayerNo.onended = function () {
                setTimeout(function () {
                    playAudio(audioPlayer);
                    audioPlayerNo.onended = function () { };
                }, 100);
            };
            
            playAudio(audioPlayerNo);
            $scope.erroriTurno++;
            element.addClass("bg-rosso");
        }

        function clearSelection() {
            $scope.erroriTurno = 0;
            $scope.sillabaMostrata = '?';
            suonoAscoltato = false;
            sillabaIndovinata = false;
            angular.element('.bg-rosso').removeClass("bg-rosso");
            angular.element('.bg-verde').removeClass("bg-verde");
        }


        function setCurrentSillaba() {

            if (sillabeRandom.length == 0) {
                sillabeRandom = shuffle(JSON.parse(JSON.stringify($sillabe)));
            }
            $scope.currentSillaba = sillabeRandom.pop(0);

            audioPlayer.src = $scope.currentSillaba.audioSillaba;
            suonoAscoltato = false;

            // dopo 100ms si sente il suggerimento audio "Tocca la sillaba"
            audioPlayer.onended = function () {
                setTimeout(function () {
                    //playAudioToccaLaSillaba();
                    hintToccaLaSillaba();
                    audioPlayer.onended = function() {};
                }, 500);
            };
        }

    }
]);

myAppControllers.controller('GiocaParoleController', [
    '$scope', '$routeParams', '$http', '$timeout', 
    function ($scope, $routeParams, $http, $timeout) {

        //playAudioToccaIlBottone();
        hintToccaIlBottone();

        $('#carta').flip({ trigger: 'manual' });

        $scope.vocali = $vocali;
        $scope.consonanti = $consonanti;
        $scope.sillabe = $sillabe;
        $scope.combinazioni = creaGrigliaSillabe($consonanti, $vocali, $sillabe);

        $scope.imgFront = $IMG_LETTERA;
        $scope.imgBack = $IMG_LETTERA;
        $scope.sillabeMostrate = '____';
        $scope.sillabeIndovinate = 0;
        $scope.erroriTurno = 0;
        $scope.showBack = false;

        //$scope.imgSpeakerOnClick = function() {
        //     hintService.toggleStatus();
        //}
        

        var paroleRandom = [];
        var audioPlayer = getAudioPlayer();
        var suonoAscoltato = false;

        //setCurrentParola();
        //setSillabeMostrate();

        $scope.playSound = function () {

            if (!suonoAscoltato || haIndovinatoTutteLeSillabe()) {
                clearSelection();
                setCurrentParola();
                setSillabeMostrate();
                flipCard();
                $timeout(function () {

                    ascoltaParola();

                }, 700);
            } else {
                ascoltaParola();
            }
        }

        function ascoltaParola() {
            playAudio(audioPlayer);

            suonoAscoltato = true;
        }

        $scope.checkSelection = checkSelection;

        function checkSelection(sillabaName) {
            if (!suonoAscoltato || haIndovinatoTutteLeSillabe())
                return;

            var element = angular.element('#' + sillabaName);

            if ($scope.currentSillaba.compareIgnoreCase(sillabaName)) {
                rightAnswer(element);

                if (haIndovinatoTutteLeSillabe()) {
                    playAudioVittoria();
                    //setCurrentParola();
                }
            } else {
                wrongAnswer(element);

                // se ho già fatto 3 errori sulla sillaba allora suggerisco quella corretta
                if ($scope.erroriTurno >= 3) {
                    $timeout(function () {
                        checkSelection($scope.currentSillaba);
                    }, 500);
                }
            }
        }

        function haIndovinatoTutteLeSillabe() {
            return $scope.sillabeIndovinate == $scope.currentParola.sillabe.length;
        }

        function rightAnswer(element) {
            // se ho indovinato faccio sentire l'audio che dice "Bene!"
            // altrimenti se è il sistema a suggerirmi la soluzione faccio risentire l'audio della lettera
            if ($scope.erroriTurno < 3) {
                //playAudioBene();
                var audioPlayerBene = getAudioPlayer('#audioBene');
                audioPlayerBene.onended = function () {
                    setTimeout(function () {
                        playAudio(audioPlayer);
                        audioPlayerBene.onended = function () { };
                    }, 100);
                };
                playAudio(audioPlayerBene);
            }

            $scope.erroriTurno = 0;
            clearErrori();
            $scope.sillabeIndovinate++;
            if ($scope.sillabeIndovinate < $scope.currentParola.sillabe.length) {
                $scope.currentSillaba = $scope.currentParola.sillabe[$scope.sillabeIndovinate];
            }

            element.addClass("bg-verde");
            setSillabeMostrate();
        }

        function wrongAnswer(element) {
            //playAudioNo();
            element.addClass("bg-rosso");
            $scope.erroriTurno++;

            var audioPlayerNo = getAudioPlayer('#audioNo');
            audioPlayerNo.onended = function () {
                setTimeout(function () {
                    playAudio(audioPlayer);
                    audioPlayerNo.onended = function () { };
                }, 100);
            };
            playAudio(audioPlayerNo);
        }

        function clearSelection() {
            clearErrori();
            clearEsatte();
        }

        function clearErrori() {
            angular.element('.bg-rosso').removeClass("bg-rosso");
        }

        function clearEsatte() {
            angular.element('.bg-verde').removeClass("bg-verde");
        }

        function setCurrentParola() {
            // se l'elenco delle possibili parole con le quali giocare è vuoto lo ripopolo
            if (paroleRandom.length == 0) {
                paroleRandom = shuffle(JSON.parse(JSON.stringify($parole)));
            }
            $scope.currentParola = paroleRandom.pop(0);
            $scope.currentSillaba = $scope.currentParola.sillabe[0];

            setImmagine($scope.currentParola.imageUrl);
            audioPlayer.src = $scope.currentParola.audioParola;
            suonoAscoltato = false;
            $scope.erroriTurno = 0;
            $scope.sillabeIndovinate = 0;

            // dopo 100ms si sente il suggerimento audio "Tocca la sillaba"
            audioPlayer.onended = function () {
                setTimeout(function () {
                    //playAudioToccaLeSillabe();
                    hintToccaLeSillabe();
                    audioPlayer.onended = function () { };
                }, 500);
            };
        }


        function setImmagine(immagine) {
            if ($scope.showBack) {
                $scope.imgFront = immagine;
            } else {
                $scope.imgBack = immagine;
            }
        }

        function flipCard() {
            $scope.showBack = !$scope.showBack;
            $('#carta').flip($scope.showBack);
        }

        function setSillabeMostrate() {
            var aSillabe = $scope.currentParola.sillabe;
            var sillabeMostrate = '';
            var sillabeNascoste = '';

            if ($scope.sillabeIndovinate > 0) {
                sillabeMostrate = aSillabe.slice(0, $scope.sillabeIndovinate).join('');
            }
            sillabeNascoste = aSillabe.slice($scope.sillabeIndovinate, aSillabe.length).join('');
            sillabeNascoste = Array(sillabeNascoste.length + 1).join('_');

            $scope.sillabeMostrate = sillabeMostrate + sillabeNascoste;
        }

        function playAudioVittoria() {
            getAudioElementAndPlay('#audioVittoria');
        }
    }
]);