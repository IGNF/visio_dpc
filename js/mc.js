/*
 * 
 * Copyright (c) 2012-2015 Wolfram Schneider, http://bbbike.org
 * Copyright (c) 2011 Geofabrik GmbH, http://geofabrik.de
 *
 * BSD 2-clause license ("Simplified BSD License" or "FreeBSD License")
 * see ./COPYRIGHT.txt
 *
 */

/* run JavaScript code in strict mode, HTML5 */
"use strict";

var mc = {
	
    // Positionnement sur Menou par défaut
    pos: {
        "lng": 3.27991,
        "lat": 47.36643,
        "zoom": 13
    },

    // debug
    debug: 1,

    // 0: none, 1: one line, 2: all message
    // number of maps, by default 2 maps are displayed in a table
    // up to 8 are supported
    NumberOfMaps:4,

    // if set to zero, display all maps
    NumberOfMapsMax: 6,
    // always show N maps links
    NumberOfMapsLinks: 10,
    // open a 3rd row for more than N maps
    row3: 10,
    // open a 4rd row for more than N maps
    row4: 21,
    // open a 5rd row for more than N maps
    row5: 32,

    // Que des layers IGN par défaut
    mt: ['ign-plan', 'ign-scexclassic', 'ign-scexstandard', 'ign-franceraster', 'ign-cartes'],

    // preferences expire after N days
    preferences_expire: 180,

    // map sorting options
    sort: {
        name: 1,
        // by map name
        type: 0,
        // by map type
        bbbike: 0,
        // 0: none, 1: bbbike first
        osm: 0 // 0: none, 1: osm first/second
    },

    sort_overlay: {
        name: 1,
        opacity: 1
    },

    // with social links in footer
    social: false,

    // display mapname on map in full screen mode
    mapname_fullscreen: true,

    // responsive design
    responsive: {
        enabled: true,
        NumberOfMaps: 2,
        maxHeight: 690
    },

    // transparent overlay maps
    overlay: {
        enabled: true,
        type: "slider",
        /* select | slider */

        value: 70,
        /* in percent */
        select_step: 10,
        slider_step: 5,

        // pre-selected overlay
        mt_overlay: ['none']
    },

    //TODO : BRANCHER LA RECHERCHE SUR LE GEOPORTAIL
    search: {
        type: 'nominatim',
        max_zoom: 16,
        show_marker: true,
        viewbox: true,
        limit: 25,
        marker_permalink: true,
        user_agent: "mc.bbbike.org",
        paging: 5
    },

    numZoomLevels: 19
};


/**
 * configure profiles
 * can be used as short URLs: /mc/?profile=nokia
 */
var profile = {
    /*here: {
        mt: ['nokia-map', 'nokia-satellite', 'nokia-hybrid', 'nokia-terrain', 'nokia-public_transit', 'nokia-traffic']
    },
    google: {
        mt: ['google-map', 'google-map-mapmaker', 'google-physical', 'google-bicycle-map', 'google-satellite', 'google-hybrid', 'google-hybrid-mapmaker', 'google-weather-sat', 'google-traffic-map', 'google-transit-map', 'google-layers-physical', 'google-panoramio-physical']
    },
    satellite: {
        mt: ['google-satellite', 'bing-satellite', 'mapquest-satellite', 'nokia-satellite', 'mapbox-satellite', 'yandex-satellite']
    },
    mapnik: {
        mt: ['mapnik', 'mapnik-german', 'osm-no-labels', 'mapnik-bw']
    },
    transit: {
        mt: ['transport', 'nokia-public_transit', 'google-transit-map', 'public_transport', 'public_transport_lines', 'openrailwaymap-standard', 'openrailwaymap-maxspeed']
    },
    bing: {
        mt: ['bing-map', 'bing-satellite', 'bing-hybrid']
    },
    osm: {
        mt: ['mapnik', 'mapnik-german', 'mapnik-bw', 'toner', 'watercolor', 'cyclemap', 'osm-no-labels', 'transport', 'public_transport', 'hike_bike', 'wanderreitkarte', 'mapquest-eu', 'skobbler']
    },
    cycle: {
        mt: ['bbbike-german', 'bbbike-smoothness', 'cyclemap', 'adfc-radwege', 'hike_bike']
    },
    bbbike: {
        mt: ['bbbike', 'bbbike-german', 'bbbike-bbbike', 'bbbike-smoothness', 'bbbike-handicap', 'bbbike-cycle-routes', 'bbbike-cycleway', 'bbbike-green', 'bbbike-unlit', 'bbbike-unknown'],
        // 'google-map', 'hike_bike'],
    },
    topo: {
        mt: ['google-physical', 'google-layers-physical', 'esri-topo', 'esri', 'nokia-terrain', 'cyclemap', 'landscape', 'wanderreitkarte', 'maptoolkit-topo', 'opentopomap', 'landshaded', 'komoot', 'opensnowmap', 'mapbox-terrain'] // 'soviet-military',
    },
    berlin: {
        mt: ['bbbike-german', 'bbbike-smoothness', 'google-map', 'bvg', 'transport', 'nokia-public_transit']
    },
    openmapsurfer: {
        mt: ['osm-roads', 'osm-roads-greyscale', 'osm-semitransparent', 'aster-gdem-srtm-hillshade', 'aster-gdem-contour-lines', 'osm-administrative-boundaries']
    },
    esri: {
        mt: ['esri', 'esri-topo', 'esri-gray', 'esri-satellite', 'esri-physical', 'esri-shaded-relief', 'esri-terrain-base', 'esri-boundaries-places', 'esri-reference-overlay', 'esri-transportation']
    },
    boundaries: {
        mt: ['osm-administrative-boundaries', 'esri-boundaries-places']
    },
    falk: {
        mt: ['falk-osm', 'falk-base']
    },
    mapbox: {
        mt: ['mapbox-satellite', 'mapbox-transportation', 'mapbox-terrain', 'comic-sans', 'mapbox-runkeepers']
    },
    geofabrik: {
        mt: ['geofabrik-standard', 'geofabrik-german', 'geofabrik-topo']
    },
    ito: {
        mt: ['max-speed', 'ito-lit', 'ito-surface']
    },
    retina: {
        mt: ['lyrk-retina', 'mapbox-transportation', 'mapbox-terrain', 'openrailwaymap-standard', 'toner-retina']
    },
    waymarkedtrails: {
        mt: ['waymarkedtrails-hiking', 'waymarkedtrails-cycling', 'waymarkedtrails-mtb', 'waymarkedtrails-skating']
    },
    mapquest: {
        mt: ['mapquest-eu', 'mapquest-labels', 'mapquest-satellite', ]
    },
    russian: {
        mt: ['sputnik-map', 'yandex-map', 'yandex-satellite', 'yandex-hybrid']
    },
    bw: {
        mt: ['toner-retina', 'toner', 'osm-roads-greyscale', 'mapnik-bw']
    },
    commercial: {
        mt: ['google-map', 'bing-map', 'nokia-map', 'skobbler', 'esri', 'mapquest-eu']
    }*/

    //TODO : Définir le contenu des visionneuses
    carto: {
        mt: ['ign-test']
    }
};

// MapCompare admin console /console.html
var mc_console = {
    maxTileServer: 3,

    // enable/disable configuration section
    pref_numberOfMaps: true,
    pref_centerOfMaps: true,
    pref_tileserver: true,
    pref_orderOfMaps: true,

    // cookie names
    cookie: {
        "tileserver": "mc_tileserver_",
        "numberOfMaps": "mc_number_of_maps",
        "orderOfMaps": "mc_order_of_maps",
        "centerOfMaps": "mc_center_of_maps",
        "check": "mc_cookie_check"
    }
};


// global variables shared by functions
var state = {
    non_map_tags: ["tools-top", "tools-titlebar", "bottom", "m0", "m1", "m2", "debug"],
    // hide in full screen mode
    fullscreen: false,
    fullscreen_type: 1,

    console: false,
    // in console mode
    percent: mc.overlay.value,

    layertypes: [],
    over_layertypes: [],
    layertypes_hash: {},
    over_layertypes_hash: {},
    maps: [],
    layers: [],
    over_layers: [],
    over_layers_obj: [],
    markersLayer: [],
    marker: [],
    moving: false,
    movestarted: false,
    proj4326: false,

    nonBaseLayer: [],
    marker_message: "",
    zoom: 0,

    control: {},
    // ref to controls
    // 
    _ie: false // IE bugs
};

// only "map" variable keeps global
var map;

/*
   main
*/
$(document).ready(function () {
    // hide spinning wheel after all JS libs are loaded
    $('#tools-pageload').hide();

    return mc.console ? initConsole() : initMapCompare();
});


function initMapCompare() {
	
    initResponsiveDesign();
    
    initSocial();

    OpenLayers.Util.onImageLoadError = function () {
        this.src = 'img/404.png';
    }

    var mt = mc.mt;
    var mt_overlay = mc.overlay.mt_overlay;

    var proj4326 = new OpenLayers.Projection('EPSG:4326');
    state.proj4326 = proj4326;

    var projmerc = new OpenLayers.Projection('EPSG:900913');

    // var NumberOfMaps = mc.NumberOfMaps;
    var NumberOfMaps = getNumberOfMaps();

    var pos = getMapCenter();
    var lon = pos.lng;
    var lat = pos.lat;
    var zoom = pos.zoom;

    var x = null;
    var y = null;
    var marker = "";

    // parse arguments from hash tag in URL, e.g. #map=18/52.58592/13.36120
    parseHashtag(function (obj) {
        if (obj) {
            lat = obj.lat;
            lon = obj.lng;
            zoom = obj.zoom;
        }
    });

    parseParams(function (param, v) {
        var obj;

        switch (param) {

        case 'type':
            mt[0] = v;
            break;
        case 'mt0':
            mt[0] = v;
            break;
        case 'mt1':
            mt[1] = v;
            break;
        case 'mt2':
            mt[2] = v;
            break;
        case 'mt3':
            mt[3] = v;
            break;
        case 'mt4':
            mt[4] = v;
            break;
        case 'mt5':
            mt[5] = v;
            break;
        case 'mt6':
            mt[6] = v;
            break;
        case 'mt7':
            mt[7] = v;
            break;
        case 'mt8':
            mt[8] = v;
            break;
        case 'mt9':
            mt[9] = v;
            break;
        case 'mt10':
            mt[10] = v;
            break;
        case 'mt11':
            mt[11] = v;
            break;
        case 'mt12':
            mt[12] = v;
            break;
        case 'mt13':
            mt[13] = v;
            break;
        case 'mt14':
            mt[14] = v;
            break;

            // overlay maps
        case 'mt-1':
            mt_overlay[0] = v;
            break;
        case 'mt-1p':
            state.percent = v;
            break;

        case 'lon':
        case 'mlon':
            lon = Number(v);
            break;

        case 'lat':
        case 'mlat':
            lat = Number(v);
            break;

            /* old google maps: ll=lat,lon */
        case 'll':
            obj = getMapCenter('@' + v + ',15z'); // new google URL style
            lat = obj.lat;
            lon = obj.lng;
            break;

        case 'profile':
            if (profile[v]) {
                NumberOfMaps = profile[v].NumberOfMaps ? profile[v].NumberOfMaps : profile[v].mt.length;
                debug("Use profile " + v + ", with " + NumberOfMaps + " maps");
                mc.mt = profile[v].mt;
            }
            break;

        case 'url':
            pos = tile2lnglat(v);
            if (pos) {
                lon = pos.lng;
                lat = pos.lat;
                zoom = pos.zoom;
            } else {
                debug("cannot decode url parameter");
            }
            break;

        case 'zoom':
        case 'z':
            zoom = parseInt(v);
            break;

        case 'x':
            x = parseInt(v);
            break;
        case 'y':
            y = parseInt(v);
            break;

        case 'num':
        case 'number':
            NumberOfMaps = parseInt(v);
            break;

        case 'debug':
            mc.debug = parseInt(v) || 0;
            break;

        case 'fullscreen':
            if (parseInt(v) > 0) setTimeout(function () {
                toggleFullScreen(parseInt(v));
            }, 300);
            break;

        case 'marker':
            marker = decodeURIComponent(v);
            break;

        }
    });

    initKeyPress();
    //TODO : Ca sert a quoi ca ? 
    //initYandex();
    initToolserver();
    initLayerTypes();
    initLayerTypesUserDefined();
    valide_profile();

    var layertypes = state.layertypes;

    if (NumberOfMaps > layertypes.length) NumberOfMaps = layertypes.length;
    if (mc.NumberOfMapsMax > layertypes.length || !mc.NumberOfMapsMax) mc.NumberOfMapsMax = layertypes.length;
    if (!NumberOfMaps || NumberOfMaps < 1 || NumberOfMaps > mc.NumberOfMapsMax) NumberOfMaps = 2;

    mc.NumberOfMaps = NumberOfMaps;
    MapOrderHtml(NumberOfMaps);

    $(window).resize(function () {
        setMapHeight(NumberOfMaps);
        if ($("div#search-results").length > 0) {
            set_search_width();
        }
    });

    pos = createMapPosition(lon, lat, x, y, zoom);

    // OpenLayers.ImgPath = OpenLayers._getScriptLocation() + '../../img/theme/geofabrik/img/';
    OpenLayers.ImgPath = 'img/theme/geofabrik/img/';

    initColumnWidth(NumberOfMaps);
    var mapnames = sortMapLayersSelected(mc.mt);

    for (var n = 0; n < NumberOfMaps; n++) {
        // selected map type in menu
        var mapname = mapnames[n];

        initColumn(n);
        initSelectOptions(n, mapname);

        var _map = new OpenLayers.Map('map' + n, {
            theme: null,
            numZoomLevels: mc.numZoomLevels,
            controls: [],
            projection: projmerc,
            displayProjection: state.proj4326
        });

        _map.addControl(new OpenLayers.Control.Navigation());
        _map.addControl(new OpenLayers.Control.MousePosition({
            // prefix: "longitude, latitude : ",
            separator: ", ",
            div: $('#customMousePosition').get(0)
        }));
 

        // controls for first map top left
        if (n == 0) {
        	//TODO: ZOOMBAR A DESACTIVER OU NON
            _map.addControl(new OpenLayers.Control.Zoom());
            _map.addControl(new OpenLayers.Control.ScaleLine({
                geodesic: true
            }));
            state.control.keyboard = new OpenLayers.Control.KeyboardDefaults();
            _map.addControl(state.control.keyboard);
        }

        state.maps[n] = _map;
        newLayer(n, mapname);


        setStartPos(n, pos.getLonLat(), pos.zoom);
        initMarker(n);

        _map.events.register('movestart', n, moveStart);
        _map.events.register('moveend', n, moveEnd);
        _map.events.register('mousemove', n, mouseMove);
        _map.events.register('mouseover', n, mouseOver);
        _map.events.register('mouseout', n, mouseOut);

        // move mapname on top of map
        if (mc.mapname_fullscreen) {
            $(_map.viewPortDiv).append($("div#mapname" + n));
        }
    }

    // hide the second column if only one map should be displayed
    if (NumberOfMaps == 1) {
        initColumn(1, "none");
    }

    map = state.maps[0];

    // overlay
    initSelectOptionsOverlay(-1, mt_overlay[0]);
    if (mc.overlay.type == "select") {
        initSelectOptionsTransparent(-2, state.percent);
    } else {
        initSliderTransparent();
    }

    // $('#customMousePosition').hide();
    updatePermalink();
    updateNumberOfMapsLink(mc.NumberOfMapsMax, NumberOfMaps, mc.NumberOfMapsLinks);

    // paranoid
    $(window).load(function () {
        debug("window.load done");
        setMapHeight(NumberOfMaps);
    });

    if (lon && lat && marker) {
        set_popup({
            lon: lon,
            lat: lat,
            message: marker
        });
        state.marker_message = marker;
    }

    state.zoom = zoom;
}

