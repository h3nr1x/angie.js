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
            }
        };
    } else {
        return {
            debug: console.debug,
            info: console.info,
            warn: console.warn,
            log: console.log
        };        
    }
})();

/**
 * Namespace for the mathematical classes
 * 
 * @namespace angie.math
 */
$namespace('angie.math');

angie.math.arrayToVec3 = function(array, offset) {
    var index = offset || 0;
    return new angie.math.vec3(array[index + 0], this.y = array[index + 1], this.z = array[index + 2]);
}

/**
 * Constructor for a 3 component vector (the typename uses the
 * GLSL datatype name convention, abbreviated lowercase names).
 * This constructor support not parameters construction, in which case all components
 * are defaulted to 0.0. One parameter construction, in which case all components
 * are initialized to the same value, and the 3 parameter construnction.
 * <pre>
 *   // All components are 0.0
 *   var v1 = new angie.math.vec3();
 *   // All components are 1.0   
 *   var v2 = new angie.math.vec3(1.0);
 *   // Components values are 1.0, 2.0 and 3.0
 *   var v3 = new angie.math.vec3(1.0, 2.0, 3.0);
 * </pre>
 *
 * @constructor
 * @this {angie.math.vec3}
 * @param {number} [x=0.0] - value of the x coordinate for this vector (default value is 0.0)
 * @param {number} [y=x or 0.0] - value of the y coordinate for this vector (default value is x if x is supplied, 0.0 if not)
 * @param {number} [z=x or 0.0] - value of the z coordinate for this vector (default value is x if x is supplied, 0.0 if not)
 */
angie.math.vec3 = function(x, y, z) {
    // Add support for one parameter constructor
    this.x = x || 0.0;
    this.y = y || x || 0.0;
    this.z = z || (y ? 0.0 : this.x);
};

angie.math.vec3.max = function(v, w) {
    return new angie.math.vec3(v.x < w.x ? v.x : w.x, v.y < w.y ? v.y : w.y, v.z < w.z ? v.z : w.z);
}

angie.math.vec3.min = function(v, w) {
    return new angie.math.vec3(v.x > w.x ? v.x : w.x, v.y > w.y ? v.y : w.y, v.z > w.z ? v.z : w.z);
}

angie.math.vec3.lerp = function(v0, v1, t) {
    return new angie.math.vec3((v1.x - v0.x) * t + v0.x, (v1.y - v0.y) * t + v0.y, (v1.z - v0.z) * t + v0.z);
}

angie.math.vec3.norm = function(v) {
    return v.clone().normalize();
}

