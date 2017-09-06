'use strict';

function jsonp_callback(data) {
    // returning from async callbacks is (generally) meaningless
    console.log(data.found);
}


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngTouch', 'myAppControllers'], function($provide) {
        // Prevent Angular from sniffing for the history API since it's not supported in packaged apps.
		// this prevents error "history.pushState is not available in packaged apps."
        $provide.decorator('$window', function($delegate) {
            //$delegate.history = null;
            Object.defineProperty($delegate, 'history', {get: () => null});
            return $delegate;
        });
    })
	.config( [
		'$compileProvider',
		function( $compileProvider ) {
			$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|mailto|chrome-extension):/);
			$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|blob|mailto|chrome-extension):/);
		}
	])
    .config([
        '$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', { templateUrl: 'assets/partials/homeView.html' });
            $routeProvider.when('/impara', { templateUrl: 'assets/partials/imparaView.html' });
            $routeProvider.when('/gioca', { templateUrl: 'assets/partials/giocaView.html' });
            $routeProvider.when('/demoVocali', { templateUrl: 'assets/partials/demoVocaliView.html' });
            $routeProvider.when('/scritturaVocali', { templateUrl: 'assets/partials/scritturaVocaliView.html' });
            $routeProvider.when('/letturaVocali', { templateUrl: 'assets/partials/letturaVocaliView.html' });
            $routeProvider.when('/demoConsonante/:name', { templateUrl: 'assets/partials/demoConsonanteView.html', controller: 'DemoConsonanteController' });
            $routeProvider.when('/demoSillabe/:name', { templateUrl: 'assets/partials/demoSillabeView.html' });
            $routeProvider.when('/costruzioneSillabe/:name', { templateUrl: 'assets/partials/costruzioneSillabeView.html' });
            $routeProvider.when('/scritturaSillabe/:name', { templateUrl: 'assets/partials/scritturaSillabeView.html', controller: 'ScritturaSillabeController' });
            $routeProvider.when('/letturaSillabe/:name', { templateUrl: 'assets/partials/letturaSillabeView.html', controller: 'LetturaSillabeController' });
            $routeProvider.when('/gioca/sillabe', { templateUrl: 'assets/partials/giocaSillabeView.html' });
            $routeProvider.when('/gioca/parole', { templateUrl: 'assets/partials/giocaParoleView.html' });
            $routeProvider.when('/leggi', { templateUrl: 'assets/partials/leggiView.html' });
            $routeProvider.when('/crediti', { templateUrl: 'assets/partials/creditiView.html' });
            $routeProvider.when('/versioni', { templateUrl: 'assets/partials/versioniView.html' });
            $routeProvider.otherwise({ redirectTo: '/' });
        }
    ])
;

//myApp.service('hintService', HintService);
//myApp.factory('hintService', [function () {
//    return new HintService();
//}]);


var $VISITEHOMEPAGE = 1;

var $IMG_LETTERA = 'assets/images/lettera.png';
var $IMG_LETTERA_CASO = 'assets/images/lettera-caso.png';
var $IMG_LETTERA_VUOTA = 'assets/images/lettera-vuota.png';

var $consonantiRiga1 = [
    { 'name': 'B', 'imageUrl': 'assets/images/lettere/b.png', 'audioUrl': 'assets/sounds/consonanti/b.mp3', 'audioConParola': 'assets/sounds/consonanti/b-banana-b-banana.mp3' },
    { 'name': 'D', 'imageUrl': 'assets/images/lettere/d.png', 'audioUrl': 'assets/sounds/consonanti/d.mp3', 'audioConParola': 'assets/sounds/consonanti/d-dottore-d-dottore.mp3' },
    { 'name': 'F', 'imageUrl': 'assets/images/lettere/f.png', 'audioUrl': 'assets/sounds/consonanti/f.mp3', 'audioConParola': 'assets/sounds/consonanti/f-foto-f-foto.mp3' },
    { 'name': 'L', 'imageUrl': 'assets/images/lettere/l.png', 'audioUrl': 'assets/sounds/consonanti/l.mp3', 'audioConParola': 'assets/sounds/consonanti/l-luna-l-luna.mp3' },
    { 'name': 'M', 'imageUrl': 'assets/images/lettere/m.png', 'audioUrl': 'assets/sounds/consonanti/m.mp3', 'audioConParola': 'assets/sounds/consonanti/m-mano-m-mano.mp3' },
    { 'name': 'N', 'imageUrl': 'assets/images/lettere/n.png', 'audioUrl': 'assets/sounds/consonanti/n.mp3', 'audioConParola': 'assets/sounds/consonanti/n-nave-n-nave.mp3' }
];

var $consonantiRiga2 = [
    { 'name': 'P', 'imageUrl': 'assets/images/lettere/p.png', 'audioUrl': 'assets/sounds/consonanti/p.mp3', 'audioConParola': 'assets/sounds/consonanti/p-penna-p-penna.mp3' },
    { 'name': 'R', 'imageUrl': 'assets/images/lettere/r.png', 'audioUrl': 'assets/sounds/consonanti/r.mp3', 'audioConParola': 'assets/sounds/consonanti/r-radio-r-radio.mp3' },
    { 'name': 'S', 'imageUrl': 'assets/images/lettere/s.png', 'audioUrl': 'assets/sounds/consonanti/s.mp3', 'audioConParola': 'assets/sounds/consonanti/s-sole-s-sole.mp3' },
    { 'name': 'T', 'imageUrl': 'assets/images/lettere/t.png', 'audioUrl': 'assets/sounds/consonanti/t.mp3', 'audioConParola': 'assets/sounds/consonanti/t-telefono-t-telefono.mp3' },
    { 'name': 'V', 'imageUrl': 'assets/images/lettere/v.png', 'audioUrl': 'assets/sounds/consonanti/v.mp3', 'audioConParola': 'assets/sounds/consonanti/v-vestito-v-vestito.mp3' },
    { 'name': 'Z', 'imageUrl': 'assets/images/lettere/z.png', 'audioUrl': 'assets/sounds/consonanti/z.mp3', 'audioConParola': 'assets/sounds/consonanti/z-zaino-z-zaino.mp3' }
];
var $consonantiRiga3 = [
    { 'name': 'CDURA', 'imageUrl': 'assets/images/lettere/c-dura.png', 'audioUrl': 'assets/sounds/consonanti/c-dura.mp3', 'audioConParola': 'assets/sounds/consonanti/c-casa-c-casa.mp3' },
    { 'name': 'CDOLCE', 'imageUrl': 'assets/images/lettere/c-dolce.png', 'audioUrl': 'assets/sounds/consonanti/c-dolce.mp3', 'audioConParola': 'assets/sounds/consonanti/c-cinema-c-cinema.mp3' },
    { 'name': 'GDURA', 'imageUrl': 'assets/images/lettere/g-dura.png', 'audioUrl': 'assets/sounds/consonanti/g-dura.mp3', 'audioConParola': 'assets/sounds/consonanti/g-gatto-g-gatto.mp3' },
    { 'name': 'GDOLCE', 'imageUrl': 'assets/images/lettere/g-dolce.png', 'audioUrl': 'assets/sounds/consonanti/g-dolce.mp3', 'audioConParola': 'assets/sounds/consonanti/g-gelato-g-gelato.mp3' },
    { 'name': 'Q', 'imageUrl': 'assets/images/lettere/q.png', 'audioUrl': 'assets/sounds/consonanti/q.mp3', 'audioConParola': 'assets/sounds/consonanti/q-quaderno-q-quaderno.mp3' }
];