function initResponsiveDesign() {
    if (mc.responsive.enabled) {
        // $('head').append('<link rel="stylesheet" href="css/mobile.css" type="text/css" />')
    }
}

function parseHashtag(handler) {
    var url = location.href;
    var obj;

    // OpenStreetMap: #map=18/52.58592/13.36120
    if (url.indexOf("#map=") != -1) {
        obj = getMapCenter(url.substring(url.indexOf("#map=")));
    }

    // Google Maps (admin console): @52.375326,13.2926094,13z
    else if (url.indexOf("@") != -1) {
        obj = getMapCenter(url.substring(url.indexOf("@")));
    }

    // need a hash tag before @, because this is a static page!
    else if (url.indexOf("#@") != -1) {
        obj = getMapCenter(url.substring(url.indexOf("#@") + 1));
    }

    // tools.geofabrik.de: #18/52.58592/13.36120 => 13.36120,52.58592,18
    else if (url.indexOf("#") != -1) {
        obj = getMapCenter(url.substring(url.indexOf("#")));
    }


    handler(obj);
}

/*
  here are dragons!
  code copied from js/OpenLayers-2.11/OpenLayers.js: OpenLayers.Control.KeyboardDefaults

  see also: http://www.mediaevent.de/javascript/Extras-Javascript-Keycodes.html
*/
function initKeyPress() {
    // move all maps left/right/top/down

    function moveMap(direction, option) {
        for (var i = 0; i < state.maps.length; i++) {
            // google maps don't support animate flag
            var animate = state.layers[i].type.match(/^google-/) ? false : true;
            debug(state.layers[i].type + " " + animate);

            // state.layers[i].layers[1].pan(direction, option, { animate: animate });
            state.maps[i].pan(direction, option, {
                animate: animate
            });
        }
    };

    OpenLayers.Control.KeyboardDefaults.prototype.defaultKeyPress = function (evt) {
        debug("key press: " + evt.keyCode);

        switch (evt.keyCode) {

            // move the map left/right/top/bottom
        case OpenLayers.Event.KEY_LEFT:
        case 72:
            moveMap(-this.slideFactor, 0);
            break;
        case OpenLayers.Event.KEY_RIGHT:
        case 76:
            moveMap(this.slideFactor, 0);
            break;
        case OpenLayers.Event.KEY_UP:
        case 75:
            moveMap(0, -this.slideFactor);
            break;
        case OpenLayers.Event.KEY_DOWN:
        case 74:
            moveMap(0, this.slideFactor);
            break;

        case 33:
            var size = map.getSize();
            map.pan(0, -0.75 * size.h);
            break;
        case 34:
            var size = map.getSize();
            map.pan(0, 0.75 * size.h);
            break;
        case 35:
            var size = map.getSize();
            map.pan(0.75 * size.w, 0);
            break;
        case 36:
            var size = map.getSize();
            map.pan(-0.75 * size.w, 0);
            break;

            // '+', '=''
        case 43:
        case 61:
        case 187:
        case 107:
        case 171:
            // Firefox 15.x
            map.zoomIn();
            break;

            // '-'
        case 45:
        case 109:
        case 189:
        case 95:
        case 173:
            // Firefox 15.x or later, see https://github.com/openlayers/openlayers/issues/605
            map.zoomOut();
            break;

            // Map Compare
        case 70:
            // f
        case 27:
            // ESC
            // 'f': toggle fullscreen, without map name if shift or ctrl are pressed
            // are active (e.g. to switch to fullscreen browser window)
            if (evt.shiftKey || evt.altKey) {
                toggleFullScreen(2);
            } else if (evt.ctrlKey) {
                toggleFullScreen(3);
            } else {
                toggleFullScreen(1);
            }
            break;

        case 71:
            // 'g'
            locateMe();
            break;

        case 48:
            // '0' max zoom in
            for (var i = 0; i < 17; i++) {
                if (map.getZoom() < i) map.zoomIn();
            }
            break;

            // number of maps: 1..9
        case 49:
            window.location.href = getPermalink(1);
            break;
        case 50:
            window.location.href = getPermalink(2);
            break;
        case 51:
            window.location.href = getPermalink(3);
            break;
        case 52:
            window.location.href = getPermalink(4);
            break;
        case 53:
            // 5: 15 maps, 3 rows
            window.location.href = getPermalink(15);
            break;
        case 54:
            window.location.href = getPermalink(6);
            break;
        case 55:
            // 7: 24 maps, 4 rows
            window.location.href = getPermalink(24);
            break;
        case 56:
            window.location.href = getPermalink(8);
            break;
        case 57:
            // 9: all maps
            window.location.href = getPermalink(state.layertypes.length);
            break;

        case 67:
            // 'c'
            window.location.href = "console.html";
            break
        case 80:
            // 'p' - create permalink
            // window.location.href = updatePermalink();
            click_share_link();
            break
        case 191:
            // '/' (alias '?')
            $("#help_box").trigger({
                type: 'click',
                which: 191
            });
            // window.location.href = "help.html";
            break
        case 83:
            // 's'
            $("#look_for_address").trigger({
                type: 'click',
                which: 83
            });
            // window.location.href = "search.html";
            break

/* default:
            debug("unknown key press: " + evt.keyCode);
            break;
        */

        }

        return evt.keyCode;
    };
};


// sort maps, pre-selected first

function sortMapLayersSelected(selectedMaps) {
    var layertypes = state.layertypes;
    var cache = {};
    var list = [];

    // these maps are first
    for (var i = 0; i < selectedMaps.length; i++) {
        cache[selectedMaps[i]] = 1;
        list.push(selectedMaps[i]);
    }

    // then the rest
    for (var i = 0; i < layertypes.length; i++) {
        var name = layertypes[i].type;
        if (!cache[name]) {
            list.push(name);
        }
    }

    return list;
}

// reorder maps by name

function reorderMaps(type, config) {
    var maplist = state[type];
    if (!config.name && !config.type) return;

    function sortByName(a, b) {
        return a.name == b.name ? 0 : a.name > b.name ? 1 : -1
    };

    function sortByType(a, b) {
        return a.type == b.type ? 0 : a.type > b.type ? 1 : -1
    };

    // special sorting of map names

    function namePref(maps) {
        var list = [];
        var cache = {};
        var hash = {};

        for (var i = 0; i < state.nonBaseLayer.length; i++)
        hash[state.nonBaseLayer[i]] = 1;

        for (var i = 0; i < maps.length; i++) {
            if (!cache[i] && config.opacity && hash[maps[i]] && hash[maps[i].type]) {
                // alert("fooA " + maps[i].type);
                list.push(maps[i]);
                cache[i] = 1;
            }
        }

        // BBBike maps first
        for (var i = 0; i < maps.length; i++) {
            if (!cache[i] && config.bbbike && maps[i].name.match(/^BBBike/i)) {
                list.push(maps[i]);
                cache[i] = 1;
            }
        }

        // OSM maps second
        for (var i = 0; i < maps.length; i++) {
            if (!cache[i] && config.osm && maps[i].name.match(/^OSM/i)) {
                list.push(maps[i]);
                cache[i] = 1;
            }
        }

        // rest
        for (var i = 0; i < maps.length; i++) {
            if (!cache[i]) list.push(maps[i]);
        }

        return list;
    };

    if (config.name) {
        maplist = namePref(maplist.sort(sortByName));
    } else if (config.type) {
        maplist = maplist.sort(sortByType);
    } else {
        // nothing
    }

    state[type] = maplist;
}

function setMapHeight(NumberOfMaps) {
    var fullscreen = state.fullscreen;
    var height = $(window).height();
    var head = $('#head0').outerHeight(true); // first map description height
    if (fullscreen) {
        height -= $('#tools-copyright').outerHeight(true); // always visible
    } else {
        height += -$('#tools-top').outerHeight(true) - $('#tools-titlebar').outerHeight(true) - $('#bottom').outerHeight(true) - $('#tools-copyright').outerHeight(true);
    }

    // split screen if more than 3 maps are displayed
    var h;
    var rows = 1;
    if (NumberOfMaps <= 3) {;
    } else if (NumberOfMaps <= mc.row3) {
        rows = 2;
    } else if (NumberOfMaps <= mc.row4) {
        rows = 3;
    } else if (NumberOfMaps <= mc.row5) {
        rows = 4;
    } else {
        rows = 5;
    }

    h = height / rows;
    if (!fullscreen) {
        h -= head;
    }
    $('.map').height(Math.floor(h));

    // development: validate map size height
    var rest;
    if (!fullscreen) {
        rest = $('#tools-top').outerHeight(true) + $('#tools-titlebar').outerHeight(true) + $('#bottom').outerHeight(true) + $('#tools-copyright').outerHeight(true) + rows * ($('#map0').outerHeight() + $('#head0.switch').outerHeight(true));
    } else {
        rest = $('#tools-copyright').outerHeight(true) + rows * ($('#map0').outerHeight());
    }
    debug("height: " + $(window).height() + " rest: " + rest + " diff: " + ($(window).height() - rest) + " map: " + $('#map0').height());
}

