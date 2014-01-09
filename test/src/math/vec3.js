"use strict";

module('vec3');

test('arrayToVec3', function() {
    var a = [8948.55, 788.57, 548.22, 3614.39, 451.257];
    var v = angie.math.arrayToVec3(a, 2);
    ok(v.x == 548.22 && v.y == 3614.39 && v.z == 451.257);
    
    v = angie.math.arrayToVec3(a);
    ok(v.x == 8948.55 && v.y == 788.57 && v.z == 548.22);
});

test('constructor', function() {
    var v = new angie.math.vec3();
    ok(v.x == 0);
    ok(v.y == 0);
    ok(v.z == 0);

    v = new angie.math.vec3(-0.0001);
    ok(v.x === -0.0001);
    ok(v.y === -0.0001);
    ok(v.z === -0.0001);

    v = new angie.math.vec3(1.78, -3.14159265359);
    ok(v.x === 1.78);
    ok(v.y === -3.14159265359);
    ok(v.z === 0);

    v = new angie.math.vec3(1.61803398875, -3.14159265359, 9999.999);
    ok(v.x === 1.61803398875);
    ok(v.y === -3.14159265359);
    ok(v.z === 9999.999);
});

test('toString', function() {
    var v = new angie.math.vec3();
    ok(v.toString() === '[0, 0, 0]');

    v = new angie.math.vec3(0.31, 2.1110, 0.5711);
    ok(v.toString() === '[0.31, 2.111, 0.5711]');
});

test('clone', function() {
    var v1 = new angie.math.vec3(21.15, 37.76, 55.91);
    var v2 = v1.clone();
    ok(v1.x === v2.x && v1.y === v2.y && v1.z === v2.z);
    
    v1.x = Math.random();
    v1.y = Math.random();
    v1.z = Math.random();
    v2 = v1.clone();
    ok(v1.x === v2.x && v1.y === v2.y && v1.z === v2.z);
});

test('toArray', function() {
    var v = new angie.math.vec3(12.51, 73.67, 91.55);
    var a = v.toArray();
    ok(a[0] === v.x && a[1] === v.y && a[2] === v.z);
    
    v.x = Math.random();
    v.y = Math.random();
    v.z = Math.random();
    a = v.toArray();
    ok(a[0] === v.x && a[1] === v.y && a[2] === v.z);
});

test('fromArray', function() {
    var v = new angie.math.vec3();
    var a = v.toArray();
    ok(a[0] === v.x && a[1] === v.y && a[2] === v.z);
    
    v.x = Math.random();
    v.y = Math.random();
    v.z = Math.random();
    a = v.toArray();
    ok(a[0] === v.x && a[1] === v.y && a[2] === v.z);
});