var $vocali = [
    { 'name': 'A', 'imageUrl': 'assets/images/lettere/a.png', 'audioVocale': 'assets/sounds/vocali/a.mp3', 'audioConParola': 'assets/sounds/vocali/a-albero-a-albero.mp3' },
    { 'name': 'E', 'imageUrl': 'assets/images/lettere/e.png', 'audioVocale': 'assets/sounds/vocali/e.mp3', 'audioConParola': 'assets/sounds/vocali/e-euro-e-euro.mp3' },
    { 'name': 'I', 'imageUrl': 'assets/images/lettere/i.png', 'audioVocale': 'assets/sounds/vocali/i.mp3', 'audioConParola': 'assets/sounds/vocali/i-italia-i-italia.mp3' },
    { 'name': 'O', 'imageUrl': 'assets/images/lettere/o.png', 'audioVocale': 'assets/sounds/vocali/o.mp3', 'audioConParola': 'assets/sounds/vocali/o-orologio-o-orologio.mp3' },
    { 'name': 'U', 'imageUrl': 'assets/images/lettere/u.png', 'audioVocale': 'assets/sounds/vocali/u.mp3', 'audioConParola': 'assets/sounds/vocali/u-uva-u-uva.mp3' }
];

var $consonanti = $consonantiRiga1.concat($consonantiRiga2).concat($consonantiRiga3);