function initToolserver() {
    // create the custom layer for toolserver.org
    OpenLayers.Layer.OSM.Toolserver = OpenLayers.Class(OpenLayers.Layer.OSM, {
        initialize: function (name, path, options) {
            var url = switch_url("http://{switch:a,b,c}.tiles.wmflabs.org/" + path + "/${z}/${x}/${y}.png");

            options = OpenLayers.Util.extend({
                tileOptions: {
                    crossOriginKeyword: null
                },
                sphericalMercator: true,
                numZoomLevels: 19
            }, options);
            OpenLayers.Layer.OSM.prototype.initialize.apply(this, [name, url, options]);
        },

        CLASS_NAME: "OpenLayers.Layer.OSM.Toolserver"
    });
}

/**
 * Définition de l'ensemble des layers
 * Beaucoup de defs commentés
 */
function initLayerTypes() {
    var BingApiKey = "AnlZwa5p0zgN6mSGFEULXVJgqmUsl8K8GdC_P7MBTVUQSuDY4LR-szxGn-SdpztI";

    var YandexBounds = state.YandexBounds;
    var proj4326 = state.proj4326;


    var layer_options = {
        tileOptions: {
            crossOriginKeyword: null
        },
        sphericalMercator: true,
        // buffer: 0,
        transitionEffect: "resize",
        numZoomLevels: 19
    };

    state.layertypes = [


    new LayerType('ign-scexstandard', 'SCAN Express Standard IGN', function() {
        return new OpenLayers.Layer.WMTS({
            name:"SCAN Express Standard IGN",
            url:"http://wxs.ign.fr/$CLE/geoportail/wmts",
            layer:"GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.STANDARD",
            matrixSet:"PM",
            format:"image/jpeg",
            style:"normal"
        });
    }),
    new LayerType('ign-scexclassic', 'SCAN Express Classique IGN', function() {
        return new OpenLayers.Layer.WMTS({
            name:"SCAN Express Classique IGN",
            url:"http://wxs.ign.fr/$CLE/geoportail/wmts",
            layer:"GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.CLASSIQUE",
            matrixSet:"PM",
            format:"image/jpeg",
            style:"normal"
        });
    }),
    new LayerType('ign-scexgris', 'SCAN Express Gris IGN', function() {
        return new OpenLayers.Layer.WMTS({
            name:"SCAN Express Gris IGN",
            url:"http://wxs.ign.fr/$CLE/geoportail/wmts",
            layer:"GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.NIVEAUXGRIS",
            matrixSet:"PM",
            format:"image/png",
            style:"normal"
        });
    }),
    new LayerType('ign-scexroutier', 'SCAN Express Routier IGN', function() {
        return new OpenLayers.Layer.WMTS({
            name:"SCAN Express Routier IGN",
            url:"http://wxs.ign.fr/$CLE/geoportail/wmts",
            layer:"GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN-EXPRESS.ROUTIER",
            matrixSet:"PM",
            format:"image/jpeg",
            style:"normal"
        });
    }),
    new LayerType('ign-franceraster', 'FranceRaster® V4', function() {
        return new OpenLayers.Layer.WMTS({
            name:"FranceRaster® V4",
            url:"http://wxs.ign.fr/$CLE/geoportail/wmts",
            layer:"GEOGRAPHICALGRIDSYSTEMS.FRANCERASTER",
            matrixSet:"PM",
            format:"image/jpeg",
            style:"normal"
        });
    }),
    new LayerType('ign-plan', 'Plan IGN', function() {
        return new OpenLayers.Layer.WMTS({
            name:"Plan IGN",
            url:"http://wxs.ign.fr/$CLE/geoportail/wmts",
            layer:"GEOGRAPHICALGRIDSYSTEMS.PLANIGN",
            matrixSet:"PM",
            format:"image/jpeg",
            style:"normal"
        });
    }),
    new LayerType('ign-cartes', 'Cartes IGN', function() {
        return new OpenLayers.Layer.WMTS({
            name:"Cartes IGN",
            url:"http://wxs.ign.fr/$CLE/geoportail/wmts",
            layer:"GEOGRAPHICALGRIDSYSTEMS.MAPS",
            matrixSet:"PM",
            format:"image/jpeg",
            style:"normal"
        });
    }),
    new LayerType('bing-map', 'Bing Maps', function () {
        return new OpenLayers.Layer.Bing(

        // XXX: bing.com returns a wrong zoom level in JSON API call
        OpenLayers.Util.extend({
            initLayer: function () {
                // pretend we have a zoomMin of 0
                this.metadata.resourceSets[0].resources[0].zoomMin = 0;
                OpenLayers.Layer.Bing.prototype.initLayer.apply(this, arguments);
            }
        }, {
            key: BingApiKey,
            type: "Road"
            //,  metadataParams: { mapVersion: "v1" }
        }));
    }),
    new LayerType('google-map', 'Google Maps', function () {
        return new OpenLayers.Layer.Google('Google (Map)', {
            type: google.maps.MapTypeId.ROADMAP
        });
    }),
    new LayerType('osmfr', 'OSM FR', function () {
        return new OpenLayers.Layer.OSM('OSM FR', switch_url('http://{switch:a,b,c}.tile.openstreetmap.fr/osmfr/${z}/${x}/${y}.png'), layer_options);
    }),
    new LayerType('osmfr-hot', 'OSM FR HOT', function () {
        return new OpenLayers.Layer.OSM('OSM FR HOT', switch_url('http://{switch:a,b,c}.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png'), layer_options);
    }),
    new LayerType('toner-retina', 'OSM Toner Retina', function () {
        return new OpenLayers.Layer.OSM('OSM Toner Retina', switch_url("http://{switch:a,b}.tile.stamen.com/toner/${z}/${x}/${y}@2x.png"), {
            sphericalMercator: true,
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 20
        });
    }),
    new LayerType('mapbox-transportation', 'OSM MapBox Transport', function () {
        return new OpenLayers.Layer.OSM("OSM MapBox Transport", switch_url("http://{switch:a,b,c,d}.tiles.mapbox.com/v4/peterqliu.9d05be4d/${z}/${x}/${y}@2x.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ"), {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 20
        })
    }),
    new LayerType('mapquest-eu', 'OSM Mapquest EU', function () {
        return new OpenLayers.Layer.OSM('OSM Mapquest EU', switch_url("http://otile{switch:1,2,3,4}.mqcdn.com/tiles/1.0.0/osm/${z}/${x}/${y}.png"), layer_options);
    }),
    new LayerType('esri-wtm', 'World Topo Map ESRI/IGN', function() {
        return new OpenLayers.Layer.WMTS({
            name:"World Topo Map ESRI/IGN",
            url:"http://wxs.ign.fr/$CLE/proxy",
            layer:"World_Topo_Map",
            matrixSet:"PM",
            format:"image/jpg",
            style:"default",
        });
    }),
    new LayerType('scan50', 'SCAN 50® (Carte au 1/50 000 de 1950)', function() {
        return new OpenLayers.Layer.WMTS({
            name:"SCAN 50® (Carte au 1/50 000 de 1950)",
            url:"http://wxs.ign.fr/$CLE/geoportail/wmts",
            layer:"GEOGRAPHICALGRIDSYSTEMS.MAPS.SCAN50.1950",
            matrixSet:"PM",
            format:"image/jpeg",
            style:"normal",
        });
    }),
    new LayerType('etatmajor40', 'SCAN EM® 40K (Carte de l\'état-major 1820-1866)', function() {
        return new OpenLayers.Layer.WMTS({
            name:"SCAN EM® 40K (Carte de l\'état-major 1820-1866)",
            url:"http://wxs.ign.fr/$CLE/geoportail/wmts",
            layer:"GEOGRAPHICALGRIDSYSTEMS.ETATMAJOR40",
            matrixSet:"PM",
            format:"image/jpeg",
            style:"normal",
        });
    }),

    // EOF padding
    ];

    // overlay types, just a copy + isBaseLayer: false
    state.over_layertypes = [

    AddOverlay('bbbike-smoothness'), AddOverlay('bbbike-handicap'), AddOverlay('bbbike-cycle-routes'), AddOverlay('bbbike-cycleway'),

    AddOverlay('bbbike-green'), AddOverlay('bbbike-unlit'), AddOverlay('bbbike-unknown'),

    AddOverlay('adfc-radwege'), AddOverlay('public_transport_lines'),

    AddOverlay('max-speed'), AddOverlay('ito-lit'), AddOverlay('ito-surface'),

    AddOverlay('yandex-hybrid'), AddOverlay('mapbox-runkeepers'),

    AddOverlay('mapnik-german'), AddOverlay('toner'), AddOverlay('osm-no-labels'),

    AddOverlay('landshaded'), AddOverlay('mapquest-satellite'), AddOverlay('nokia-satellite'), AddOverlay('bing-satellite'),

    AddOverlay('nokia-map'), AddOverlay('bing-map'), AddOverlay('esri-topo'), AddOverlay('aster-gdem-srtm-hillshade'),

    AddOverlay('waymarkedtrails-hiking'), AddOverlay('waymarkedtrails-cycling'), AddOverlay('waymarkedtrails-mtb'),

    AddOverlay('waymarkedtrails-skating'), AddOverlay('osm-administrative-boundaries'), AddOverlay('osm-gps'),

    AddOverlay('mapquest-labels'), AddOverlay('opensnowmap'),

    AddOverlay('openrailwaymap-standard'), AddOverlay('openrailwaymap-maxspeed'),

    AddOverlay('bing-coverage-sat'), AddOverlay('bing-coverage-date')

/*
    new OverLayerType('ol_parktrans', 'Parking', function () {
        return new OpenLayers.Layer.OSM.Toolserver("Parking", 'parktrans', {
            opacity: 1,
            numZoomLevels: 16
        });
    }),

    new OverLayerType('ol_powermap', 'Power Map', function () {
        return new OpenLayers.Layer.OSM.Toolserver("Power Map", 'powermap', {
            opacity: 1,
            numZoomLevels: 13
        });
    })
    */

    ];

    // reorderMaps("layertypes", mc.sort);
    reorderMaps("over_layertypes", mc.sort_overlay);
    getOrderOfPrefMaps();
}

function yandex_getTileURL(bounds) {
    var r = this.map.getResolution();
    var maxExt = (this.maxExtent) ? this.maxExtent : state.YandexBounds;
    // var maxExt = state.YandexBounds;
    // maxExt = new OpenLayers.Bounds();
    var w = (this.tileSize) ? this.tileSize.w : 256;
    var h = (this.tileSize) ? this.tileSize.h : 256;
    var x = Math.round((bounds.left - maxExt.left) / (r * w));
    var y = Math.round((maxExt.top - bounds.top) / (r * h));
    var z = this.map.getZoom();
    var lim = Math.pow(2, z);
    if (y < 0 >= lim) {
        return OpenLayers.Util.getImagesLocation() + "404.png";
    } else {
        x = ((x % lim) + lim) % lim;
        // var url = (this.url) ? this.url : "http://vec02.maps.yandex.net/tiles?l=map&v=2.2.3";
        var url = (this.href) ? this.href : "http://sat01.maps.yandex.net/tiles?l=sat&v=1.35.0";
        return url + "&x=" + x + "&y=" + y + "&z=" + z;
    }
}

function bvg_getTileURL(bounds) {
    var r = this.map.getResolution();
    var maxExt = (this.maxExtent) ? this.maxExtent : state.YandexBounds;

    var w = (this.tileSize) ? this.tileSize.w : 256;
    var h = (this.tileSize) ? this.tileSize.h : 256;
    var x = Math.round((bounds.left - maxExt.left) / (r * w));
    var y = Math.round((maxExt.top - bounds.top) / (r * h));
    var z = this.map.getZoom();
    var lim = Math.pow(2, z);
    var url = (this.href) ? this.href : "/tiles/";

    // scary, isn't it???
    y = (1 << z) - y - 1;
    return url + z + "/" + x + "/" + y + ".png";
}

function initYandex() {
    var YandexBounds = new OpenLayers.Bounds(-20037508, -20002151, 20037508, 20072865);
    state.YandexBounds = YandexBounds;
}

function get_mm_bikeTracks(bounds) {
    var llbounds, url;

    llbounds = new OpenLayers.Bounds();
    llbounds.extend(OpenLayers.Layer.SphericalMercator.inverseMercator(bounds.left, bounds.bottom));
    llbounds.extend(OpenLayers.Layer.SphericalMercator.inverseMercator(bounds.right, bounds.top));
    url = "http://mm-lbserver.dnsalias.com/mm-mapserver_v2/wms/wms.php?REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1&LAYERS=MM_BIKETRACKS&STYLES=&FORMAT=image/png&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&SRS=EPSG:4326&BBOX="
    url = url + llbounds.toBBOX() + "&WIDTH=256&HEIGHT=256"

    return url
}


