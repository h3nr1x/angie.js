$namespace('angie.math');

/**
 * Takes an array and returns a {@link angie.math.vec3}
 * @param {number[]} - An array with at least 3 numbers
 * @param {number} [offset=0] - An offset from the init of the array from which the elements are readed
 * @returns An {@link angie.math.vec3} created from the array elements
 */ 
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

/**
 * Returns a new vec3 which components are the max values of the two vec3 arguments
 * Example: 
 * <pre>
 *    v = (2, 3, -5)
 *    w = (-1, 3, 20)
 *    max(v, w) = (2, 3, 20)
 * </pre>
 * @param {angie.math.vec3} - a vec3 
 * @param {angie.math.vec3} - another vec3
 * @returns A new {@link angie.math.vec3} with the max values from the parameters
 */
angie.math.vec3.max = function(v, w) {
    return new angie.math.vec3(v.x < w.x ? v.x : w.x, v.y < w.y ? v.y : w.y, v.z < w.z ? v.z : w.z);
}

/**
 * Returns a new vec3 which components are the min values of the two vec3 arguments
 * Example: 
 * <pre>
 *    v = (2, 3, -5)
 *    w = (-1, 3, 20)
 *    max(v, w) = (-1, 3, -5)
 * </pre>
 * @param {angie.math.vec3} - a vec3 
 * @param {angie.math.vec3} - another vec3
 * @returns A new {@link angie.math.vec3} with the min values from the parameters
 */
angie.math.vec3.min = function(v, w) {
    return new angie.math.vec3(v.x > w.x ? v.x : w.x, v.y > w.y ? v.y : w.y, v.z > w.z ? v.z : w.z);
}

/**
 * Does a {@link http://en.wikipedia.org/wiki/Linear_interpolation|linear interpolation}
 * between the two passed vectors and a t parameter. It returns:
 * <pre>
 *   (v1 - v0) * t + v0
 * </pre>
 * @param {angie.math.vec3} - This parameter represents the v0 vector of the above formula
 * @param {angie.math.vec3} - This parameter represents the v0 vector of the above formula
 * @param {number} - represents the t parameter of the above formula, its usually in the range [0, 1]
 * @returns A new {@link angie.math.vec3} resulting of the linear interpolation applied to the parameters 
 */ 
angie.math.vec3.lerp = function(v0, v1, t) {
    return new angie.math.vec3((v1.x - v0.x) * t + v0.x, (v1.y - v0.y) * t + v0.y, (v1.z - v0.z) * t + v0.z);
}

/**
 * Returns a new {@link angie.math.vec3} that represents the normalized version of the parameter
 * @param {angie.math.vec3} - The vector to normalize
 * @returns {angie.math.vec3} - A new {@link angie.math.vec3} that represents the normalized version of the parameter
 */
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
    
    /**
     * Clones the current {@link angie.math.vec3}
     * 
     * @returns {angie.math.vec3} - A new {@link angie.math.vec3} with a copy of this vec3
     */
    clone: function() { 
        return new angie.math.vec3(this.x, this.y, this.z);
    },

    /**
     * Copy the values from the parameter to this {angie.math.vec3}
     *
     * @param {angie.math.vec3} - A {@link angie.math.vec3} with the values to copy from
     * @returns {angie.math.vec3} - The current {angie.math.vec3} after the modification
     */ 
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
    
    /**
     * Calculates the sum of the current {@link angie.math.vec3} and a passed parameter (scalar or another {@link angie.math.vec3})
     * @param {number|angie.math.vec3} - The value to add
     * @returns {angie.math.vec3} - The current {@link angie.math.vec3} after the applied sum
     * @see {@link angie.math.vec3#addv}
     * @see {@link angie.math.vec3#adds}
     */ 
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

    /**
     * Calculates the sum of the current {@link angie.math.vec3} and another {@link angie.math.vec3}.
     * This version of the 'add' operation should perform faster than {@link angie.math.vec3#add} due to
     * the lack of type checking 
     * 
     * @param {angie.math.vec3} - The value to add
     * @returns {angie.math.vec3} - The current {@link angie.math.vec3} after the applied sum
     * @see {@link angie.math.vec3#add}
     * @see {@link angie.math.vec3#adds}
     */ 
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

    /**
     * Calculates the squared length of the current {@link angie.math.vec3}:
     * <pre>
     *   x * x + y * y + z * z 
     * </pre>
     * @returns {number} - That represents the squared length of this {@link angie.math.vec3}
     */  
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
    
    /**
     * Calculates the {@link http://en.wiktionary.org/wiki/Manhattan_distance|Manhattan Distance} of this {@link angie.math.vec3} to
     * another {@link angie.math.vec3} 
     * <pre>
     *    | v.x - u.x | + | v.y - u.y | + | v.z - u.z |
     * </pre>
     * @param {angie.math.vec3} - The vector to measure the distance from
     * @returns {number} - Representing the Manhanttan Distance of the current vector
     */
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
    
    /**
     * Calculates the angle between the current {@link angie.math.vec3} an another {@link angie.math.vec3}.
     * For that it uses the following relation:
     * <pre>
     *                    u . v
     *    cos(alpha) = -----------
     *                 ||u|| ||v||
     * </pre>
     * Neither this {@link angie.math.vec3} nor the parameter are modified during the operation. Both elements are
     * cloned prior to their normalization an angle calculation.
     * 
     * @param {angie.math.vec3} - The vector that forms the angle with this {@link angie.math.vec3}
     * @returns 
     */ 
    angle: function(v) {
        var v0 = this.clone().normalize();
        var v1 = v.clone().normalize();
        return Math.acos(v0.dot(v1));
    },
    
    /**
     * Calculates the projection of another vector passed as parameter
     * upon the current {@link angie.math.vec3}.
     * <pre>
     *                                   /        \
     *                                  |    v    |     u.v
     *   proj<sub>u</sub><sup>v</sup> = |  -----  | . -------
     *                                  | || v || |   || u ||
     *                                   \       /
     * </pre>
     * Where v is the parameter and u is this (the current {@link angie.math.vec3}).<br>
     * Neither this {@link angie.math.vec3} nor the parameter are modified during the operation. Both elements are
     * cloned prior to the calculation.
     * 
     * @param {angie.math.vec3} - The v vector, the vector that is being projected upon this vector
     * @return {angie.math.vec3} - Representing the projection of the v vector upon this vector
     */
    project: function(v) {
        var vp = v.clone().normalize();
        var u_dot_v = this.dot(v) / this.length();
        return vp.muls(u_dot_v);
    },

    perp: function(v) {
        return v.subv(this.project(v));
    },
    
    reflect: function(v) {
        
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
