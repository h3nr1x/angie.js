/**
  * @fileOverview angie.js 
  * @author h3nr1x 
  * @version 0.1.0
  */
"use strict";

/**
 * Global function to create namespaces. 
 * Taken from: http://stackoverflow.com/a/10364220/1041822
 * @param {string} namespace - name of the namespace to create, in the form "foo.bar.zaz"
 * @returns {Object} representing the namespace
 */
function $namespace(namespace) {
    var object = this || window;
    var tokens = namespace.split(".");
    var token;
    while (tokens.length > 0) {
        token = tokens.shift();
        if (typeof object[token] === "undefined") {
            object[token] = {};
        }
        object = object[token];
    }
    return object;
}

$namespace('angie');

/**
 * This object is designed as a fallback mechanism for the not standard "console" object.
 * The angie.console object should be used only to log things for angie internals 
 * 
 * Based on from: http://stackoverflow.com/a/8883519/1041822
 */
angie.console = (function() {
    if (window.console == undefined) {
        return {
            debug: function(msg) {
                return true;
            },
            info: function(msg) {
                return true;
            },
            warn: function(msg) {
                return true;
            },
            log: function(msg) {
                return true;
            }, 
            error: function(msg) {
                return true;
            }
        };
    } else {
        return {
            debug: console.debug,
            info: console.info,
            warn: console.warn,
            log: console.log,
            error: console.error
        };        
    }
})();

function AngieLoadingException(msg) {
    console.error(msg);
}

/**
  * Taken from http://stackoverflow.com/a/950146/1041822
  */
angie.loadModule = function(containerElement, moduleUrl, callback) {
    // Create a script tag to insert the new module 
    var scriptElement = document.createElement('script');
    
    if (!containerElement) {
        containerElement = document.getElementsByTagName('head')[0];
    }
    
    scriptElement.type = 'text/javascript';
    scriptElement.src = moduleUrl;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    if (callback) { 
        scriptElement.onreadystatechange = callback;
        scriptElement.onload = callback;
    }

    // Fire the loading
    containerElement.appendChild(scriptElement);
};

angie.loadModules = function() { 
    var i, len, src;
    var scriptElement;
    var baseUrl;
    var fileName = 'angie.js';
    var fileNameLen = fileName.length;
    
    // First, grab the base url from this script 
    // Taken from: http://stackoverflow.com/a/2161526/1041822
    var scripts = document.getElementsByTagName('script');
    
    if (!scripts && scripts.length) {
        throw new AngieLoadingException("Couldn't find any <script> tags in this page, make sure you have declared a properly <script> tag which 'src' property points to a valid angie.js location. Can't load angie.js, loading stoped");
    }
    
    // Iterate backwards, so we will only take the most recent declaration
    for (i = scripts.length - 1; i >= 0; --i) {
        scriptElement = scripts[i];
        src = container.src;
        len = src.length;

        if (src.substr(len - fileNameLen) === fileName) {
            baseUrl = src.substr(0, len - fileNameLen);
            // break, if there are any additional 'angie.js' script tags before this one, ignore them
            break;
        }
    }    
    
if (parentGuest.nextSibling) {
  parentGuest.parentNode.insertBefore(childGuest, parentGuest.nextSibling);
}
else {
  parentGuest.parentNode.appendChild(childGuest);
}    
    
    for (var i = 0; i < arguments.length; i++) {
        angie.loadModule(scriptElement.parentNode, baseUrl + arguments[i] + '.js');
    }
}

// Load all the modules
angie.loadAllModules = function() { 
    angie.loadModules('math/vec3');
};

angie.loadAllModules();