function initMarker(n) {
    state.markersLayer[n] = new OpenLayers.Layer.Markers("Marker");
    state.maps[n].addLayer(state.markersLayer[n]);
    state.marker[n] = new OpenLayers.Marker(state.maps[n].getCenter(), new OpenLayers.Icon('img/cross.png', new OpenLayers.Size(20, 20), new OpenLayers.Pixel(-10, -10)));
    state.markersLayer[n].setVisibility(false);
    state.markersLayer[n].addMarker(state.marker[n]);
}

/*
 * We set the marker in the middle of the map. If the marker moved, we
 * will later re-set the middle to the marker again.
 * 
 */
function set_popup(obj) {
    if (!obj) return;

    var map = state.maps[0];
    var message = obj.message || "marker";
    var pos = new OpenLayers.LonLat(obj.lon, obj.lat).transform(state.proj4326, map.getProjectionObject());
    debug("set marker: " + obj.lon + "," + obj.lat);


    var message_p = "";
    if (mc.search.marker_permalink) {
        // message_p += '<p/><div><a href="' + $("#permalink").attr("href") + '&marker=' + message + '">permalink</a></div>';
        message_p += '<p/><div><a class="share_link" onclick="click_share_link(' + obj.lon + ',' + obj.lat + ')">Partager</a></div>';
    }

    // A popup with some information about our location
    var popup = new OpenLayers.Popup.FramedCloud("Popup", pos, null, // new OpenLayers.Size(50,50), // null,
    "<span id='mc_popup'>" + message + "</span>" + message_p, null, true // <-- true if we want a close (X) button, false otherwise
    );

    // remove old popups from search clicks
    if (state.popup) {
        map.removePopup(state.popup);
    }

    map.addPopup(popup);

    // keep values for further usage (delete, position)
    state.popup = popup;
    state.marker_message = message;
}

function click_share_link(lon, lat) {
    if (lat && lon) {
        map.setCenter(new OpenLayers.LonLat(lon, lat).transform(state.proj4326, map.getProjectionObject()));
    }

    debug("marker click feature");

    // close existing helper windows
    $('.dialog-close').trigger({
        type: 'click'
    });

    $("#share_context").trigger({
        type: 'click'
    });
}

function share_marker(pos) {
    var proj4326 = new OpenLayers.Projection('EPSG:4326');

    // remove old marker
    if (state.marker_vectors) {
        map.removeLayer(state.marker_vectors);
    }

    var vectors = new OpenLayers.Layer.Vector("Vector Layer", {
        styleMap: new OpenLayers.StyleMap({
            externalGraphic: "img/marker-blue.png",
            graphicXOffset: -12,
            graphicYOffset: -39,
            graphicWidth: 25,
            graphicHeight: 41,
            graphicName: "cross"
            // pointRadius: 24
        })
    });

    state.marker_vectors = vectors;
    map.addLayer(vectors);

    var marker = new OpenLayers.Control.DragFeature(vectors, {
        onComplete: function (feature, pixel) {
            var point = new OpenLayers.Geometry.Point(feature.geometry.x, feature.geometry.y).transform(map.getProjectionObject(), proj4326);
            debug("marker on complete feature: " + point);
            debug("marker on complete mouse pixel: " + pixel + " " + map.getLonLatFromViewPortPx(pixel).transform(map.getProjectionObject(), proj4326));

            setTimeout(function () {
                click_share_link(point.x, point.y);
            }, 300);
        }
    });

    map.addControl(marker);
    marker.activate();

    // remove popup cloud marker if exists before setting a new marker
    if (state.popup) {
        pos = state.popup.lonlat.transform(map.getProjectionObject(), proj4326);

        debug("delete old popup, new pos: " + pos);
        map.removePopup(state.popup);
        delete state.popup;

        // re-center new marker
        map.setCenter(new OpenLayers.LonLat(pos.lon, pos.lat).transform(proj4326, map.getProjectionObject()));
        // state.marker_message = "";
        updatePermalink();
    }

    // var point = new OpenLayers.Geometry.Point(pos.lon, pos.lat).transform(proj4326, map.getProjectionObject());
    var point = new OpenLayers.Geometry.Point(pos.lon, pos.lat).transform(proj4326, map.getProjectionObject());
    vectors.addFeatures(new OpenLayers.Feature.Vector(point));
}

function setVisibilityWrapper(layer, value) {
    if (layer) {
        layer.setVisibility(value);
    } else {
        // to slow, wait some seconds
        setTimeout(function () {
            if (layer) layer.setVisibility(value);
        }, 2000);
    }
}

function moveStart() {
    state.movestarted = true;
    for (var i = 0; i < mc.NumberOfMaps; i++) {
        setVisibilityWrapper(state.markersLayer[i], false);
    }
    return (false);
}

function moveEnd() {
    if (state.moving) {
        return;
    }

    state.moving = true;
    for (var i = 0; i < mc.NumberOfMaps; i++) {
        if (i != this && state.maps[i]) {
            state.maps[i].setCenter(
            state.maps[this].getCenter().clone().transform(state.maps[this].getProjectionObject(), state.maps[i].getProjectionObject()), state.maps[this].getZoom());
        }
        setVisibilityWrapper(state.markersLayer[i], true);
    }

    state.moving = false;
    updatePermalink();
    state.movestarted = false;
    // state.markersLayer[1-this].setVisibility(true);
    return false;
}

function mouseMove(evt) {
    for (var i = 0; i < mc.NumberOfMaps; i++) {
        if (i != this && state.marker[i]) {
            state.marker[i].moveTo(state.maps[this].getLayerPxFromViewPortPx(evt.xy));
        }
    }
    return (false);
}

function mouseOver(evt) {
    if (!state.movestarted) {
        for (var i = 0; i < mc.NumberOfMaps; i++) {
            if (i != this) {
                setVisibilityWrapper(state.markersLayer[i], true);
            }
        }
    }

    $('#customMousePosition').show();
    $('#customMousePosition').removeClass("mouseOut").addClass("mouseIn");
    $('#customZoomLevel').removeClass("mouseOut").addClass("mouseIn");

    return false;
}

function mouseOut(evt) {
    for (var i = 0; i < mc.NumberOfMaps; i++) {
        setVisibilityWrapper(state.markersLayer[i], false);
    }

    // $('#customMousePosition').hide();
    $('#customMousePosition').removeClass("mouseIn").addClass("mouseOut");
    $('#customZoomLevel').removeClass("mouseIn").addClass("mouseOut");

    return false;
}

// http://www.brain4.de/programmierecke/js/arraySort.php

function sortLayerByName(array) {}

/**
 * Initialisation des ménus déroulants
 * @param n nombre de visus cartos
 * @param type 
 */
function initSelectOptions(n, type) {
    var sw = $('#sw' + n);
    if (!sw || sw.length == 0) return;
    

    for (var i = 0; i < state.layertypes.length; i++) {
        var l = state.layertypes[i];
        var opt = document.createElement('option');
        opt.value = l.type;
        opt.text = l.name;
        opt.style.padding = '1px';
        if (l.type == type) {
            opt.selected = true;
        }
        sw[0].options[i] = opt;
    }
    sw.bind('change', n, changeLayer);
    //sw.selectmenu();
}

function initSelectOptionsOverlay(n, type) {
    var sw = $('#sw' + n);
    if (!sw || sw.length == 0) return;
    if (!type) type = "none";

    for (var i = 0; i < state.over_layertypes.length; i++) {
        var l = state.over_layertypes[i];
        var opt = document.createElement('option');

        // XXX: IE8
        if (!l) {
            debug("WARNING: unknown overlay config: " + i + " after: " + state.over_layertypes[i - 1].type);
            continue;
        }

        opt.value = l.type;
        opt.text = l.name;
        opt.style.padding = '1px';
        if (l.type == type) {
            opt.selected = true;
        }
        sw[0].options[i + 1] = opt;
    }
    sw.bind('change', n, changeOverLayer);
    state.over_layers[0] = type;

    if (type == "none") showTransparentMenu(false);
    else changeOverLayer(null, type);
}

function showTransparentMenu(flag, n) {
    if (!n) n = -2;
    var sw = mc.overlay.type == "select" ? $('#sw' + n) : $('#slider_box');
    if (!sw) return;

    flag ? sw.show() : sw.hide();
}

function initSelectOptionsTransparent(n, percent) {
    var sw = $('#sw' + n);
    if (!sw) return;
    if (typeof percent === 'undefined') percent = state.percent;

    if (!mc.overlay.enabled) return;

    var step = mc.overlay.select_step;

    for (var i = 0, j = 1; i <= 100; i += step, j++) {
        var opt = document.createElement('option');
        opt.value = i;
        opt.text = i + "%"
        opt.style.padding = '1px';
        if (i == percent) {
            opt.selected = true;
        }
        sw[0].options[j] = opt;
    }

    sw.bind('change', n, changeTransparent);
    state.percent = percent;

    return state.percent;
}

function initSliderTransparent(n, percent) {
    var sw = $('#slider_box');

    if (!sw) return;

    if (typeof percent === 'undefined') percent = state.percent;

    if (!mc.overlay.enabled) return;

    var step = mc.overlay.slider_step;

    sw.slider({
        step: 5,
        value: percent,
        animate: "fast",
        slide: function (event, ui) {
            changeTransparent(null, ui.value);
        }

        /* ,change: function(event, ui) { changeTransparent(null, ui.value); } */
    });

    state.percent = percent;
}

function changeTransparent(event, _percent) {
    var percent = event ? event.target.value : _percent;
    var overlayer_name = state.over_layers[0];

    if (overlayer_name == "none" || overlayer_name == "") return state.percent;

    debug("percent: " + percent);
    // default opacity
    if (percent == "" || percent < 0) {
        // reset layer
        if (percent != -2) // called from changeOverLayer
        changeOverLayer(null, overlayer_name);

        // select "default" in menu
        var sw = $('#sw' + "-2");
        if (sw && sw[0] && sw[0].options) sw[0].options[0].selected = true;

        debug("nothing to change: " + overlayer_name + " " + percent);
        return state.percent;
    }

    if (percent < 0 || percent > 100) {
        debug("percent out of range: " + percent + ", reset to 50");
        percent = 50;
    }
    state.percent = percent;

    debug("set transparent percentage to: " + percent);

    for (var n = 0; n < mc.NumberOfMaps; n++) {
        if (state.over_layers_obj[n]) {
            state.over_layers_obj[n].setOpacity(percent / 100);
        }
    }

    updatePermalink();
    return state.percent;
}

// make the column visible

function initColumn(n, display) {
    if (!display) {
        display = "table-cell";
    }
    var column = $('#column' + n);
    column.css("display", display);
}

// set the column width depending on the number of maps

function initColumnWidth(n) {
    var number;
    if (n <= 3) { // one row
        number = n;
    } else if (n <= mc.row3) { // second row
        number = Math.ceil(n / 2);
    } else if (n <= mc.row4) { // 3rd row
        number = Math.ceil(n / 3);
    } else if (n <= mc.row5) { // 4rd row
        number = Math.ceil(n / 4);
    } else { // 5rd row
        number = Math.ceil(n / 5);
    }

    var width = Math.floor(100 / number) + "%";
    $('td.maps').css("width", width);
}

function setStartPos(n, lonlat, zoom) {
    var center = lonlat.clone();
    center.transform(state.proj4326, state.maps[n].getProjectionObject());

    // adjust for maps with lower zoom levels
    var z = state.maps[n].getNumZoomLevels(zoom) - 1;
    if (z < zoom) zoom = z;

    state.maps[n].setCenter(center, zoom);
}

function updatePermalink() {
    var url = getPermalink(mc.NumberOfMaps);
    var permalink = $('#permalink');
    if (!permalink || permalink.length == 0) {
        return;
    }

    permalink[0].href = url;
    $('#customZoomLevel').html('niveau de zoom : ' + state.maps[0].getZoom());

    return url;
}

function getPermalink(NumberOfMaps) {
    var pos = getPosition();

    // full base URL, without parameters
    var base = window.location.href;
    if (base.indexOf("?") != -1) {
        base = base.substring(0, base.indexOf("?"));
    }

    // bbbike.org/mc/#map=5/51.509/-5.603    
    if (base.indexOf("#") != -1) {
        debug("cleanup '#' in url: " + base);
        base = base.substring(0, base.indexOf("#"));
    }

    var url = base + '?lon=' + pos.lon + '&lat=' + pos.lat + '&zoom=' + pos.zoom + "&num=" + NumberOfMaps;
    for (var i = 0; i < mc.NumberOfMapsMax; i++) {
        if (state.layers[i]) {
            url += "&mt" + i + "=" + state.layers[i].type;
        }
    }

    if (state.over_layers[0] && state.over_layers[0] != 'none') {
        url += "&mt-1" + "=" + state.over_layers[0];
        url += "&mt-1p" + "=" + state.percent;
    }
    if (state.fullscreen) url += "&fullscreen=1";
    if (state.marker_message) url += "&marker=" + encodeURI(state.marker_message);

    return url;
}

