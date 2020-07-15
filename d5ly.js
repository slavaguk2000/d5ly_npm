
var factory = require('./d5ly_node.js');
d5ly_ = factory()

function passArrayToWasm(array, size) {
    const ptr = d5ly_._malloc(size);
	if(!ptr) throw "Memory Error"
	d5ly_.HEAPU8.set(array, ptr);
	return ptr;
}
function getArrayFromWasm(ptr, len) {
	return d5ly_.HEAPU8.subarray(ptr, ptr + len);
}

function getInt32(uint8Pointer){
	return d5ly_.HEAPU32[Math.ceil(uint8Pointer/4)]
}

function compress(sourceArray) {
  var len = sourceArray.length;
	var sourcePointer = passArrayToWasm(sourceArray, len * 2);
	var compressedSize = d5ly_._compress(sourcePointer, len);
	var compressedArray = getArrayFromWasm(sourcePointer+len, compressedSize).slice();
	d5ly_._free(sourcePointer)
	return compressedArray;
}

function decompress(compressedArray) {
	var len = compressedArray.length;
	var compressedArrayPointer = passArrayToWasm(compressedArray, len + 7);
	var decompressedSize = d5ly_._decompress(compressedArrayPointer, len);
	decompressedArrayPointer = getInt32(compressedArrayPointer + len)
	var decompressedArray = getArrayFromWasm(decompressedArrayPointer, decompressedSize).slice();
	d5ly_._free(compressedArrayPointer)
	d5ly_._free(decompressedArrayPointer)
	return decompressedArray;
}

d5ly_['onRuntimeInitialized'] = function() {
	exports.compress = compress;
	exports.decompress = decompress;
}