test('fromString', function() {
    var v = new angie.math.vec3();
	
	v.fromString('{1, 2, 3}');
	ok(v.x === 1 && v.y === 2 && v.z === 3);

    v.fromString('{1.564, 2.7951, 3.1415926}');
	ok(v.x === 1.564 && v.y === 2.7951 && v.z === 3.1415926);
	
	v.fromString('    {   1.23 ,     2   ,3.1415    }    ');
	ok(v.x === 1.23 && v.y === 2 && v.z === 3.1415);

	v.fromString('    {   1,     2.71   , 3    }    ');
	ok(v.x === 1 && v.y === 2.71 && v.z === 3);

	v.fromString('(1, 2, 3)');
	ok(v.x === 1 && v.y === 2 && v.z === 3);

	v.fromString('(1, 2,   3.087982   )    ');
	ok(v.x === 1 && v.y === 2 && v.z === 3.087982);
	
	v.fromString('  (    1    ,       2    ,   3   )    ');
	ok(v.x === 1 && v.y === 2 && v.z === 3);
	
	v.fromString('  (1,  2  ,  3)');
	ok(v.x === 1 && v.y === 2 && v.z === 3);
	
	v.fromString('(1, 2)');
	ok(v.x === 1 && v.y === 2 && isNaN(v.z));

	v.fromString('[1; 2; 3]', ';');
	ok(v.x === 1 && v.y === 2 && v.z === 3);

	v.fromString('[1.1, 2.5, 3.3]');
	ok(v.x === 1.1 && v.y === 2.5 && v.z === 3.3);

	v.fromString('    [     1.1   ,     2.5   ,   3.3   ]');
	ok(v.x === 1.1 && v.y === 2.5 && v.z === 3.3);
	
	
	// JSDoc cases
	v.fromString('{1.5555, 5, 18.0333}');
	ok(v.x === 1.5555 && v.y === 5 && v.z === 18.0333);

	v.fromString('{   2.1   , 9.9999,    10    }');
	ok(v.x === 2.1 && v.y === 9.9999 && v.z === 10);
	
	v.fromString('[ 3.1 , 9.9999, 10 ]');
	ok(v.x === 3.1 && v.y === 9.9999 && v.z === 10);
	
	v.fromString('(1,2,3)');
	ok(v.x === 1 && v.y === 2 && v.z === 3);
	
	v.fromString('(1,3)');
	ok(v.x === 1 && v.y === 3 && isNaN(v.z));
});

test('zyx', function() {
    var v = new angie.math.vec3(Math.random() * 100.0, -Math.random() * 100.0, -Math.random() * 100.0);
    var zyx = v.zyx();
    ok(zyx[0] === v.z && zyx[1] === v.y && zyx[2] === v.x);

    v = new angie.math.vec3(-Math.random() * 10000.0, Math.random() * 10000.0, Math.random() * 100000.0);
    zyx = v.zyx();
    ok(zyx[0] === v.z && zyx[1] === v.y && zyx[2] === v.x);
});

test('yxz', function() {
    var v = new angie.math.vec3(Math.random() * 100.0, -Math.random() * 100.0, -Math.random() * 100.0);
    var yxz = v.yxz();
    ok(yxz[0] === v.y && yxz[1] === v.x && yxz[2] === v.z);

    v = new angie.math.vec3(-Math.random() * 10000.0, Math.random() * 10000.0, Math.random() * 100000.0);
    yxz = v.yxz();
    ok(yxz[0] === v.y && yxz[1] === v.x && yxz[2] === v.z);
});

test('xyz', function() {
    var v = new angie.math.vec3(Math.random() * 100.0, -Math.random() * 100.0, -Math.random() * 100.0);
    var xyz = v.xyz();
    ok(xyz[0] === v.x && xyz[1] === v.y && xyz[2] === v.z);

    v = new angie.math.vec3(-Math.random() * 10000.0, Math.random() * 10000.0, Math.random() * 100000.0);
    xyz = v.xyz();
    ok(xyz[0] === v.x && xyz[1] === v.y && xyz[2] === v.z);
});

test('xy', function() {
    var v = new angie.math.vec3(Math.random() * 100.0, Math.random() * 100.0, -Math.random() * 1000.0 - 1.0);
    var xy = v.xy();
    ok(xy[0] === v.x && xy[1] === v.y);

    var v = new angie.math.vec3(-Math.random() * 10000.0, Math.random() * 100.0, -Math.random() * 1000.0 - 1.0);
    xy = v.xy();
    ok(xy[0] === v.x && xy[1] === v.y);
});

test('reset', function() {
    var v = new angie.math.vec3(Math.random() * 100.0, -Math.random() * 100.0, -Math.random() * 100.0);
    v.reset();
    ok(v.x === 0 && v.y === 0 && v.z === 0);
});

test('set', function() {
    var x = Math.random() * -10000.0;
    var y = Math.random() * 10000.0;
    var z = Math.random() * -10000.0;
    
    var v = new angie.math.vec3();
    v.set(x, y, z);
    ok(v.x === x && v.y === y && v.z === z);
});