function updateNumberOfMapsLink(NumberOfMapsMax, NumberOfMaps, NumberOfMapsLinks) {
    var message = "nombre de fenêtres : <span id='nom_links'>";
    var pl_class = "";

    for (var i = 1; i <= NumberOfMapsMax; i++) {
        if (ignoreLink(NumberOfMapsMax, NumberOfMaps, NumberOfMapsLinks, i)) continue;

        if (i > 1) {
            message += " ";
        }
        if (i == NumberOfMaps) {
            message += i;
        } else {
            pl_class = i > 12 && i != NumberOfMapsMax ? 'pl_small' : 'pl_normal';
            message += "<a href='#' class='" + pl_class + "' onclick='this.href=getPermalink(" + i + ");'>" + i + '</a>';
        }
    }
    message += '</span>';

    $('#NumberOfMaps').html(message);
}

function ignoreLink(NumberOfMapsMax, NumberOfMaps, NumberOfMapsLinks, i) {
    // show only the first 8 links if there are less than 8 maps
    // on the map
    if (NumberOfMapsLinks && (NumberOfMaps < NumberOfMapsLinks) && i > NumberOfMapsLinks) return 1;

    // ignore odd small number links
    if (i == 5 || i == 7) return 1;

    // always show the last link
    if (NumberOfMapsMax == i) return 0;

    if (i > NumberOfMapsLinks && i <= mc.row3 && i % 2 == 1) return 1;

    if (i > NumberOfMapsLinks && i > mc.row3 && i <= mc.row4 && i % 3 != 0) return 1;

    if (i > NumberOfMapsLinks && i > mc.row4 && i <= mc.row5 && i % 4 != 0) return 1;

    if (i > NumberOfMapsLinks && i > mc.row5 && i % 10 != 0) return 1;

    return 0;
}

/**
 * A chaque fois qu'on crée un nouveau layer on peuple la liste des layers
 */
function LayerType(type, name, create) {
    this.type = type;
    this.name = name;
    this.create = create;

    state.layertypes_hash[type] = this;
}

/**
 * Et ca c'est pour les layers en superposition ... on utilise pas ces trucs là de toutes façons
 */
function OverLayerType(type, name, create) {
    this.type = type;
    this.name = name;
    this.create = create;

    state.over_layertypes_hash[type] = this;
}

// add an existing map to overlay menu

function AddOverlay(type) {
    var obj = state.layertypes_hash[type];

    if (obj && obj.type) {
        return new OverLayerType("ol_" + obj.type, obj.name, obj.create);
    } else {
        debug("unknown map type: " + type, " cannot create overlay");
        return {};
    }
}


function MapLayer(layertype) {
    var layertype_default = "mapnik";

    debug("MapLayer: " + layertype);
    var lt = state.layertypes_hash[layertype];
    if (!lt) {
        debug("unknown layer type: '" + layertype + "', fall back to " + layertype_default);
        lt = state.layertypes_hash[layertype_default];

        // XXX: give up!
        if (!lt) return {};
    }
    this.layer = lt;
    this.type = lt.type;
    this.name = lt.name;
    this.obj = lt.create();
}

// unfocus select box for key events on a map

function mc_unfocus() {
    var focus = $(':focus');
    if (focus.attr('id')) {
        focus.trigger("blur");
        debug("MapLayer focus is on form element: " + focus.attr('id') + ", unfocus with blur(), type:  " + document.activeElement);
    }
}

function newLayer(map, layertype) {
    state.layers[map] = new MapLayer(layertype);
    state.maps[map].addLayer(state.layers[map].obj);
}

function changeOverLayer(event, _name) {
    var name = event ? event.target.value : _name;
    debug(name);

    var oldLayerName = state.over_layers[0];
    debug("old overlayer name: " + oldLayerName);

    // remove old overlay layers
    for (var n = 0; n < mc.NumberOfMaps; n++) {
        var layers = state.maps[n].layers;
        if (state.over_layers_obj[n]) {
            state.maps[n].removeLayer(state.over_layers_obj[n]);
            delete state.over_layers_obj[n];
        }
    }

    // done
    if (name == "none") {
        showTransparentMenu(false);
        state.over_layers[0] = name;
        updatePermalink();
        return name;
    }

    for (var n = 0; n < mc.NumberOfMaps; n++) {
        if (!state.over_layertypes_hash[name]) {
            debug("unknown overlay name: '" + name + "'");
            continue;
        }

        var overlay = state.over_layertypes_hash[name].create();

        // by default all overlays are not a base layer
        overlay.isBaseLayer = false;

        debug("name: " + name + " n: " + n);
        state.maps[n].addLayer(overlay);
        state.over_layers_obj[n] = overlay;
    }

    state.over_layers[0] = name;
    updatePermalink();
    showTransparentMenu(true);

    // set opacity after an overlayer change
    // if (state.percent > 0) changeTransparent(null, -1);
    changeTransparent(null, state.percent);

    mc_unfocus();
    return name;
}

function changeLayer(event) {
    var map = event.data;
    var maps = state.maps;

    var oldproj = maps[map].getProjectionObject();
    var oldcenter = maps[map].getCenter().clone();
    var oldzoom = maps[map].getZoom();

    var newmap = event.target.value

    maps[map].removeLayer(maps[map].baseLayer);
    newLayer(map, newmap);

    try {
        state.layers[map].obj.setMapType();
    } catch (e) {
        // debug(e.error);
    }

    maps[map].setCenter(oldcenter.transform(oldproj, maps[map].getProjectionObject()), oldzoom);
    updatePermalink();

    mc_unfocus();
}

function osm_getTileURL(bounds) {
    var res = this.map.getResolution();
    var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
    var z = this.map.getZoom();
    var limit = Math.pow(2, z);

    if (y < 0 || y >= limit) {
        return OpenLayers.Util.getImagesLocation() + "404.png";
    } else {
        x = ((x % limit) + limit) % limit;
        return this.url + z + "/" + x + "/" + y + "." + this.type;
    }
}

function MapOrderHtml(NumberOfMaps) {
    var tr0 = $('tr#tr0');
    var tr1 = $('tr#tr1');
    var tr2 = $('tr#tr2');
    var tr3 = $('tr#tr3');
    var tr4 = $('tr#tr4');
    var data0 = "";
    var data1 = "";
    var data2 = "";
    var data3 = "";
    var data4 = "";

    debug("MapOrderHtml: " + NumberOfMaps);

    // for the first 3 maps use only one row
    if (NumberOfMaps <= 3) {
        for (var i = 0; i < NumberOfMaps; i++) {
            data0 += MapTD(i);
        }

        tr0.html(data0);
    }

    // for more than 3 maps, use 2 rows
    else if (NumberOfMaps <= mc.row3) {
        var half = Math.ceil(NumberOfMaps / 2);
        for (var i = 0; i < NumberOfMaps; i++) {
            if (i < half) {
                data0 += MapTD(i);
            } else {
                data1 += MapTD(i);
            }
        }

        tr0.html(data0);
        tr1.html(data1);
    }

    // for 11 and more maps, use 3 rows
    else if (NumberOfMaps <= mc.row4) {
        var half = Math.ceil(NumberOfMaps / 3);
        for (var i = 0; i < NumberOfMaps; i++) {
            if (i < half) {
                data0 += MapTD(i);
            } else if (i < half + half) {
                data1 += MapTD(i);
            } else {
                data2 += MapTD(i);
            }
        }

        tr0.html(data0);
        tr1.html(data1);
        tr2.html(data2);
    }
    // 4 rows
    else if (NumberOfMaps <= mc.row5) {
        var half = Math.ceil(NumberOfMaps / 4);
        for (var i = 0; i < NumberOfMaps; i++) {
            if (i < half) {
                data0 += MapTD(i);
            } else if (i < half + half) {
                data1 += MapTD(i);
            } else if (i < half + half + half) {
                data2 += MapTD(i);
            } else {
                data3 += MapTD(i);
            }
        }

        tr0.html(data0);
        tr1.html(data1);
        tr2.html(data2);
        tr3.html(data3);
    }
    // 5 rows
    else {
        var half = Math.ceil(NumberOfMaps / 5);
        for (var i = 0; i < NumberOfMaps; i++) {
            if (i < half) {
                data0 += MapTD(i);
            } else if (i < 2 * half) {
                data1 += MapTD(i);
            } else if (i < 3 * half) {
                data2 += MapTD(i);
            } else if (i < 4 * half) {
                data3 += MapTD(i);
            } else {
                data4 += MapTD(i);
            }
        }

        tr0.html(data0);
        tr1.html(data1);
        tr2.html(data2);
        tr3.html(data3);
        tr4.html(data4);
    }

    // XXX: without this, the left map0 will be half size or 3/4 size
    setMapHeight(NumberOfMaps);
}

function MapTD(number) {
    var help = mc.NumberOfMaps >= 7 ? "" : "<span class='cmtm'>Couche : </span>";
    var td = "";
    td += '<td class="maps" id="column' + number + '">';
    td += '   <form action="" class="switch" id="head' + number + '">';
    td += '      <div>' + help + '<select id="sw' + number + '" name="sw' + number + '"><option/></select></div>';
    td += '   </form>';
    td += '   <div class="mapname" id="mapname' + number + '"></div>';
    td += '   <div class="map" id="map' + number + '"></div>';
    td += '</td>';

    return td;
}

/*
 * helper function
 */
function toggleFullScreen(overlay) {
    var fullscreen = !state.fullscreen;
    var fullscreen_type = typeof overlay !== 'undefined' ? overlay : state.fullscreen_type;

    // elements by id
    for (var i = 0; i < state.non_map_tags.length; i++) {
        toggleID(state.non_map_tags[i], fullscreen);
    }

    // map titles
    for (var i = 0; i < mc.NumberOfMaps; i++) {
        toggleID("head" + i, fullscreen);
    }

    state.fullscreen = fullscreen;
    setMapHeight(mc.NumberOfMaps);

    // if active, make the font size larger
    if (fullscreen) {
        $("#fullscreen").removeClass("font_deactive").addClass("font_active");
    } else {
        $("#fullscreen").removeClass("font_active").addClass("font_deactive");
    }

    if (mc.mapname_fullscreen && fullscreen_type != 2) {
        display_map_name(fullscreen_type);
    }

    state.fullscreen_type = fullscreen_type;
    debug("fullscreen state: " + state.fullscreen + ", type: " + state.fullscreen_type);

    return state.fullscreen;
}

function display_map_name(overlay) {
    var list = $("div#table tr > td > form > div > select");
    var id, number, name, mapname_id;

    for (var i = 0; i < list.length; i++) {
        id = $(list[i]).attr("id");
        number = id.substring(2); // sw0 -> 0
        name = $(list[i]).find("option:selected").text();

        mapname_id = "#mapname" + number;
        $(mapname_id).text(name);
        state.fullscreen ? $(mapname_id).show() : $(mapname_id).hide();

        $(mapname_id).css("color", overlay == 3 ? "white" : "black");

        debug("id: " + id + ", name: " + name);
    }
}

function toggleID(tagname, fullscreen) {
    var tag = $("#" + tagname);

    if (tag) fullscreen ? tag.hide() : tag.show();
}

/*
   0: no logging
   1: log to console
   2: log to <div id="debug">
   3: log to <div id="debug">, endless growing
*/
function debug(text, id) {
    if (!mc.debug) return;
    if (!window.console) return; // IE8 ?
    // always log to JavaScript console for debug >= 1
    console.log("Map Compare: " + text);

    if (mc.debug == 1) return;

    if (!id) id = "debug";
    var tag = $("#" + id);

    if (!tag) return;

    // log to HTML page
    var prefix = "debug: ";
    var html = tag.html() ? tag.html() + "; " : prefix;
    tag.html((mc.debug == 3 ? html : prefix) + text)
}

/*
 * geo-location services, find out your current position
 *
 */
function locateMe() {
    if (!navigator || !navigator.geolocation) return;

    var tag = locateMe_tag();
    if (tag) {
        tag.show();
        navigator.geolocation.getCurrentPosition(locateMe_cb, locateMe_error);
        setTimeout(function () {
            tag.hide();
        }, 8000); // paranoid
    }
}

