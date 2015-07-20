/*
 *  Geofabrik Tools
 *
 *  js/common.js
 *
 */


var mlon = null, mlat = null;



/* ================================================== */

var available_tools = [
    { id: 'map',  name: 'Map',           loc: true, marker: true },
    { id: 'mc',   name: 'Map Compare',   loc: true, marker: false },
    { id: 'osmi', name: 'OSM Inspector', loc: true, marker: true }
];

function createNewOption(value, text, selected) {
    var option = document.createElement('option');
    $(option).html(text);
    option.value = value;
    option.selected = selected;
    return option;
}

function chooseTool() {
    var chosen_tool = $.grep(available_tools, function(el, i) {
        return el['id'] == $('#tools-switcher').val();
    })[0];
    var link = '/' + chosen_tool['id'] + '/';
    if (chosen_tool['loc']) {
        var pos = getPosition();
        link += '?lon=' + pos.lon + '&lat=' + pos.lat + '&zoom=' + pos.zoom;
        if (chosen_tool['marker'] && mlon && mlat) {
            link += '&mlon=' + mlon + '&mlat=' + mlat;
        }
    }
    location.href = link;
}





/* ================================================== */

function getTileURL(bounds) {
    var res = this.map.getResolution();
    var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
    var z = this.map.getZoom();
    var limit = Math.pow(2, z);

    if (y < 0 || y >= limit) {
        return '/img/404.png';
    } else {
        x = ((x % limit) + limit) % limit;
        return this.url + z + "/" + x + "/" + y + "." + this.type;
    }
}

/* ================================================== */