var $sillabe = [

    { 'group': 'B', 'vocale': 'A', 'name': 'BA', 's1': 'B', 's2': 'A', 'audioSillaba': 'assets/sounds/sillabe/ba.mp3', 'audioScandito': 'assets/sounds/sillabe/b-a-ba.mp3' },
    { 'group': 'B', 'vocale': 'E', 'name': 'BE', 's1': 'B', 's2': 'E', 'audioSillaba': 'assets/sounds/sillabe/be.mp3', 'audioScandito': 'assets/sounds/sillabe/b-e-be.mp3' },
    { 'group': 'B', 'vocale': 'I', 'name': 'BI', 's1': 'B', 's2': 'I', 'audioSillaba': 'assets/sounds/sillabe/bi.mp3', 'audioScandito': 'assets/sounds/sillabe/b-i-bi.mp3' },
    { 'group': 'B', 'vocale': 'O', 'name': 'BO', 's1': 'B', 's2': 'O', 'audioSillaba': 'assets/sounds/sillabe/bo.mp3', 'audioScandito': 'assets/sounds/sillabe/b-o-bo.mp3' },
    { 'group': 'B', 'vocale': 'U', 'name': 'BU', 's1': 'B', 's2': 'U', 'audioSillaba': 'assets/sounds/sillabe/bu.mp3', 'audioScandito': 'assets/sounds/sillabe/b-u-bu.mp3' },

    { 'group': 'CDURA', 'vocale': 'A', 'name': 'CA', 's1': 'C', 's2': 'A', 'audioSillaba': 'assets/sounds/sillabe/ca.mp3', 'audioScandito': 'assets/sounds/sillabe/ca.mp3' },
    { 'group': 'CDURA', 'vocale': 'E', 'name': 'CHE', 's1': 'C', 's2': 'HE', 'audioSillaba': 'assets/sounds/sillabe/che.mp3', 'audioScandito': 'assets/sounds/sillabe/che.mp3' },
    { 'group': 'CDURA', 'vocale': 'I', 'name': 'CHI', 's1': 'C', 's2': 'HI', 'audioSillaba': 'assets/sounds/sillabe/chi.mp3', 'audioScandito': 'assets/sounds/sillabe/chi.mp3' },
    { 'group': 'CDURA', 'vocale': 'O', 'name': 'CO', 's1': 'C', 's2': 'O', 'audioSillaba': 'assets/sounds/sillabe/co.mp3', 'audioScandito': 'assets/sounds/sillabe/co.mp3' },
    { 'group': 'CDURA', 'vocale': 'U', 'name': 'CU', 's1': 'C', 's2': 'U', 'audioSillaba': 'assets/sounds/sillabe/cu.mp3', 'audioScandito': 'assets/sounds/sillabe/cu.mp3' },

    { 'group': 'CDOLCE', 'vocale': 'A', 'name': 'CIA', 's1': 'C', 's2': 'IA', 'audioSillaba': 'assets/sounds/sillabe/cia.mp3', 'audioScandito': 'assets/sounds/sillabe/cia.mp3' },
    { 'group': 'CDOLCE', 'vocale': 'E', 'name': 'CE', 's1': 'C', 's2': 'E', 'audioSillaba': 'assets/sounds/sillabe/ce.mp3', 'audioScandito': 'assets/sounds/sillabe/ce.mp3' },
    { 'group': 'CDOLCE', 'vocale': 'I', 'name': 'CI', 's1': 'C', 's2': 'I', 'audioSillaba': 'assets/sounds/sillabe/ci.mp3', 'audioScandito': 'assets/sounds/sillabe/ci.mp3' },
    { 'group': 'CDOLCE', 'vocale': 'O', 'name': 'CIO', 's1': 'C', 's2': 'IO', 'audioSillaba': 'assets/sounds/sillabe/cio.mp3', 'audioScandito': 'assets/sounds/sillabe/cio.mp3' },
    { 'group': 'CDOLCE', 'vocale': 'U', 'name': 'CIU', 's1': 'C', 's2': 'IU', 'audioSillaba': 'assets/sounds/sillabe/ciu.mp3', 'audioScandito': 'assets/sounds/sillabe/ciu.mp3' },

    { 'group': 'D', 'vocale': 'A', 'name': 'DA', 's1': 'D', 's2': 'A', 'audioSillaba': 'assets/sounds/sillabe/da.mp3', 'audioScandito': 'assets/sounds/sillabe/d-a-da.mp3' },
    { 'group': 'D', 'vocale': 'E', 'name': 'DE', 's1': 'D', 's2': 'E', 'audioSillaba': 'assets/sounds/sillabe/de.mp3', 'audioScandito': 'assets/sounds/sillabe/d-e-de.mp3' },
    { 'group': 'D', 'vocale': 'I', 'name': 'DI', 's1': 'D', 's2': 'I', 'audioSillaba': 'assets/sounds/sillabe/di.mp3', 'audioScandito': 'assets/sounds/sillabe/d-i-di.mp3' },
    { 'group': 'D', 'vocale': 'O', 'name': 'DO', 's1': 'D', 's2': 'O', 'audioSillaba': 'assets/sounds/sillabe/do.mp3', 'audioScandito': 'assets/sounds/sillabe/d-o-do.mp3' },
    { 'group': 'D', 'vocale': 'U', 'name': 'DU', 's1': 'D', 's2': 'U', 'audioSillaba': 'assets/sounds/sillabe/du.mp3', 'audioScandito': 'assets/sounds/sillabe/d-u-du.mp3' },

    { 'group': 'F', 'vocale': 'A', 'name': 'FA', 's1': 'F', 's2': 'A', 'audioSillaba': 'assets/sounds/sillabe/fa.mp3', 'audioScandito': 'assets/sounds/sillabe/f-a-fa.mp3' },
    { 'group': 'F', 'vocale': 'E', 'name': 'FE', 's1': 'F', 's2': 'E', 'audioSillaba': 'assets/sounds/sillabe/fe.mp3', 'audioScandito': 'assets/sounds/sillabe/f-e-fe.mp3' },
    { 'group': 'F', 'vocale': 'I', 'name': 'FI', 's1': 'F', 's2': 'I', 'audioSillaba': 'assets/sounds/sillabe/fi.mp3', 'audioScandito': 'assets/sounds/sillabe/f-i-fi.mp3' },
    { 'group': 'F', 'vocale': 'O', 'name': 'FO', 's1': 'F', 's2': 'O', 'audioSillaba': 'assets/sounds/sillabe/fo.mp3', 'audioScandito': 'assets/sounds/sillabe/f-o-fo.mp3' },
    { 'group': 'F', 'vocale': 'U', 'name': 'FU', 's1': 'F', 's2': 'U', 'audioSillaba': 'assets/sounds/sillabe/fu.mp3', 'audioScandito': 'assets/sounds/sillabe/f-u-fu.mp3' },

    { 'group': 'GDURA', 'vocale': 'A', 'name': 'GA', 's1': 'G', 's2': 'A', 'audioSillaba': 'assets/sounds/sillabe/ga.mp3', 'audioScandito': 'assets/sounds/sillabe/ga.mp3' },
    { 'group': 'GDURA', 'vocale': 'E', 'name': 'GHE', 's1': 'G', 's2': 'HE', 'audioSillaba': 'assets/sounds/sillabe/ghe.mp3', 'audioScandito': 'assets/sounds/sillabe/ghe.mp3' },
    { 'group': 'GDURA', 'vocale': 'I', 'name': 'GHI', 's1': 'G', 's2': 'HI', 'audioSillaba': 'assets/sounds/sillabe/ghi.mp3', 'audioScandito': 'assets/sounds/sillabe/ghi.mp3' },
    { 'group': 'GDURA', 'vocale': 'O', 'name': 'GO', 's1': 'G', 's2': 'O', 'audioSillaba': 'assets/sounds/sillabe/go.mp3', 'audioScandito': 'assets/sounds/sillabe/go.mp3' },
    { 'group': 'GDURA', 'vocale': 'U', 'name': 'GU', 's1': 'G', 's2': 'U', 'audioSillaba': 'assets/sounds/sillabe/gu.mp3', 'audioScandito': 'assets/sounds/sillabe/gu.mp3' },

    { 'group': 'GDOLCE', 'vocale': 'A', 'name': 'GIA', 's1': 'G', 's2': 'IA', 'audioSillaba': 'assets/sounds/sillabe/gia.mp3', 'audioScandito': 'assets/sounds/sillabe/gia.mp3' },
    { 'group': 'GDOLCE', 'vocale': 'E', 'name': 'GE', 's1': 'G', 's2': 'E', 'audioSillaba': 'assets/sounds/sillabe/ge.mp3', 'audioScandito': 'assets/sounds/sillabe/ge.mp3' },
    { 'group': 'GDOLCE', 'vocale': 'I', 'name': 'GI', 's1': 'G', 's2': 'I', 'audioSillaba': 'assets/sounds/sillabe/gi.mp3', 'audioScandito': 'assets/sounds/sillabe/gi.mp3' },
    { 'group': 'GDOLCE', 'vocale': 'O', 'name': 'GIO', 's1': 'G', 's2': 'IO', 'audioSillaba': 'assets/sounds/sillabe/gio.mp3', 'audioScandito': 'assets/sounds/sillabe/gio.mp3' },
    { 'group': 'GDOLCE', 'vocale': 'U', 'name': 'GIU', 's1': 'G', 's2': 'IU', 'audioSillaba': 'assets/sounds/sillabe/giu.mp3', 'audioScandito': 'assets/sounds/sillabe/giu.mp3' },

    { 'group': 'L', 'vocale': 'A', 'name': 'LA', 's1': 'L', 's2': 'A', 'audioSillaba': 'assets/sounds/sillabe/la.mp3', 'audioScandito': 'assets/sounds/sillabe/l-a-la.mp3' },
    { 'group': 'L', 'vocale': 'E', 'name': 'LE', 's1': 'L', 's2': 'E', 'audioSillaba': 'assets/sounds/sillabe/le.mp3', 'audioScandito': 'assets/sounds/sillabe/l-e-le.mp3' },
    { 'group': 'L', 'vocale': 'I', 'name': 'LI', 's1': 'L', 's2': 'I', 'audioSillaba': 'assets/sounds/sillabe/li.mp3', 'audioScandito': 'assets/sounds/sillabe/l-i-li.mp3' },
    { 'group': 'L', 'vocale': 'O', 'name': 'LO', 's1': 'L', 's2': 'O', 'audioSillaba': 'assets/sounds/sillabe/lo.mp3', 'audioScandito': 'assets/sounds/sillabe/l-o-lo.mp3' },
    { 'group': 'L', 'vocale': 'U', 'name': 'LU', 's1': 'L', 's2': 'U', 'audioSillaba': 'assets/sounds/sillabe/lu.mp3', 'audioScandito': 'assets/sounds/sillabe/l-u-lu.mp3' },

    { 'group': 'M', 'vocale': 'A', 'name': 'MA', 's1': 'M', 's2': 'A', 'audioSillaba': 'assets/sounds/sillabe/ma.mp3', 'audioScandito': 'assets/sounds/sillabe/m-a-ma.mp3' },
    { 'group': 'M', 'vocale': 'E', 'name': 'ME', 's1': 'M', 's2': 'E', 'audioSillaba': 'assets/sounds/sillabe/me.mp3', 'audioScandito': 'assets/sounds/sillabe/m-e-me.mp3' },
    { 'group': 'M', 'vocale': 'I', 'name': 'MI', 's1': 'M', 's2': 'I', 'audioSillaba': 'assets/sounds/sillabe/mi.mp3', 'audioScandito': 'assets/sounds/sillabe/m-i-mi.mp3' },
    { 'group': 'M', 'vocale': 'O', 'name': 'MO', 's1': 'M', 's2': 'O', 'audioSillaba': 'assets/sounds/sillabe/mo.mp3', 'audioScandito': 'assets/sounds/sillabe/m-o-mo.mp3' },
    { 'group': 'M', 'vocale': 'U', 'name': 'MU', 's1': 'M', 's2': 'U', 'audioSillaba': 'assets/sounds/sillabe/mu.mp3', 'audioScandito': 'assets/sounds/sillabe/m-u-mu.mp3' },

    { 'group': 'N', 'vocale': 'A', 'name': 'NA', 's1': 'N', 's2': 'A', 'audioSillaba': 'assets/sounds/sillabe/na.mp3', 'audioScandito': 'assets/sounds/sillabe/n-a-na.mp3' },
    { 'group': 'N', 'vocale': 'E', 'name': 'NE', 's1': 'N', 's2': 'E', 'audioSillaba': 'assets/sounds/sillabe/ne.mp3', 'audioScandito': 'assets/sounds/sillabe/n-e-ne.mp3' },
    { 'group': 'N', 'vocale': 'I', 'name': 'NI', 's1': 'N', 's2': 'I', 'audioSillaba': 'assets/sounds/sillabe/ni.mp3', 'audioScandito': 'assets/sounds/sillabe/n-i-ni.mp3' },
    { 'group': 'N', 'vocale': 'O', 'name': 'NO', 's1': 'N', 's2': 'O', 'audioSillaba': 'assets/sounds/sillabe/no.mp3', 'audioScandito': 'assets/sounds/sillabe/n-o-no.mp3' },
    { 'group': 'N', 'vocale': 'U', 'name': 'NU', 's1': 'N', 's2': 'U', 'audioSillaba': 'assets/sounds/sillabe/nu.mp3', 'audioScandito': 'assets/sounds/sillabe/n-u-nu.mp3' },

    { 'group': 'P', 'vocale': 'A', 'name': 'PA', 's1': 'P', 's2': 'A', 'audioSillaba': 'assets/sounds/sillabe/pa.mp3', 'audioScandito': 'assets/sounds/sillabe/p-a-pa.mp3' },
    { 'group': 'P', 'vocale': 'E', 'name': 'PE', 's1': 'P', 's2': 'E', 'audioSillaba': 'assets/sounds/sillabe/pe.mp3', 'audioScandito': 'assets/sounds/sillabe/p-e-pe.mp3' },
    { 'group': 'P', 'vocale': 'I', 'name': 'PI', 's1': 'P', 's2': 'I', 'audioSillaba': 'assets/sounds/sillabe/pi.mp3', 'audioScandito': 'assets/sounds/sillabe/p-i-pi.mp3' },
    { 'group': 'P', 'vocale': 'O', 'name': 'PO', 's1': 'P', 's2': 'O', 'audioSillaba': 'assets/sounds/sillabe/po.mp3', 'audioScandito': 'assets/sounds/sillabe/p-o-po.mp3' },
    { 'group': 'P', 'vocale': 'U', 'name': 'PU', 's1': 'P', 's2': 'U', 'audioSillaba': 'assets/sounds/sillabe/pu.mp3', 'audioScandito': 'assets/sounds/sillabe/p-u-pu.mp3' },

    { 'group': 'Q', 'vocale': 'A', 'name': 'QUA', 's1': 'QU', 's2': 'A', 'audioSillaba': 'assets/sounds/sillabe/qua.mp3', 'audioScandito': 'assets/sounds/sillabe/qu-a-qua.mp3' },
    { 'group': 'Q', 'vocale': 'E', 'name': 'QUE', 's1': 'QU', 's2': 'E', 'audioSillaba': 'assets/sounds/sillabe/que.mp3', 'audioScandito': 'assets/sounds/sillabe/q-e-que.mp3' },
    { 'group': 'Q', 'vocale': 'I', 'name': 'QUI', 's1': 'QU', 's2': 'I', 'audioSillaba': 'assets/sounds/sillabe/qui.mp3', 'audioScandito': 'assets/sounds/sillabe/q-i-qui.mp3' },
    { 'group': 'Q', 'vocale': 'O', 'name': 'QUO', 's1': 'QU', 's2': 'O', 'audioSillaba': 'assets/sounds/sillabe/quo.mp3', 'audioScandito': 'assets/sounds/sillabe/q-o-quo.mp3' },

    { 'group': 'R', 'vocale': 'A', 'name': 'RA', 's1': 'R', 's2': 'A', 'audioSillaba': 'assets/sounds/sillabe/ra.mp3', 'audioScandito': 'assets/sounds/sillabe/r-a-ra.mp3' },
    { 'group': 'R', 'vocale': 'E', 'name': 'RE', 's1': 'R', 's2': 'E', 'audioSillaba': 'assets/sounds/sillabe/re.mp3', 'audioScandito': 'assets/sounds/sillabe/r-e-re.mp3' },
    { 'group': 'R', 'vocale': 'I', 'name': 'RI', 's1': 'R', 's2': 'I', 'audioSillaba': 'assets/sounds/sillabe/ri.mp3', 'audioScandito': 'assets/sounds/sillabe/r-i-ri.mp3' },
    { 'group': 'R', 'vocale': 'O', 'name': 'RO', 's1': 'R', 's2': 'O', 'audioSillaba': 'assets/sounds/sillabe/ro.mp3', 'audioScandito': 'assets/sounds/sillabe/r-o-ro.mp3' },
    { 'group': 'R', 'vocale': 'U', 'name': 'RU', 's1': 'R', 's2': 'U', 'audioSillaba': 'assets/sounds/sillabe/ru.mp3', 'audioScandito': 'assets/sounds/sillabe/r-u-ru.mp3' },

    { 'group': 'S', 'vocale': 'A', 'name': 'SA', 's1': 'S', 's2': 'A', 'audioSillaba': 'assets/sounds/sillabe/sa.mp3', 'audioScandito': 'assets/sounds/sillabe/s-a-sa.mp3' },
    { 'group': 'S', 'vocale': 'E', 'name': 'SE', 's1': 'S', 's2': 'E', 'audioSillaba': 'assets/sounds/sillabe/se.mp3', 'audioScandito': 'assets/sounds/sillabe/s-e-se.mp3' },
    { 'group': 'S', 'vocale': 'I', 'name': 'SI', 's1': 'S', 's2': 'I', 'audioSillaba': 'assets/sounds/sillabe/si.mp3', 'audioScandito': 'assets/sounds/sillabe/s-i-si.mp3' },
    { 'group': 'S', 'vocale': 'O', 'name': 'SO', 's1': 'S', 's2': 'O', 'audioSillaba': 'assets/sounds/sillabe/so.mp3', 'audioScandito': 'assets/sounds/sillabe/s-o-so.mp3' },
    { 'group': 'S', 'vocale': 'U', 'name': 'SU', 's1': 'S', 's2': 'U', 'audioSillaba': 'assets/sounds/sillabe/su.mp3', 'audioScandito': 'assets/sounds/sillabe/s-u-su.mp3' },

    { 'group': 'T', 'vocale': 'A', 'name': 'TA', 's1': 'T', 's2': 'A', 'audioSillaba': 'assets/sounds/sillabe/ta.mp3', 'audioScandito': 'assets/sounds/sillabe/t-a-ta.mp3' },
    { 'group': 'T', 'vocale': 'E', 'name': 'TE', 's1': 'T', 's2': 'E', 'audioSillaba': 'assets/sounds/sillabe/te.mp3', 'audioScandito': 'assets/sounds/sillabe/t-e-te.mp3' },
    { 'group': 'T', 'vocale': 'I', 'name': 'TI', 's1': 'T', 's2': 'I', 'audioSillaba': 'assets/sounds/sillabe/ti.mp3', 'audioScandito': 'assets/sounds/sillabe/t-i-ti.mp3' },
    { 'group': 'T', 'vocale': 'O', 'name': 'TO', 's1': 'T', 's2': 'O', 'audioSillaba': 'assets/sounds/sillabe/to.mp3', 'audioScandito': 'assets/sounds/sillabe/t-o-to.mp3' },
    { 'group': 'T', 'vocale': 'U', 'name': 'TU', 's1': 'T', 's2': 'U', 'audioSillaba': 'assets/sounds/sillabe/tu.mp3', 'audioScandito': 'assets/sounds/sillabe/t-u-tu.mp3' },

    { 'group': 'V', 'vocale': 'A', 'name': 'VA', 's1': 'V', 's2': 'A', 'audioSillaba': 'assets/sounds/sillabe/va.mp3', 'audioScandito': 'assets/sounds/sillabe/v-a-va.mp3' },
    { 'group': 'V', 'vocale': 'E', 'name': 'VE', 's1': 'V', 's2': 'E', 'audioSillaba': 'assets/sounds/sillabe/ve.mp3', 'audioScandito': 'assets/sounds/sillabe/v-e-ve.mp3' },
    { 'group': 'V', 'vocale': 'I', 'name': 'VI', 's1': 'V', 's2': 'I', 'audioSillaba': 'assets/sounds/sillabe/vi.mp3', 'audioScandito': 'assets/sounds/sillabe/v-i-vi.mp3' },
    { 'group': 'V', 'vocale': 'O', 'name': 'VO', 's1': 'V', 's2': 'O', 'audioSillaba': 'assets/sounds/sillabe/vo.mp3', 'audioScandito': 'assets/sounds/sillabe/v-o-vo.mp3' },
    { 'group': 'V', 'vocale': 'U', 'name': 'VU', 's1': 'V', 's2': 'U', 'audioSillaba': 'assets/sounds/sillabe/vu.mp3', 'audioScandito': 'assets/sounds/sillabe/v-u-vu.mp3' },

    { 'group': 'Z', 'vocale': 'A', 'name': 'ZA', 's1': 'Z', 's2': 'A', 'audioSillaba': 'assets/sounds/sillabe/za.mp3', 'audioScandito': 'assets/sounds/sillabe/z-a-za.mp3' },
    { 'group': 'Z', 'vocale': 'E', 'name': 'ZE', 's1': 'Z', 's2': 'E', 'audioSillaba': 'assets/sounds/sillabe/ze.mp3', 'audioScandito': 'assets/sounds/sillabe/z-e-ze.mp3' },
    { 'group': 'Z', 'vocale': 'I', 'name': 'ZI', 's1': 'Z', 's2': 'I', 'audioSillaba': 'assets/sounds/sillabe/zi.mp3', 'audioScandito': 'assets/sounds/sillabe/z-i-zi.mp3' },
    { 'group': 'Z', 'vocale': 'O', 'name': 'ZO', 's1': 'Z', 's2': 'O', 'audioSillaba': 'assets/sounds/sillabe/zo.mp3', 'audioScandito': 'assets/sounds/sillabe/z-o-zo.mp3' },
    { 'group': 'Z', 'vocale': 'U', 'name': 'ZU', 's1': 'Z', 's2': 'U', 'audioSillaba': 'assets/sounds/sillabe/zu.mp3', 'audioScandito': 'assets/sounds/sillabe/z-u-zu.mp3' }
];