function locateMe_tag() {
    return $("#tools-geolocation");
}

function locateMe_cb(position) {
    var zoom = 15;

    var pos = new MapPosition(position.coords.longitude, position.coords.latitude, zoom);
    setStartPos(1, pos.getLonLat(), pos.zoom);
    locateMe_tag().hide();
    debug("set position lat,lon: " + pos.lat + "," + pos.lon + ", zoom: " + zoom);
}

function locateMe_error(error) {
    debug("could not found position");
    locateMe_tag().hide();
    return;
}

/*
 * set Map Compare preferences in admin console
 *
 */
function initConsole() {
    // debug("init console");
    initCookieCheck();

    initSocial();
    initLayerTypes();

    consoleNumberOfMaps();
    consoleCenterOfMaps();
    consoleTileServer();

    initLayerTypesUserDefined();
    consoleOrderOfMaps();
}

function initCookieCheck() {
    var name = mc_console.cookie.check;

    setCookie(name, "1", true);
};

function initSocial() {
    var tag = $("#social");
    if (!tag) return;

    mc.social ? tag.show() : tag.hide();
}

// returns the configured number of maps

function getNumberOfMaps(override) {
    var number = $.cookie(mc_console.cookie.numberOfMaps);

    if (!number || override) {
        if (!override && mc.responsive.enabled && $(window).height() < mc.responsive.maxHeight) {
            number = 2; // mc.responsive.NumberOfMaps;
            debug("Responsive design: reset number of maps to " + number);
        } else {
            number = mc.NumberOfMaps;
        }
    }

    number = parseInt(number);
    if (number < 1 || number > 999) number = 2;

    return number;
}


function getOrderOfPrefMaps(override) {
    var cookie = $.cookie(mc_console.cookie.orderOfMaps);
    if (!cookie) return mc.mt;

    var list = cookie.split("^");
    if (list.length <= 0) return mc.mt;

    for (var i = 0; i < list.length; i++) {
        if (list[i]) mc.mt[i] = list[i];
    }
    return mc.mt;
}

function getTileServer(number) {
    var obj = {};

    return obj;
}

function setTileServer(obj) {}

function consoleStoreTileServer() {
    // debug("foo");
}

function consoleStoreTileServerOrder() {
    var list = [];

    for (var i = 0; i < mc.mt.length && i < mc.NumberOfMaps; i++) {
        list.push(mc.mt[i]);
    }

    var value = list.join("^");
    setCookie(mc_console.cookie.orderOfMaps, value);
    debug("order of maps: " + value);
}

