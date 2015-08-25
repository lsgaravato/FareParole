/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },

    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('load', this.onLoad, false);
        document.addEventListener('deviceready', this.onDeviceReady, false);
        //window.addEventListener("orientationchange", orientationChange, true);
    },
    onLoad: function () {

    },

    // deviceready Event Handler
    onDeviceReady: function () {
        /*angular.element(document).ready(function() {
            angular.bootstrap(document);
        });*/

        // test
        var myMedia = new Media('/android_asset/www/assets/sounds/messaggi/bene.mp3',
                // success callback
                 function () { /* do nothing */ },
                // error callback
                 function (err) { console.log('Non ha funzionato mica tanto bene [MP3]'); }
        );
        // Play audio
        myMedia.play();


        var myMedia2 = new Media('/android_asset/www/assets/sounds/test.ogg',
                // success callback
                 function () { /* do nothing */ },
                // error callback
                 function (err) { console.log('Non ha funzionato mica tanto bene [OGG]'); }
        );
        // Play audio
        myMedia2.play();
    }
};


$(document).ready(function() {
	app.initialize();
	$('#imgSpeaker').click(imgSpeakerOnClick);
});