var $parole = [
    { 'name': 'BACIO', 'sillabe': ['BA', 'CIO'], 'imageUrl': 'assets/images/parole/disegno-bacio.png', 'audioParola': 'assets/sounds/parole/bacio.mp3' },
    { 'name': 'BANANA', 'sillabe': ['BA', 'NA', 'NA'], 'imageUrl': 'assets/images/parole/disegno-banana.png', 'audioParola': 'assets/sounds/parole/banana.mp3' },
    { 'name': 'BENE', 'sillabe': ['BE', 'NE'], 'imageUrl': 'assets/images/parole/disegno-bene.png', 'audioParola': 'assets/sounds/parole/bene.mp3' },
    { 'name': 'BERE', 'sillabe': ['BE', 'RE'], 'imageUrl': 'assets/images/parole/disegno-bere.png', 'audioParola': 'assets/sounds/parole/bere.mp3' },
    { 'name': 'BICI', 'sillabe': ['BI', 'CI'], 'imageUrl': 'assets/images/parole/disegno-bici.png', 'audioParola': 'assets/sounds/parole/bici.mp3' },
    { 'name': 'BIRO', 'sillabe': ['BI', 'RO'], 'imageUrl': 'assets/images/parole/disegno-biro.png', 'audioParola': 'assets/sounds/parole/biro.mp3' },
    { 'name': 'CAMERA', 'sillabe': ['CA', 'ME', 'RA'], 'imageUrl': 'assets/images/parole/disegno-camera.png', 'audioParola': 'assets/sounds/parole/camera.mp3' },
    { 'name': 'CAMICIA', 'sillabe': ['CA', 'MI', 'CIA'], 'imageUrl': 'assets/images/parole/disegno-camicia.png', 'audioParola': 'assets/sounds/parole/camicia.mp3' },
    { 'name': 'CANE', 'sillabe': ['CA', 'NE'], 'imageUrl': 'assets/images/parole/disegno-cane.png', 'audioParola': 'assets/sounds/parole/cane.mp3' },
    { 'name': 'CAROTA', 'sillabe': ['CA', 'RO', 'TA'], 'imageUrl': 'assets/images/parole/disegno-carota.png', 'audioParola': 'assets/sounds/parole/carota.mp3' },
    { 'name': 'CASA', 'sillabe': ['CA', 'SA'], 'imageUrl': 'assets/images/parole/disegno-casa.png', 'audioParola': 'assets/sounds/parole/casa.mp3' },
    { 'name': 'CENA', 'sillabe': ['CE', 'NA'], 'imageUrl': 'assets/images/parole/disegno-cena.png', 'audioParola': 'assets/sounds/parole/cena.mp3' },
    { 'name': 'CHILO', 'sillabe': ['CHI', 'LO'], 'imageUrl': 'assets/images/parole/disegno-chilo.png', 'audioParola': 'assets/sounds/parole/chilo.mp3' },
    { 'name': 'CINEMA', 'sillabe': ['CI', 'NE', 'MA'], 'imageUrl': 'assets/images/parole/disegno-cinema.png', 'audioParola': 'assets/sounds/parole/cinema.mp3' },
    { 'name': 'CINESE', 'sillabe': ['CI', 'NE', 'SE'], 'imageUrl': 'assets/images/parole/disegno-cinese.png', 'audioParola': 'assets/sounds/parole/cinese.mp3' },
    { 'name': 'COLORI', 'sillabe': ['CO', 'LO', 'RI'], 'imageUrl': 'assets/images/parole/disegno-colori.png', 'audioParola': 'assets/sounds/parole/colori.mp3' },
    { 'name': 'COTONE', 'sillabe': ['CO', 'TO', 'NE'], 'imageUrl': 'assets/images/parole/disegno-cotone.png', 'audioParola': 'assets/sounds/parole/cotone.mp3' },
    { 'name': 'CUCINA', 'sillabe': ['CU', 'CI', 'NA'], 'imageUrl': 'assets/images/parole/disegno-cucina.png', 'audioParola': 'assets/sounds/parole/cucina.mp3' },
    { 'name': 'DATA', 'sillabe': ['DA', 'TA'], 'imageUrl': 'assets/images/parole/disegno-data.png', 'audioParola': 'assets/sounds/parole/data.mp3' },
    { 'name': 'DITO', 'sillabe': ['DI', 'TO'], 'imageUrl': 'assets/images/parole/disegno-dito.png', 'audioParola': 'assets/sounds/parole/dito.mp3' },
    { 'name': 'DIVANO', 'sillabe': ['DI', 'VA', 'NO'], 'imageUrl': 'assets/images/parole/disegno-divano.png', 'audioParola': 'assets/sounds/parole/divano.mp3' },
    { 'name': 'FAME', 'sillabe': ['FA', 'ME'], 'imageUrl': 'assets/images/parole/disegno-fame.png', 'audioParola': 'assets/sounds/parole/fame.mp3' },
    { 'name': 'FERITA', 'sillabe': ['FE', 'RI', 'TA'], 'imageUrl': 'assets/images/parole/disegno-ferita.png', 'audioParola': 'assets/sounds/parole/ferita.mp3' },
    { 'name': 'FILA', 'sillabe': ['FI', 'LA'], 'imageUrl': 'assets/images/parole/disegno-fila.png', 'audioParola': 'assets/sounds/parole/fila.mp3' },
    { 'name': 'FILO', 'sillabe': ['FI', 'LO'], 'imageUrl': 'assets/images/parole/disegno-filo.png', 'audioParola': 'assets/sounds/parole/filo.mp3' },
    { 'name': 'FOTO', 'sillabe': ['FO', 'TO'], 'imageUrl': 'assets/images/parole/disegno-foto.png', 'audioParola': 'assets/sounds/parole/foto.mp3' },
    { 'name': 'FUMO', 'sillabe': ['FU', 'MO'], 'imageUrl': 'assets/images/parole/disegno-fumo.png', 'audioParola': 'assets/sounds/parole/fumo.mp3' },
    { 'name': 'GELATO', 'sillabe': ['GE', 'LA', 'TO'], 'imageUrl': 'assets/images/parole/disegno-gelato.png', 'audioParola': 'assets/sounds/parole/gelato.mp3' },
    { 'name': 'GIOVANE', 'sillabe': ['GIO', 'VA', 'NE'], 'imageUrl': 'assets/images/parole/disegno-giovane.png', 'audioParola': 'assets/sounds/parole/giovane.mp3' },
    { 'name': 'GIRARE', 'sillabe': ['GI', 'RA', 'RE'], 'imageUrl': 'assets/images/parole/disegno-girare.png', 'audioParola': 'assets/sounds/parole/girare.mp3' },
    { 'name': 'GOLA', 'sillabe': ['GO', 'LA'], 'imageUrl': 'assets/images/parole/disegno-gola.png', 'audioParola': 'assets/sounds/parole/gola.mp3' },
    { 'name': 'GOMITO', 'sillabe': ['GO', 'MI', 'TO'], 'imageUrl': 'assets/images/parole/disegno-gomito.png', 'audioParola': 'assets/sounds/parole/gomito.mp3' },
    { 'name': 'LANA', 'sillabe': ['LA', 'NA'], 'imageUrl': 'assets/images/parole/disegno-lana.png', 'audioParola': 'assets/sounds/parole/lana.mp3' },
    { 'name': 'LAVARE', 'sillabe': ['LA', 'VA', 'RE'], 'imageUrl': 'assets/images/parole/disegno-lavare.png', 'audioParola': 'assets/sounds/parole/lavare.mp3' },
    { 'name': 'LAVORO', 'sillabe': ['LA', 'VO', 'RO'], 'imageUrl': 'assets/images/parole/disegno-lavoro.png', 'audioParola': 'assets/sounds/parole/lavoro.mp3' },
    { 'name': 'LIMONE', 'sillabe': ['LI', 'MO', 'NE'], 'imageUrl': 'assets/images/parole/disegno-limone.png', 'audioParola': 'assets/sounds/parole/limone.mp3' },
    { 'name': 'LIQUORE', 'sillabe': ['LI', 'QUO', 'RE'], 'imageUrl': 'assets/images/parole/disegno-liquore.png', 'audioParola': 'assets/sounds/parole/liquore.mp3' },
    { 'name': 'LUCE', 'sillabe': ['LU', 'CE'], 'imageUrl': 'assets/images/parole/disegno-luce.png', 'audioParola': 'assets/sounds/parole/luce.mp3' },
    { 'name': 'LUNA', 'sillabe': ['LU', 'NA'], 'imageUrl': 'assets/images/parole/disegno-luna.png', 'audioParola': 'assets/sounds/parole/luna.mp3' },
    { 'name': 'MALE', 'sillabe': ['MA', 'LE'], 'imageUrl': 'assets/images/parole/disegno-male.png', 'audioParola': 'assets/sounds/parole/male.mp3' },
    { 'name': 'MANO', 'sillabe': ['MA', 'NO'], 'imageUrl': 'assets/images/parole/disegno-mano.png', 'audioParola': 'assets/sounds/parole/mano.mp3' },
    { 'name': 'MARE', 'sillabe': ['MA', 'RE'], 'imageUrl': 'assets/images/parole/disegno-mare.png', 'audioParola': 'assets/sounds/parole/mare.mp3' },
    { 'name': 'MARITO', 'sillabe': ['MA', 'RI', 'TO'], 'imageUrl': 'assets/images/parole/disegno-marito.png', 'audioParola': 'assets/sounds/parole/marito.mp3' },
    { 'name': 'MATITA', 'sillabe': ['MA', 'TI', 'TA'], 'imageUrl': 'assets/images/parole/disegno-matita.png', 'audioParola': 'assets/sounds/parole/matita.mp3' },
    { 'name': 'MEDICINA', 'sillabe': ['ME', 'DI', 'CI', 'NA'], 'imageUrl': 'assets/images/parole/disegno-medicina.png', 'audioParola': 'assets/sounds/parole/medicina.mp3' },
    { 'name': 'MELA', 'sillabe': ['ME', 'LA'], 'imageUrl': 'assets/images/parole/disegno-mela.png', 'audioParola': 'assets/sounds/parole/mela.mp3' },
    { 'name': 'MODULO', 'sillabe': ['MO', 'DU', 'LO'], 'imageUrl': 'assets/images/parole/disegno-modulo.png', 'audioParola': 'assets/sounds/parole/modulo.mp3' },
    { 'name': 'MONETE', 'sillabe': ['MO', 'NE', 'TE'], 'imageUrl': 'assets/images/parole/disegno-monete.png', 'audioParola': 'assets/sounds/parole/monete.mp3' },
    { 'name': 'MOTO', 'sillabe': ['MO', 'TO'], 'imageUrl': 'assets/images/parole/disegno-moto.png', 'audioParola': 'assets/sounds/parole/moto.mp3' },
    { 'name': 'MOTORINO', 'sillabe': ['MO', 'TO', 'RI', 'NO'], 'imageUrl': 'assets/images/parole/disegno-motorino.png', 'audioParola': 'assets/sounds/parole/motorino.mp3' },
    { 'name': 'MURATORE', 'sillabe': ['MU', 'RA', 'TO', 'RE'], 'imageUrl': 'assets/images/parole/disegno-muratore.png', 'audioParola': 'assets/sounds/parole/muratore.mp3' },
    { 'name': 'MURO', 'sillabe': ['MU', 'RO'], 'imageUrl': 'assets/images/parole/disegno-muro.png', 'audioParola': 'assets/sounds/parole/muro.mp3' },
    { 'name': 'NASO', 'sillabe': ['NA', 'SO'], 'imageUrl': 'assets/images/parole/disegno-naso.png', 'audioParola': 'assets/sounds/parole/naso.mp3' },
    { 'name': 'NAVE', 'sillabe': ['NA', 'VE'], 'imageUrl': 'assets/images/parole/disegno-nave.png', 'audioParola': 'assets/sounds/parole/nave.mp3' },
    { 'name': 'NERO', 'sillabe': ['NE', 'RO'], 'imageUrl': 'assets/images/parole/disegno-nero.png', 'audioParola': 'assets/sounds/parole/nero.mp3' },
    { 'name': 'NEVE', 'sillabe': ['NE', 'VE'], 'imageUrl': 'assets/images/parole/disegno-neve.png', 'audioParola': 'assets/sounds/parole/neve.mp3' },
    { 'name': 'NODO', 'sillabe': ['NO', 'DO'], 'imageUrl': 'assets/images/parole/disegno-nodo.png', 'audioParola': 'assets/sounds/parole/nodo.mp3' },
    { 'name': 'NOVE', 'sillabe': ['NO', 'VE'], 'imageUrl': 'assets/images/parole/disegno-nove.png', 'audioParola': 'assets/sounds/parole/nove.mp3' },
    { 'name': 'NUMERI', 'sillabe': ['NU', 'ME', 'RI'], 'imageUrl': 'assets/images/parole/disegno-numeri.png', 'audioParola': 'assets/sounds/parole/numeri.mp3' },
    { 'name': 'NUVOLA', 'sillabe': ['NU', 'VO', 'LA'], 'imageUrl': 'assets/images/parole/disegno-nuvola.png', 'audioParola': 'assets/sounds/parole/nuvola.mp3' },
    { 'name': 'PAGARE', 'sillabe': ['PA', 'GA', 'RE'], 'imageUrl': 'assets/images/parole/disegno-pagare.png', 'audioParola': 'assets/sounds/parole/pagare.mp3' },
    { 'name': 'PALA', 'sillabe': ['PA', 'LA'], 'imageUrl': 'assets/images/parole/disegno-pala.png', 'audioParola': 'assets/sounds/parole/pala.mp3' },
    { 'name': 'PANE', 'sillabe': ['PA', 'NE'], 'imageUrl': 'assets/images/parole/disegno-pane.png', 'audioParola': 'assets/sounds/parole/pane.mp3' },
    { 'name': 'PANINO', 'sillabe': ['PA', 'NI', 'NO'], 'imageUrl': 'assets/images/parole/disegno-panino.png', 'audioParola': 'assets/sounds/parole/panino.mp3' },
    { 'name': 'PAPA', 'sillabe': ['PA', 'PA'], 'imageUrl': 'assets/images/parole/disegno-papa.png', 'audioParola': 'assets/sounds/parole/papa.mp3' },
    { 'name': 'PATATA', 'sillabe': ['PA', 'TA', 'TA'], 'imageUrl': 'assets/images/parole/disegno-patata.png', 'audioParola': 'assets/sounds/parole/patata.mp3' },
    { 'name': 'PERA', 'sillabe': ['PE', 'RA'], 'imageUrl': 'assets/images/parole/disegno-pera.png', 'audioParola': 'assets/sounds/parole/pera.mp3' },
    { 'name': 'PILA', 'sillabe': ['PI', 'LA'], 'imageUrl': 'assets/images/parole/disegno-pila.png', 'audioParola': 'assets/sounds/parole/pila.mp3' },
    { 'name': 'POMATA', 'sillabe': ['PO', 'MA', 'TA'], 'imageUrl': 'assets/images/parole/disegno-pomata.png', 'audioParola': 'assets/sounds/parole/pomata.mp3' },
    { 'name': 'POMODORO', 'sillabe': ['PO', 'MO', 'DO', 'RO'], 'imageUrl': 'assets/images/parole/disegno-pomodoro.png', 'audioParola': 'assets/sounds/parole/pomodoro.mp3' },
    { 'name': 'PULIRE', 'sillabe': ['PU', 'LI', 'RE'], 'imageUrl': 'assets/images/parole/disegno-pulire.png', 'audioParola': 'assets/sounds/parole/pulire.mp3' },
    { 'name': 'REGALO', 'sillabe': ['RE', 'GA', 'LO'], 'imageUrl': 'assets/images/parole/disegno-regalo.png', 'audioParola': 'assets/sounds/parole/regalo.mp3' },
    { 'name': 'REMO', 'sillabe': ['RE', 'MO'], 'imageUrl': 'assets/images/parole/disegno-remo.png', 'audioParola': 'assets/sounds/parole/remo.mp3' },
    { 'name': 'RIDERE', 'sillabe': ['RI', 'DE', 'RE'], 'imageUrl': 'assets/images/parole/disegno-ridere.png', 'audioParola': 'assets/sounds/parole/ridere.mp3' },
    { 'name': 'RIGHE', 'sillabe': ['RI', 'GHE'], 'imageUrl': 'assets/images/parole/disegno-righe.png', 'audioParola': 'assets/sounds/parole/righe.mp3' },
    { 'name': 'RISO', 'sillabe': ['RI', 'SO'], 'imageUrl': 'assets/images/parole/disegno-riso.png', 'audioParola': 'assets/sounds/parole/riso.mp3' },
    { 'name': 'ROMA', 'sillabe': ['RO', 'MA'], 'imageUrl': 'assets/images/parole/disegno-roma.png', 'audioParola': 'assets/sounds/parole/roma.mp3' },
    { 'name': 'ROSA', 'sillabe': ['RO', 'SA'], 'imageUrl': 'assets/images/parole/disegno-rosa.png', 'audioParola': 'assets/sounds/parole/rosa.mp3' },
    { 'name': 'RUBARE', 'sillabe': ['RU', 'BA', 'RE'], 'imageUrl': 'assets/images/parole/disegno-rubare.png', 'audioParola': 'assets/sounds/parole/rubare.mp3' },
    { 'name': 'SALAME', 'sillabe': ['SA', 'LA', 'ME'], 'imageUrl': 'assets/images/parole/disegno-salame.png', 'audioParola': 'assets/sounds/parole/salame.mp3' },
    { 'name': 'SALE', 'sillabe': ['SA', 'LE'], 'imageUrl': 'assets/images/parole/disegno-sale.png', 'audioParola': 'assets/sounds/parole/sale.mp3' },
    { 'name': 'SAPONE', 'sillabe': ['SA', 'PO', 'NE'], 'imageUrl': 'assets/images/parole/disegno-sapone.png', 'audioParola': 'assets/sounds/parole/sapone.mp3' },
    { 'name': 'SEMAFORO', 'sillabe': ['SE', 'MA', 'FO', 'RO'], 'imageUrl': 'assets/images/parole/disegno-semaforo.png', 'audioParola': 'assets/sounds/parole/semaforo.mp3' },
    { 'name': 'SERA', 'sillabe': ['SE', 'RA'], 'imageUrl': 'assets/images/parole/disegno-sera.png', 'audioParola': 'assets/sounds/parole/sera.mp3' },
    { 'name': 'SETE', 'sillabe': ['SE', 'TE'], 'imageUrl': 'assets/images/parole/disegno-sete.png', 'audioParola': 'assets/sounds/parole/sete.mp3' },
    { 'name': 'SOLE', 'sillabe': ['SO', 'LE'], 'imageUrl': 'assets/images/parole/disegno-sole.png', 'audioParola': 'assets/sounds/parole/sole.mp3' },
    { 'name': 'TAVOLO', 'sillabe': ['TA', 'VO', 'LO'], 'imageUrl': 'assets/images/parole/disegno-tavolo.png', 'audioParola': 'assets/sounds/parole/tavolo.mp3' },
    { 'name': 'TELEFONO', 'sillabe': ['TE', 'LE', 'FO', 'NO'], 'imageUrl': 'assets/images/parole/disegno-telefono.png', 'audioParola': 'assets/sounds/parole/telefono.mp3' },
    { 'name': 'TOPO', 'sillabe': ['TO', 'PO'], 'imageUrl': 'assets/images/parole/disegno-topo.png', 'audioParola': 'assets/sounds/parole/topo.mp3' },
    { 'name': 'TUBO', 'sillabe': ['TU', 'BO'], 'imageUrl': 'assets/images/parole/disegno-tubo.png', 'audioParola': 'assets/sounds/parole/tubo.mp3' },
    { 'name': 'VALIGIA', 'sillabe': ['VA', 'LI', 'GIA'], 'imageUrl': 'assets/images/parole/disegno-valigia.png', 'audioParola': 'assets/sounds/parole/valigia.mp3' },
    { 'name': 'VASO', 'sillabe': ['VA', 'SO'], 'imageUrl': 'assets/images/parole/disegno-vaso.png', 'audioParola': 'assets/sounds/parole/vaso.mp3' },
    { 'name': 'VELENO', 'sillabe': ['VE', 'LE', 'NO'], 'imageUrl': 'assets/images/parole/disegno-veleno.png', 'audioParola': 'assets/sounds/parole/veleno.mp3' },
    { 'name': 'VELO', 'sillabe': ['VE', 'LO'], 'imageUrl': 'assets/images/parole/disegno-velo.png', 'audioParola': 'assets/sounds/parole/velo.mp3' },
    { 'name': 'VINO', 'sillabe': ['VI', 'NO'], 'imageUrl': 'assets/images/parole/disegno-vino.png', 'audioParola': 'assets/sounds/parole/vino.mp3' },
    { 'name': 'VISO', 'sillabe': ['VI', 'SO'], 'imageUrl': 'assets/images/parole/disegno-viso.png', 'audioParola': 'assets/sounds/parole/viso.mp3' },
    { 'name': 'VITE', 'sillabe': ['VI', 'TE'], 'imageUrl': 'assets/images/parole/disegno-vite.png', 'audioParola': 'assets/sounds/parole/vite.mp3' },
    { 'name': 'VOTARE', 'sillabe': ['VO', 'TA', 'RE'], 'imageUrl': 'assets/images/parole/disegno-votare.png', 'audioParola': 'assets/sounds/parole/votare.mp3' },
    { 'name': 'ZERO', 'sillabe': ['ZE', 'RO'], 'imageUrl': 'assets/images/parole/disegno-zero.png', 'audioParola': 'assets/sounds/parole/zero.mp3' },
    { 'name': 'ZONA', 'sillabe': ['ZO', 'NA'], 'imageUrl': 'assets/images/parole/disegno-zona.png', 'audioParola': 'assets/sounds/parole/zona.mp3' }
];