/* There are several ways to keep the GPS position in a string. For our
 * convenience we support them all: Map Compare, Google Maps, OpenStreeMaps
*/
function pos_center_to_mc(pos_string) {
    var data = "";
    var list = [];
    var list2 = [];

    // illegal parameter
    if (!pos_string || pos_string == "") {
        debug("Oops, wrong paramter in pos_center_to_mc");
    }

    // Google Maps:   @52.5215244,13.3764074,17z -> 13.3764074,52.5215244,17
    else if (pos_string.match(/^@.+,.+,.+z$/)) {
        data = pos_string.substring(1, pos_string.length - 1);
        list = data.split(",");
        list2 = [list[1], list[0], list[2]];
        data = list2.join();
    }

    // OpenStreetMap: #map=18/52.58592/13.36120 => 13.36120,52.58592,18
    else if (pos_string.match(/^#map=\d+\/.+\/.+$/)) {
        data = pos_string.substring(5);
        list = data.split("/");
        list2 = [list[2], list[1], list[0]];
        data = list2.join();
    }

    // tools.geofabrik.de: #18/52.58592/13.36120 => 13.36120,52.58592,18
    else if (pos_string.match(/^#\d+\/.+\/.+$/)) {
        data = pos_string.substring(1);
        list = data.split("/");

        // ignore trailing URL parameters: #14/36.8928/38.354&x=1
        list[2] = list[2].match(/^[0-9\.\-\+]+/);

        list2 = [list[2], list[1], list[0]];
        data = list2.join();
    }

    // Map Compare:   13.38885,52.51,12
    else {
        data = pos_string;
    }

    debug('Got position: "' + pos_string + '" => "' + data + '"');
    return data;
}


/*
   get center of map as [lng,lat] array

   checked in order:
   1. cgi parameter
   2. cookies
   3. MC config
*/
function getMapCenter(override) {
    var p = {};
    var pos;
    var zoom = mc.pos.zoom;

    parseParams(function (param, v) {
        p[param] = decodeURIComponent(v).replace(/\+*$|^\+*/g, "").replace(/\+/g, " ");
    });

    var pos_string = override || p["center"] || $.cookie(mc_console.cookie.centerOfMaps);

    if (!pos_string) return mc.pos;

    // http://a.tile.bbbike.org/osm/bbbike-smoothness/15/17602/10746.png
    if (pos_string.match(/^http:/)) {
        pos = tile2lnglat(pos_string);
        if (pos) {
            return pos;
        } else {
            debug("could not parse URL: " + pos_string);
            return mc.pos;
        }
    }

    // lng,lat,zoom: 13.38885,52.51,12
    else {
        pos = pos_center_to_mc(pos_string).split(",");
        if (pos.length < 2) {
            debug("unknown pos: " + pos_string);
            return mc.pos;
        }
        if (!check_lng(pos[0])) {
            debug("unknown lng: " + pos[0]);
            return mc.pos;
        }
        if (!check_lat(pos[1])) {
            debug("unknown lat: " + pos[1]);
            return mc.pos;
        }


        if (pos[2]) {
            if (pos[2] == NaN || pos[2] > 20 || pos[2] < 0) {
                debug("unknown zoom level: " + pos[2] + ", ignored");
            } else {
                zoom = pos[2];
            }
        }

        var p = {
            "lng": pos[0],
            "lat": pos[1],
            "zoom": zoom
        };

        return p;
    }
}

function consoleStoreMapCenter() {
    var tag = $('#center');
    var value = tag ? tag.attr("value") : "";

    var pos = getMapCenter(value);
    var string = pos2string(pos);

    setCookie(mc_console.cookie.centerOfMaps, string);
    debug("center of maps: " + string);
}


/*
   display menu to configure the default number of maps
*/
function consoleNumberOfMaps() {
    if (!mc_console.pref_numberOfMaps) return $("#pref_numberOfMaps").hide();

    var tag = $('#consoleNumberOfMaps');
    if (!tag) return false;

    var NumberOfMaps = getNumberOfMaps();

    for (var i = 0; i < state.layertypes.length; i++) {
        var j = i + 1;
        var opt = document.createElement('option');
        opt.value = j;
        opt.text = j;
        opt.style.padding = '1px';
        tag[0].options[i] = opt;

        // pre-select value
        if (j == NumberOfMaps) tag[0].options[i].selected = true;
    }

    // keep current value, even if nothing changed and the user pressed click
    mc.NumberOfMaps = NumberOfMaps;

    // on change update javascript variables
    tag.bind('change', null, function (event) {
        mc.NumberOfMaps = event.target.value;
    });

    return true;
}

function pos2string(pos) {
    var string = pos.lng + "," + pos.lat;
    if (pos.zoom) string += "," + pos.zoom;

    return string;
}

function consoleCenterOfMaps() {
    if (!mc_console.pref_centerOfMaps) { // disable section
        return $("#pref_centerOfMaps").hide();
    }

    var tag = $('#center');
    if (!tag) return false;

    var pos = getMapCenter();

    tag.attr("value", pos2string(pos));
    return true;
}

function consoleOrderOfMaps() {
    var mapsPerRow = 2; // number of maps per row, 2..4
    if (!mc_console.pref_orderOfMaps) return $("#pref_orderOfMaps").hide();

    var tag = $('#consoleOrderOfMaps');
    if (!tag) return false;

    var NumberOfMaps = getNumberOfMaps();
    if (NumberOfMaps > 8) // show only 8 maps, more don't make sense
    NumberOfMaps = 8;

    var layertypes = state.layertypes;
    var html = "\n";
    for (var n = 1; n <= NumberOfMaps; n++) {
        html += "Map " + n + ": ";
        html += '<select id="order_' + n + '">';
        // html += '<option value="">default</option>';
        for (var i = 0; i < layertypes.length; i++) {
            html += '<option '
            if (mc.mt[n - 1] && layertypes[i].type == mc.mt[n - 1]) html += 'selected="selected" '
            html += 'value="' + layertypes[i].type + '">' + layertypes[i].name + '</option>';
        }
        html += "</select>\n";
        html += (n % mapsPerRow == 0 ? "<br/>" : "\n");
    }
    tag.before(html);

    for (var n = 1; n <= NumberOfMaps; n++) {
        var tag = $('#order_' + n);

        // on change update javascript variables
        tag.bind('change', null, (function (number) {
            return function (event) {
                var value = event.target.value;
                if (value) mc.mt[number] = value;
                debug(value + " " + number);
            };
        })(n - 1)); // call by value, not a reference to n variable
    }

    debug(mc.mt.join("/"));
    return true;
}


function consoleStoreCookieNumberOfMaps() {
    var number = getNumberOfMaps(true);

    setCookie(mc_console.cookie.numberOfMaps, number);
    debug("nombre de cartes: " + number);
}

function cookieCheck() {
    var name = mc_console.cookie.check;
    var value = $.cookie(name);

    if (!value) {
        var tag = $("#tools-console");
        tag.before('<p class="error">Please enable cookies!</p>');
    }
}

function setCookie(name, value, nocheck) {
    if (!nocheck) cookieCheck();

    $.cookie(name, value, {
        expires: mc.preferences_expire,
        path: '/'
    });
}

/*
   delete cookie by name, or all if no argument is given
*/
function consoleDeleteCookies(array) {
    var list = array || [];

    // delete all cookies
    if (list.length == 0) {
        list.push(mc_console.cookie.numberOfMaps);
        list.push(mc_console.cookie.orderOfMaps);
        list.push(mc_console.cookie.centerOfMaps);

        // all tile servers
        for (var i = 1; i <= mc_console.maxTileServer; i++) {
            list.push(mc_console.cookie.tileserver + i);
        }
    }

    for (var i = 0; i < list.length; i++) {
        $.cookie(list[i], null, {
            path: '/'
        });
    }
}

/*
  returns a tile server config object for a given number (1..4)
  The data is from the URL parameters or a cookie
*/
function getTileServerConfig(number) {
    var i = number;

    var p = {}
    parseParams(function (param, v) {
        p[param] = decodeURIComponent(v).replace(/\+*$|^\+*/g, "").replace(/\+/g, " ");
    });

    var obj = {
        name: 'local_tileserver_name_' + i,
        url: 'local_tileserver_url_' + i,
        base: 'local_tileserver_isbaselayer_' + i,
        cookie: mc_console.cookie.tileserver + i
    };

    // validate tile server config

    function validateObj(obj, p, cookie) {
        var maxNameLength = 25;
        // cleanup
        for (var key in obj) {
            if (key.match(/_v$/)) continue; // XXX
            var k = cookie ? key : obj[key]; // cookie or cgi param
            if (typeof p[k] === 'undefined') p[k] = "";

            var val = p[k];
            obj[key + "_v"] = xss(val) ? "" : val;
        }

        if (obj.name_v.length > maxNameLength) {
            obj.name_v = obj.name_v.substring(0, maxNameLength);
        } else if (obj.name_v == "" && obj.url_v != '') {
            obj.name_v = "unknown";
        }

        obj.url_v = normalizeTileServerURL(obj.url_v);
        if (obj.url_v.length > 200) obj.url_v = "";
    }

    // read from URL parameters
    if (p["pref_tileserver"]) {
        validateObj(obj, p);
    }
    // read from cookie
    else {
        var _p = parseCookieTileServer(number);
        validateObj(obj, _p, true);
    }

    obj["pref_tileserver"] = p["pref_tileserver"];

    // disallow spaces in URLs
    if (!isURL(obj.url_v) || obj.url_v.match(/\s|\+/)) obj.url_v = "";

    return obj;
}


/*
  console: display user tile server configuration table
*/
function consoleTileServer() {
    if (!mc_console.pref_tileserver) return $("#pref_tileserver").hide();

    var tag = $('#table_tileserver');
    if (!tag) return false;

    var maxTileServer = mc_console.maxTileServer;

    for (var i = 1; i <= maxTileServer; i++) {
        var obj = getTileServerConfig(i);

        var text = '<tr>' + '<td>' + i + '</td>' + '<td><input maxlength="32" name="' + obj.name + '" type="text" value="' + obj.name_v + '"></td>' + '<td><input maxlength="128" name="' + obj.url + '" type="text" value="' + obj.url_v + '" /></td>' + '<td><select name="' + obj.base + '"><option value="1">yes</option>' + '<option value="0"' + (obj.base_v == "0" ? ' selected="selected"' : "") + '>no</option></td>' + '</tr>';

        tag.append(text);

        var cookie_value = obj.name_v + "^" + obj.url_v + "^" + obj.base_v;
        if (obj.url_v != "") {
            debug("cookie: " + obj.cookie + " " + cookie_value);
            setCookie(obj.cookie, cookie_value);
        } else {
            if (obj.pref_tileserver) {
                consoleDeleteCookies([obj.cookie]);
                debug(obj.cookie);
            }
        }
    }

    return true;
}

/*
  read all user tile server configs from cookies
*/
function initLayerTypesUserDefined() {
    for (var i = mc_console.maxTileServer; i > 0; i--) {
        var cookie = $.cookie(mc_console.cookie.tileserver + i)
        if (cookie) initLayerTypesCookie(i, cookie);
    }
}


/*
  check for valid input
*/
function xss(string) {
    var result = string.match(/[<>"'\^]/) ? 1 : 0;

    if (result) debug("xss detected");

    return result;
}

/*
   /osm/11/1100/671.png -> /osm/${z}/${x}/${y}.png
*/
function normalizeTileServerURL(url) {
    // http://a.tile.bbbike.org/osm/bbbike-smoothness/15/17602/10746.png
    var regex = new RegExp('/[12]?\\d/\\d+/\\d+\.(png|jpg)$');

    if (!url) return url;

    var u = url;
    if (u.match(regex)) {
        url = u.replace(regex, "/${z}/${x}/${y}.$1");
    }

    // http://bingcoverage.org/dates.php?z=10&x=545&y=334
    else if (u.match(/&x=\d+/)) {
        url = u.replace(/&x=\d+/, "&x=${x}").replace(/&y=\d+/, "&y=${y}").replace(/&z=\d+/, "&z=${z}").replace(/\?z=\d+/, "?z=${z}");
    }

    // debug("Normalized URL: " + url);
    return url;
}

function parseCookieTileServer(i, cookie) {
    if (!cookie) cookie = $.cookie(mc_console.cookie.tileserver + i);
    if (!cookie) return {};

    var data = cookie.split("^");

    var obj = {
        "name": data[0],
        "url": data[1],
        // normalizeTileServerURL($data[1]),
        "base": data[2],
        "type": 'user_' + i
    };

    // must be a real URL
    if (!isURL(obj.url)) return {};
    if (xss(obj.url)) return {};

    return obj;
}

function isURL(url) {
    if (typeof url === 'undefined' || url == "") return false;

    // support multiple servers
    url = url.replace(/\{switch:([a-z0-9]+).*?\}/, "$1");

    return url.match(/^http:\/\/[\w+_\-\.]+(:\d+)?\/\w+/) ? true : false;
}

/*
 * support multiple servers in URL config
 * http://{switch:a,b}.tile.bbbike.org -> ["http://a.tile.bbbike.org", "http://a.tile.bbbike.org" ]
 */
function switch_url(url) {
    var list = url.match(/(http:\/\/[0-9a-z\-]*?)\{switch:([a-z0-9,]+)\}(.*)/);

    if (!list || list.length == 0) {
        return url;
    }

    var servers = list[2].split(",");
    var url_list = [];
    for (var i = 0; i < servers.length; i++) {
        url_list.push(list[1] + servers[i] + list[3]);
    }

    return url_list;
}

/*
  add a user tile server
*/
function initLayerTypesCookie(i, cookie) {
    debug("got cookie: " + cookie);

    var obj = parseCookieTileServer(i, cookie);
    if (!isURL(obj.url)) return;

    if (obj.base != "0") {
        state.layertypes.unshift(new LayerType(obj.type, obj.name, function () {
            return new OpenLayers.Layer.OSM(obj.name, switch_url(obj.url), {
                tileOptions: {
                    crossOriginKeyword: null
                },
                // openlayers 2.12
                sphericalMercator: true
            })
        }));
        // addMaptypeToOrder(obj.type);
    } else {
        // over_layertypes.unshift(l);
        state.over_layertypes.unshift(new OverLayerType(obj.type, obj.name, function () {
            return new OpenLayers.Layer.OSM(obj.name, switch_url(obj.url), {
                tileOptions: {
                    crossOriginKeyword: null
                },
                sphericalMercator: true,
                isBaseLayer: false
            })
        }));
    }
}

// add a maptype to prefered order list

function addMaptypeToOrder(maptype) {
    for (var i = 0; i < mc.mt.length; i++) {
        // maptype already exists, skip
        if (mc.mt[i] == maptype) return;
    }
    mc.mt.unshift(maptype);
}

/*
  social links
*/

/*
   see http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
*/
function tile2lng(x, z) {
    return (x / Math.pow(2, z) * 360 - 180);
}

function tile2lat(y, z) {
    var n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
    return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
}

function tile2lnglat(url) {
    // http://a.tile.bbbike.org/osm/bbbike-smoothness/15/17602/10746.png
    var regex = new RegExp('^http://.*?/([12]?\\d)/(\\d+)/(\\d+)\.(png|jpg)$');

    var lng;
    var lat;

    if (!url) return undefined;

    var match = regex.exec(url);

    if (!match) {
        return undefined;
    }

    var zoom = match[1];
    lng = tile2lng(match[2], zoom);
    lat = tile2lat(match[3], zoom);
    if (lng == NaN || lat == NaN) return undefined;

    var obj = {
        "lng": lng,
        "lat": lat,
        "zoom": zoom
    };

    return obj;
}


/* validate lat or lng values */

function check_lat(number) {
    return check_coord(number, 90)
}

function check_lng(number) {
    return check_coord(number, 180)
}

function check_coord(number, max) {
    if (number == NaN || number == "") return false;
    if (number >= -max && number <= max) return true;

    return false;
}

function chooseAddrBTLR(b, t, l, r, lon, lat, message) {
    chooseAddr(l, b, r, t, lon, lat, message);
}

function chooseAddrGeopo(b, l, t, r, lon, lat, message) {	
	var position = new OpenLayers.LonLat(lon,lat).transform("EPSG:4326", "EPSG:900913");
	map.setCenter(position);
	
	// marker for address
    if (mc.search.show_marker) {
        set_popup({
            "lon": lon,
            "lat": lat,
            "message": message
        });
    }
}


function chooseAddr(l, b, r, t, lon, lat, message) {
    var bounds = new OpenLayers.Bounds(l, b, r, t).transform("EPSG:4326", "EPSG:900913");
    map.zoomToExtent(bounds);
    var zoom = map.zoom;

    if (mc.search.max_zoom && mc.search.max_zoom < zoom) {
        zoom = mc.search.max_zoom;
        debug("reset zoom level for address: " + zoom);
        map.zoomTo(zoom);
    }

    // marker for address
    if (mc.search.show_marker) {
        set_popup({
            "lon": lon,
            "lat": lat,
            "message": message
        });
    }
}

function set_search_width() {
    var width = $(window).width();
    var height = $("div#search-results").outerHeight(true) + $("div#search-form").outerHeight(true);
    var max_with = 760;

    if (width > max_with) {
        width = max_with;
    }
    var help_width = Math.floor(width * 0.95);

    $(".jqmWindow").width(help_width);
    $(".jqmWindow").css("right", 20);

    $(".dialog-search").height(height + 20);
    debug("search help width: " + help_width + " height: " + $(".dialog-search").outerHeight(true));
}

function mc_search(query) {
    if (!query) {
        query = $("input#address-query").attr("value") || "";
    }

	//MANU : On force la recherche Géoportail
    /*if (mc.search.type == 'nominatim') {
        mc_search_nominatim(query);
    } else {
        debug("unknown search type");
    }*/
   
   	mc_search_geoportail(query);
}

function init_search() {
    console.log("dddddd");
    // $('#address-submit').click(function () {
    // IE8, IE9 submit on enter, see http://support.microsoft.com/kb/298498/
    $('div#search-form form').on('submit', function () {
        mc_search();
        return false;
    });

    // disable keyboard shortcuts on input fields
    $("#search-form").on("focus blur mousein mouseout mouseover", "input#address-query", function () {
        var active = document.activeElement.id == this.id;

        debug("document active: " + (document.activeElement.id ? document.activeElement.id : "ACTIVE") + " " + active);
        active ? state.control.keyboard.deactivate() : state.control.keyboard.activate();
    });

    set_search_width();

    // XXX: on newer jqModal we need a timeout
    setTimeout(function () {
        set_search_width();
    }, 0);

    // XXX: jquery 1.8.3 set the focus later
    // inital focus set
    setTimeout(function () {
        $("div#search-form input#address-query").focus();
    }, 50);
}

function init_share() {
    function show_url(url) {
        var message = '<a href="' + url + '">' + url + "</a>";
        $("span#url_share").html(message);
    }

    function show_url_from_input() {
        var url = jQuery('#permalink').attr("href");
        var u = url;
        // remove old marker parameter
        if (u.indexOf("&marker=") != -1) {
            u = u.substring(0, u.indexOf("&marker="));
            debug("cleanup old marker message: " + url);
        }
        show_url(u + "&marker=" + encodeURI($("input#share-message").attr("value")));
        state.marker_message = $("input#share-message").attr("value");
    }

    $('input#share-message').change(function () {
        show_url_from_input()
    });
    $('input#share-message').keyup(function () {
        show_url_from_input()
    });

    // zoom level changes will trigger some actions
    map.events.register("zoomend", map, function () {
        if ($("input#share-message:visible").length) {
            debug("zoom change");
            show_url_from_input();
        }
    });

    // disable keyboard shortcuts on input fields
    $("#share-form").on("focus blur mousein mouseout mouseover", "input#share-message", function () {
        var active = document.activeElement.id == this.id;

        debug("document active: " + (document.activeElement.id ? document.activeElement.id : "ACTIVE") + " " + active);
        active ? state.control.keyboard.deactivate() : state.control.keyboard.activate();
    });

    // pre-filled form
    if (state.marker_message) {
        $("input#share-message").attr("value", state.marker_message);
    }

    share_marker(getPosition());
    show_url_from_input();

    set_share_width();

    // XXX: jquery 1.8.3 set the focus later
    // inital focus set
    setTimeout(function () {
        $("div#share-form input#share-message").focus();
    }, 50);
}

function set_share_width() {
    var width = $(window).width();
    var height = $("div.dialog-share").outerHeight(true);
    var max_with = 720;

    if (width > max_with) {
        width = max_with;
    }
    var share_width = Math.floor(width * 0.95);

    $(".jqmWindow").width(share_width);
    $(".jqmWindow").css("right", 20);

    $("div.dialog-share").height(height + 30);
    debug("search help width: " + share_width + " height: " + $(".dialog-share").outerHeight(true));
}

/*
 viewbox=<left>,<top>,<right>,<bottom>
 or viewboxlbrt=<left>,<bottom>,<right>,<top>
   The preferred area to find search results
   */

function get_viewport(map) {
    var proj = map.getProjectionObject();
    var center = map.getCenter().clone();
    var zoom = map.getZoom();

    var box = map.getExtent();
    // 13.184573,52.365721,13.593127,52.66782
    // x1,y1 x2,y2
    var bbox = box.transform(map.getProjectionObject(), state.proj4326).toArray();

    debug(bbox + " " + bbox.length);

    if (bbox && bbox.length == 4) {
        return bbox.join(",");
    } else {
        debug("Warning: no viewboxlbrt found");
        return "";
    }
}

function mc_search_nominatim(query, offset, paging) {
	
    var limit = mc.search.limit || 25;
    var viewport = "";

    if (!paging) {
        paging = mc.search.paging || 5;
    }
    
    if (!offset) {
        offset = 0;
    }

    var items = [];
    var counter = 0;

    if (mc.search.viewbox) {
        viewport = get_viewport(map);
    }

    debug("start address search query: " + query + " limit: " + limit + " viewport: " + viewport);
    $("div#search-results").html("<p>Recherche en cours...</p>"); // remove old results first
    set_search_width();

    var email = mc.search.user_agent ? "&email=" + mc.search.user_agent : "";

    // async search request to nominatim
    var url = 'http://nominatim.openstreetmap.org/search?format=json&limit=' + limit + "&viewboxlbrt=" + viewport + '&q=' + encodeURI(query) + email + '&countrycodes=fr';;

    // IE8/IE9
    // $.support.cors = false;
    $.getJSON(url, function (data) {
        $("div#search-results").html(""); // remove old results first
        $.each(data, function (index, val) {
            counter++;
            if (index >= offset && index < offset + paging) {
                if (items.length == 0) {
                    $("div#search-results").append("<br/>");
                }
                debug("Address: " + index + ". " + val.display_name + " lat: " + val.lat + " lon: " + val.lon);

                var link = "<p><a title='lat,lon : " + val.lat + "," + val.lon + " [" + val["class"] + "]'";
                link += "href='#' onclick='chooseAddrBTLR(" + val.boundingbox + "," + val.lon + "," + val.lat + ", \"" + escapeHtmlEntities(val.display_name) + "\");return false;'>";
                link += (data.length == 1 ? "" : counter + ") "); // only one hit, no numbers
                link += val.display_name + "</a></p>";
                $("div#search-results").append(link);
                items.push(link);
            }
        });

        // nothing found
        if (items.length == 0) {
            $("div#search-results").append("<p>No results found</p>");
        }

        // probably more results, search again
        else if (items.length == paging && offset + paging < counter) {
            $("div#search-results").append("<hr/><a href='#' onclick='mc_search_nominatim(\"" + query + "\"," + (offset + paging) + ", " + paging + "); return false;'>Résultats supplémentaires...</a>");
        }

        set_search_width();

    }).fail(function (data, textStatus, error) {
        debug("error nominatim search: " + url);
        debug("error nominatim: data: " + data + ", textStatus: " + textStatus + ", error: " + error);
        $("div#search-results").html("<p>Search with nominatim failed. Please try again later. Sorry!</p>" + "<p>" + error + "</p>");
        set_search_width();
    });
}

//MANU : Vilaine tentative d'utilisation du moteur de recherche du géoportail

function mc_search_geoportail(query, offset, paging) {
	
	debug("Entrée");
    
	
    var limit = mc.search.limit || 25;
    var viewport = "";

    if (!paging) {
        paging = mc.search.paging || 5;
    }
    
    if (!offset) {
        offset = 0;
    }

    var items = [];
    var counter = 0;

    if (mc.search.viewbox) {
        viewport = get_viewport(map);
    }
    
    //GET PAYLOAD
    var payload="<XLS xmlns=\"http://www.opengis.net/xls\" version=\"1.2\">"+
    "<RequestHeader sessionID=\"\"/>"+
    "<Request methodName=\"GeocodeRequest\" version=\"1.2\" requestID=\"\" maximumResponses=\"" + limit + "\">"+
    "<GeocodeRequest>"+
    "<Address countryCode=\"PositionOfInterest,StreetAddress\">"+
    "<freeFormAddress>"+query+"</freeFormAddress>"+
    "</Address>"+
    "</GeocodeRequest>"+
    "</Request></XLS>";

    //debug("Recherche OLS GEOPORTAIL: " + payload);
    $("div#search-results").html("<p>Recherche en cours...</p>");
    set_search_width();

    var url = 'http://wxs.ign.fr/$CLE/geoportail/ols?output=json&xls=' + encodeURI(payload);
	debug("Recherche OLS GEOPORTAIL: " + url);

    $.getJSON(url+"&callback=?", function (data) {
    	
    	// remove old results first
        $("div#search-results").html(""); 
        
    	 var xmlDoc = "";
    	 
    	 $.each( data, function( key, val ) {
    	 	if(key=="xml") xmlDoc=$.parseXML(val);
    	 });

        var $xml = $( xmlDoc );
        
        $xml.find('GeocodedAddress').each(function(){  
        	counter++; 
        	if (counter > offset && counter < offset + paging +1) 
            {  	
	        	var $geocoded = $(this);
	        	var commune = $geocoded.find("Place[type='Commune']").text();
	        	var municipality = $geocoded.find("Place[type='Municipality']").text();
	        	var nature = $geocoded.find("Place[type='Nature']").text();
	        	var codepostal = $geocoded.find("PostalCode").text();
	        	var _latlon = $geocoded.find("gml\\:pos, pos").text();
	        	var _bbox = $geocoded.find("Place[type='Bbox']").text().replace(/;/g , ",");
	        	var street = $geocoded.find("Street").text();
	        	var building = $geocoded.find("Building").attr("number");
	        	var qualite = $geocoded.find("Place[type='Qualite']").text();
	        	//debug("Lat Lon : " + _latlon);
	        	//debug("Commune : " + commune);
	        	//debug("Code Postal : " + codepostal);
	        	//debug("Nature : " + nature);
	        	//debug("Bounding Box : " + _bbox);
	        	//debug("Street : " + street);
	        	//debug("Building : " + building);
	        	//var boundingbox_patch = (lat-0.05) + "," + (lat+0.05) + "," + (lon-0.05) + "," + (lon+0.05);
	        	
	        	var latlon = _latlon.split(" ");
	        	var lat = latlon[0];
	        	var lon = latlon[1];
	        	
	        	var display_name = "";
	        	
	        	if(street!="")
	        	{
	        		display_name = building + " " + street + " ";
	        	}
	        	
	        	display_name += municipality + ", " + commune + " - " + codepostal;
	        	
	        	if(nature!="")
	        	{
	        		display_name += " (" + nature + ")";
	        	}

	        	if(qualite!="")
	        	{
	        		display_name += " (" + qualite + ")";
	        	}

				debug("Address: " + counter + ". " + display_name + " lat: " + lat + " lon: " + lon);
				
				var link = "<p><a title='lat,lon: " + lat + "," + lon + " ";
                link += "href='#' onclick='chooseAddrGeopo(" + _bbox + "," + lon + "," + lat + ", \"" + escapeHtmlEntities(display_name) + "\");return false;'>";
                link += (data.length == 1 ? "" : counter + ") "); // only one hit, no numbers
                link += display_name + "</a></p>";
                $("div#search-results").append(link);
                items.push(link);
        	}
        	
        	if (counter > offset && counter >= offset + paging +1 ) {
            	$("div#search-results").append("<hr/><a href='#' onclick='mc_search_geoportail(\"" + query + "\"," + (offset + paging) + ", " + paging + "); return false;'>Résultats supplémentaires...</a>");
        		return false;
        	}

        	
        });

        
        set_search_width();
       
        
        
        /*$.each(data, function (index, val) {
            counter++;
            if (index >= offset && index < offset + paging) 
            {
                if (items.length == 0) 
                {
                    $("div#search-results").append("<br/>");
                }
                debug("Address: " + index + ". " + val.display_name + " lat: " + val.lat + " lon: " + val.lon);

                var link = "<p><a title='lat,lon: " + val.lat + "," + val.lon + " [" + val["class"] + "]'";
                link += "href='#' onclick='chooseAddrBTLR(" + val.boundingbox + "," + val.lon + "," + val.lat + ", \"" + escapeHtmlEntities(val.display_name) + "\");return false;'>";
                link += (data.length == 1 ? "" : counter + ") "); // only one hit, no numbers
                link += val.display_name + "</a></p>";
                $("div#search-results").append(link);
                items.push(link);
            }
            
        });

    
        if (items.length == 0) {
            $("div#search-results").append("<p>No results found</p>");
        }

        
        else if (items.length == paging && offset + paging < counter) {
            $("div#search-results").append("<hr/><a href='#' onclick='mc_search_nominatim(\"" + query + "\"," + (offset + paging) + ", " + paging + "); return false;'>Résultats supplémentaires...</a>");
        }

        set_search_width();*/

    }).fail(function (data, textStatus, error) {
        debug("error nominatim search: " + url);
        debug("error nominatim: data: " + data + ", textStatus: " + textStatus + ", error: " + error);
        $("div#search-results").html("<p>Search with nominatim failed. Please try again later. Sorry!</p>" + "<p>" + error + "</p>");
        set_search_width();
    });
}

function escapeHtmlEntities(str) {
    // does not work with single or double quotes
    // var text = $('<div/>').text(str).html();
    var text = str.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

    debug("link text: " + text);
    return text;
}

/*
 * js/common.js
 *
 */

function parseParams(handler) {
    var perma = location.search.substr(1);
    if (perma != '') {
        var paras = perma.split('&');
        for (var i = 0; i < paras.length; i++) {
            var p = paras[i].split('=');
            handler(p[0], p[1]);
        }
    }
}

function getPosition() {
    var proj = state.proj4326; // proj4326
    var center = map.getCenter().clone().transform(map.getProjectionObject(), proj);
    return new MapPosition(
    Math.round(center.lon * 1000000) / 1000000, Math.round(center.lat * 1000000) / 1000000, map.getZoom());
}

/* the help window must be smaller than the main window
 * otherwise we don't see the cancel button on mobile devices
 */
function set_help_width() {
    var width = $(window).width();
    var height = $(window).height();

    if (width > 780) {
        width = 780;
    }
    var help_width = Math.floor(width * 0.95);

    debug("help width: " + help_width + " height: " + height);
    $("#tools-helpwin").width(help_width);
    $("#tools-helpwin").css("left", Math.floor(($(window).width() - help_width) / 2));

    $(".dialog-msg").height(height - 100);
}

$(document).ready(function () {
    if ($('#tools-helpwin').length == 0) return;

    // $('#tools-switcher').bind('change', chooseTool);
    // helper window, blocking
    $('#tools-helpwin').jqm({
        ajax: '@href',
        trigger: 'a.tools-helptrigger',
        overlay: 20,
        /* overlayClass: 'whiteOverlay', */
        onLoad: function (hash) {
            hash.w.jqmAddClose('.dialog-close');
            $("#tools-helpwin").css("top", 20); // always on top of a page
            debug("onLoad helpwin");
        }
    }).draggable();

    // search window, with input, moveable
    $('#tools-inputwin').jqm({
        ajax: '@href',
        trigger: 'a.tools-inputtrigger',
        overlay: 0,
        onLoad: function (hash) {
            hash.w.jqmAddClose('.dialog-close');
            $("#tools-inputwin").css("top", 20); // always on top of a page
            debug("onLoad inputwin");
        }
    }).draggable();
    $("span#fixed_info_icon").click(function () {
        $("div#hidden_link").show();
    });
    $("span#fixed_toggle_icon").click(function () {
        $("div#hidden_link").hide();
    });
});

/* ================================================== */

function MapPosition(lon, lat, zoom) {
    this.lon = lon;
    this.lat = lat;
    this.zoom = zoom;
}

MapPosition.prototype.getLonLat = function () {
    return new OpenLayers.LonLat(this.lon, this.lat);
}

MapPosition.prototype.tileX = function () {
    if ((this.zoom < 3) || (this.zoom > 18)) {
        return 0;
    }
    return Math.round((1 << (this.zoom - 3)) * (this.lon + 180.0) / 45.0);
}

MapPosition.prototype.tileY = function () {
    if ((this.zoom < 3) || (this.zoom > 18)) {
        return 0;
    }
    var l = this.lat / 180 * Math.PI;
    var pf = Math.log(Math.tan(l) + (1 / Math.cos(l)));
    return Math.round((1 << (this.zoom - 1)) * (Math.PI - pf) / Math.PI);
}

function createMapPositionFromTiles(x, y, zoom) {
    var lon;
    var lat;

    if ((zoom < 3) || (zoom > 18)) {
        lon = 0;
    } else {
        lon = (x + 0.5) * 45.0 / (1 << (zoom - 3)) - 180.0;
    }

    if ((zoom < 3) || (zoom > 18)) {
        lat = 0;
    } else {
        lat = Math.atan(sinh(Math.PI - (Math.PI * (y + 0.5) / (1 << (zoom - 1))))) * 180 / Math.PI;
    }

    return new MapPosition(lon, lat, zoom);
}

function sinh(x) {
    return (Math.exp(x) - Math.exp(-x)) / 2;
}

function createMapPosition(lon, lat, x, y, zoom) {
    if (x != null && y != null) {
        return createMapPositionFromTiles(x, y, zoom);
    } else if (lon != null && lat != null) {
        return new MapPosition(lon, lat, zoom);
    } else {
        return new MapPosition(0, 0, zoom);
    }
}

function valide_profile(p) {
    if (!p) {
        p = profile;
    }

    for (var alias in p) {
        if (mc.debug >= 2) debug("profile: " + alias + ", length: " + p[alias].mt.length);
        for (var i = 0; i < p[alias].mt.length; i++) {
            var type = p[alias].mt[i];
            if (!state.layertypes_hash[type]) {
                debug("profile: '" + alias + "', unknown map: " + type);
            }
        }
    }
}

/* EOF */