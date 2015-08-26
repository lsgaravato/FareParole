var soundMuted = false;

function imgSpeakerOnClick() {
    soundMuted = !soundMuted;
    $("#imgSpeaker").toggleClass('audioMuted');
}

//function HintService() {
//    var hintAudioMuted = false;

//    this.toggleStatus = function () {
//        hintAudioMuted = !hintAudioMuted;
//        $("#imgSpeaker").toggleClass('audioMuted');
//    }

//    this.isMuted = function() {
//        return hintAudioMuted;
//    }
//}

String.prototype.compareIgnoreCase = function(stringToCompare) {
    return this.toUpperCase() == stringToCompare.toUpperCase();
}

// Fisher-Yates shuffle algorithm
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



function setSoundToPlay(audioElem, audioUrl) {
    audioElem.src = audioUrl;
}

//function playAudio(audioElem) {
//    audioElem.load();
//    audioElem.play();
//}


function getAudioPlayer(selector) {
    if (!selector)
        selector = '';
    return $('audio' + selector)[0];
}

function playAudioBene() {
    getAudioElementAndPlay('#audioBene');
}

function playAudioNo() {
    getAudioElementAndPlay('#audioNo');
}

function playAudioLeggi() {
    getAudioElementAndPlay('#audioLeggi');
}

function playAudioTocca() {
    getAudioElementAndPlay('#audioTocca');
}

function playAudioToccaIlBottone() {
    getAudioElementAndPlay('#audioToccaIlBottone');
}

function playAudioToccaUnaLettera() {
    getAudioElementAndPlay('#audioToccaUnaLettera');
}

function playAudioToccaLaLettera() {
    getAudioElementAndPlay('#audioToccaLaLettera');
}

function playAudioToccaLeLettere() {
    getAudioElementAndPlay('#audioToccaLeLettere');
}

function playAudioToccaLaSillaba() {
    getAudioElementAndPlay('#audioToccaLaSillaba');
}

function playAudioToccaLeSillabe() {
    getAudioElementAndPlay('#audioToccaLeSillabe');
}

function getAudioElementAndPlay(audioElementId) {
    var audioElement = getAudioPlayer(audioElementId);
    return playAudio(audioElement);
}

function playAudio(audioElement) {

    if (audioElement == undefined)
        return;
    
    //if (isWebApp()) {
    //    audioElement.load();
    //    audioElement.play();
    //} else {
        playAudioPhoneGap(audioElement);
    //}
}

function playAudioPhoneGap(audioElement) {

    var src = audioElement.getAttribute('src');
    var url = getMediaURL(src);
    var myMedia = new Media('/android_asset/www/' + url, null, mediaError);
    // Play audio
    myMedia.play();
}

function playMP3() {
    var mp3URL = getMediaURL("assets/sounds/messaggi/applausi.mp3");
    var media = new Media(mp3URL, null, mediaError);
    media.play();
}

function getMediaURL(s) {
    if (device.platform.toLowerCase() === "android") return "/android_asset/www/" + s;
    alert('Trying to play: ' + s);
    return s;
}

function mediaError(e) {
    alert('Media Error');
    alert(JSON.stringify(e));
}


function isWebApp() {
    return document.URL.match(/^(https?|localhost|chrome-extension):/);
}


function getSillaba(nomeSillaba) {
    return $.grep($sillabe, function (element, index) {
        return element.name.toUpperCase() == nomeSillaba.toUpperCase();
    })[0];
}

function getSillabePerConsonante(nomeConsonante) {
    return $.grep($sillabe, function (element, index) {
        return element.group.toUpperCase() == nomeConsonante.toUpperCase();
    });
}

function getConsonante(nomeConsonante) {
    return $.grep($consonanti, function (element, index) {
        return element.name.toUpperCase() == nomeConsonante.toUpperCase();
    })[0];
}

function getVocale(nomeVocale) {
    return $.grep($vocali, function (element, index) {
        return element.name.toUpperCase() == nomeVocale.toUpperCase();
    })[0];
}

function isConsonanteComplessa(nomeConsonante) {

    return ['CDOLCE', 'CDURA', 'GDOLCE', 'GDURA'].indexOf(nomeConsonante.toUpperCase()) > 0;
}



function creaGrigliaSillabe(consonanti, vocali, sillabe) {
    var combinazioni = [];

    for (var i = 0; i < consonanti.length; i++) {
        // sillabe relative alla consonante corrente
        var sillabeFiltrate = $.grep(sillabe, function (element, index) {
            return element.group == consonanti[i].name;
        });

        var combinazione = { 'intestazione': '', sillabe: [] };

        if (sillabeFiltrate.length > 0) {
            combinazione.intestazione = sillabeFiltrate[0].s1;
            for (var j = 0; j < vocali.length; j++) {
                var sillabePerVocale = $.grep(sillabeFiltrate, function (element, index) {
                    return element.vocale == vocali[j].name;
                });
                var sillabaVocale = (sillabePerVocale.length > 0) ? sillabePerVocale[0].name : '-';
                combinazione.sillabe.push(sillabaVocale);
            }
            combinazioni.push(combinazione);
        } else {
            combinazione.intestazione = consonanti[i].name;
            for (var k = 0; k < vocali.length; k++) {
                combinazione.sillabe.push('-');
            }
            combinazioni.push(combinazione);
        }
    }

    return combinazioni;
}





function showToccaIlBottone() {
    $(".imgToccaBottone").show();
}

function hideToccaIlBottone() {
    $(".imgToccaBottone").hide();
}

function showToccaCarte() {
    $(".imgToccaCarte").show();
}

function hideToccaCarte() {
    $(".imgToccaCarte").hide();
}


function hintToccaIlBottone() {
    if (!soundMuted) {
        playAudioToccaIlBottone();
    }
    setTimeout(showToccaIlBottone, 200);
    setTimeout(hideToccaIlBottone, 3500);
}

function hintToccaUnaLettera() {
    if (!soundMuted) {
        playAudioToccaUnaLettera();
    }
    setTimeout(showToccaCarte, 200);
    setTimeout(hideToccaCarte, 5000);
}

function hintToccaLaLettera() {
    if (!soundMuted) {
        playAudioToccaLaLettera();
    }
    setTimeout(showToccaCarte, 200);
    setTimeout(hideToccaCarte, 5000);
}

function hintToccaLeLettere() {
    if (!soundMuted) {
        playAudioToccaLeLettere();
    }
    setTimeout(showToccaCarte, 200);
    setTimeout(hideToccaCarte, 5000);
}

function hintToccaLaSillaba() {
    if (!soundMuted) {
        playAudioToccaLaSillaba();
    }
    setTimeout(showToccaCarte, 200);
    setTimeout(hideToccaCarte, 4000);
}

function hintToccaLeSillabe() {
    if (!soundMuted) {
        playAudioToccaLeSillabe();
    }
    setTimeout(showToccaCarte, 200);
    setTimeout(hideToccaCarte, 4000);
}