angie.math.vec3.prototype = { 
    // Constructor
    constructor: angie.math.vec3,

    // Properties
    x: this.x,
    y: this.y,
    z: this.z,        
    
    // Object operations
    
    /**
     * @override
     * @this {angie.math.vec3}
     * @return {string} Human-readable representation of this vec3. In the form "[x, y, z]"
     */
    toString: function() { 
        return "[" + this.x + ", " + this.y + ", " + this.z + "]";
    },
    
    clone: function() { 
        return new angie.math.vec3(this.x, this.y, this.z);
    },

    copy: function(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
    },

    // Utility operations
    
    /**
     * This function is the same as {@link angie.math.vec3#xyz}
     * @returns {number[]} An array of three elements that represents the coordinates of this vector in the order (x, y, z).
     *          for different order triplets see {@link angie.math.vec3#zyx} and the other swizzle functions
     * @see angie.math.vec3#xyz         
     */ 
    toArray: function() { 
        return this.xyz();
    },

    /**
     * Takes an array as a parameter and read the vector component values from it starting from the giving offset as index, if
     * no offset is passed to the function, the values are read from the starting position 0
     * 
     * @param {Array} array - an array that, at least, should contains 3 numbers
     * @param {number} [offset = 0] - a offset from which the array values should start being read
     */ 
    fromArray: function(array, offset) {
        var index = offset || 0; 
        this.x = array[index + 0];
        this.y = array[index + 1];
        this.z = array[index + 2];
    },
    
    /**
     * Takes a string containing 3 numbers separated by "," (and optionally enclosed by "{", "(" or "[")
     * and converts it to a vec3. This function should be able to parse things like:
     * <pre>
     * {1.5555, 5, 18.0333}
     * {   2.1   , 9.9999,    10    }
     * [ 3.1 , 9.9999, 10 ]
     * (1,2,3)
     * (1,3)
     * </pre>
     * @param {string} string - a string representing a vector
     * @returns {angie.math.vec3} a vec3 represented by the string
     */
    fromString: function(string, separator) {
        if (string) {
            var sep = separator || ",";
            var tokens = string.split(sep);
            var tokenX = tokens[0];
            var tokenZ = tokens[2];
            var i, len, temp, c;
            if (tokenX) {
                // Delete any "[", "(" and "{"
                len = tokenX.length;
                temp = '';
                for (i = 0; i < len; i++) {
                    c = tokenX[i];
                    if (c !== ' ' && c !== '[' && c !== '{' && c !== '(') {
                        temp += c;
                    }
                }
                tokenX = temp;
            }
            if (tokenZ) {
                // Delete any "]", ")" and "}"
                len = tokenZ.length;
                temp = '';
                for (i = 0; i < len; i++) {
                    c = tokenZ[i];
                    if (c !== ' ' && c !== ']' && c !== '}' && c !== ')') {
                        temp += c;
                    }
                }
                tokenZ = temp;
            }
            // Keep the posible "NaN" that could be returned by the parseFloat function, to avoid silent errors
            this.x = parseFloat(tokenX);
            this.y = parseFloat(tokens[1]);
            this.z = parseFloat(tokenZ);
        } else {
            angie.console.warn("In function fromString, the parameter is empty");
        }
    },
    
    /**
     * A swizzle function, returns an array containing a copy of the coordinates values for this vector in the order (z, y, x)
     * @returns {number[]} An array of three elements that represents the coordinates of this vector in the order (z, y, x).
     */ 
    zyx: function() { 
        return [this.z, this.y, this.x];
    },    

    /**
     * A swizzle function, returns an array containing a copy of the coordinates values for this vector in the order (y, x, z)
     * @returns {number[]} An array of three elements that represents the coordinates of this vector in the order (y, x, z).
     */ 
    yxz: function() { 
        return [this.y, this.x, this.z];
    },

    /**
     * A swizzle function, returns an array containing a copy of the coordinates values for this vector in the order (x, y, z)
     * @returns {number[]} An array of three elements that represents the coordinates of this vector in the order (x, y, z).
     */ 
    xyz: function() { 
        return [this.x, this.y, this.z];
    },

    /**
     * A swizzle function, returns a two component array containing a copy of the coordinates values for this vector in the order (x, y)
     * @returns {number[]} An array of two elements that contains the x, y coordinates of this vector in the order (x, y).
     */ 
    xy: function() { 
        return [this.x, this.y];
    },

    /**
     * Set the vector components to 0.0
     */
    reset: function() {
        this.x = 0.0;
        this.y = 0.0;
        this.z = 0.0;
    },

    /**
     * Set the components for this vector to the specified parameters
     * @param {number} x - The x coordinate value for this vector
     * @param {number} y - The y coordinate value for this vector
     * @param {number} z - The z coordinate value for this vector
     */
    set: function(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }, 

    /**
     * Sets the x component for this vector, the value of the specified parameter
     * @param {number} x - The new value for this vector x coordinate
     */    
    setX: function(x) {
        this.x = x;  
    },

    /**
     * Sets the y component for this vector, the value of the specified parameter
     * @param {number} y - The new value for this vector y coordinate
     */
    setY: function(y) {
        this.y = y;  
    },
    
    /**
     * Sets the z component for this vector, the value of the specified parameter
     * @param {number} z - The new value for this vector z coordinate
     */
    setZ: function(z) {
        this.z = z;  
    },    
    
    add: function(v) {
        if (v.x) {  
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
        } else {
            this.x += v;
            this.y += v;
            this.z += v;
        }
        return this;
    },

    addv: function(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    },    
    
    adds: function(scalar) {
        this.x += scalar;
        this.y += scalar;
        this.z += scalar;
        return this;
    },
    
    sub: function(v) {
        if (v.x) {
            this.x -= v.x;
            this.y -= v.y;
            this.z -= v.z;
        } else {
            this.x -= v;
            this.y -= v;
            this.z -= v;
        }
        return this;
    },
    
    subs: function(scalar) {
        this.x -= scalar;
        this.y -= scalar;
        this.z -= scalar;
        return this;
    },

    subv: function(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    },
    
    mul: function(v) {
        if (v.x) {
            this.x *= v.x;
            this.y *= v.y;
            this.z *= v.z;
        } else {
            this.x *= v;
            this.y *= v;
            this.z *= v;
        }
        return this;
    },
    
    muls: function(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        this.z *= scalar;
        return this;
    },

    mulv: function(v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
        return this;
    },
    
    div: function(v) {
        if (v.x) {
            this.x /= v.x;
            this.y /= v.y;
            this.z /= v.z;
        } else {
            this.x /= v;
            this.y /= v;
            this.z /= v;            
        }
        return this;
    },
    
    divs: function(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        this.z /= scalar;
        return this;
    },
    
    divv: function(v) {
        this.x /= v.x;
        this.y /= v.y;
        this.z /= v.z;
        return this;
    },
    
    dot: function(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;    
    },
    
    cross: function(v) {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        return new angie.math.vec3(y * v.z - z * v.y, z * v.x - x * v.z, x * v.y - y * v.x);
    },
    
    neg: function() {
        this.x *= -1.0;
        this.y *= -1.0;
        this.z *= -1.0;
        return this;
    },
    
    negate: function() {
        return this.neg();
    },

    length2: function() {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        return x * x + y * y + z * z;
    },

    lengthSqr: function() {
        return this.length2();
    },
    
    setLength: function(l) {
        this.normalize();
        this.x *= l;
        this.y *= l;
        this.z *= l;        
    },
    
    length: function() {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        return Math.sqrt(x * x + y * y + z * z);
    },

    distance: function(v) {
        var dx = v.x - this.x;
        var dy = v.y - this.y;
        var dz = v.z - this.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    },

    distance2: function(v) {
        var dx = v.x - this.x;
        var dy = v.y - this.y;
        var dz = v.z - this.z;
        return dx * dx + dy * dy + dz * dz;
    },
    
    distanceSqr: function(v) {
        return this.distance2(v);
    },
    
    manhattanDist: function(v) {
        return Math.abs(v.x - this.x) + Math.abs(v.y - this.y) * Math.abs(v.z - this.z);
    },
    
    clamp: function(min, max) {
        var x = this.x
        var y = this.y;
        var z = this.z;
        if (x < min) {
            this.x = min;
        } else if (x > max) {
            this.x = max;
        }
        
        if (y < min) {
            this.y = min;
        } else if (y > max) {
            this.y = max;
        }
        
        if (z < min) {
            this.z = min;
        } else if (z > max) {
            this.z = max;
        }
        return this;        
    },
    
    angle: function(v) {
        var v0 = this.clone().normalize();
        var v1 = v.clone().normalize();
        return Math.acos(v0.dot(v1));
    },

    projection: function() {
        
    },
    
    isNormalized: function() {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var l = Math.sqrt(x * x + y * y + z * z);
        return Math.abs(1.0 - l) < 0.000000001;
    },
    
    normalize: function() {
        var x = this.x;
        var y = this.y;
        var z = this.z;
        var l = Math.sqrt(x * x + y * y + z * z);
        
        if (l !== 0.0) {
            this.x = x / l;
            this.y = y / l;
            this.z = z / l;
        }
        return this;
    },
};

