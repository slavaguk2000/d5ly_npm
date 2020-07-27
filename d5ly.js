
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

function compress(sourceArray, compressMethod) {
	var len = sourceArray.length;
	var sourcePointer = passArrayToWasm(sourceArray, len * 2);
	var compressedSize = compressMethod(sourcePointer, len);
	var compressedArray = getArrayFromWasm(sourcePointer+len, compressedSize).slice();
	d5ly_._free(sourcePointer)
	return compressedArray;
}

function decompress(compressedArray, decompressMethod) {
	var len = compressedArray.length;
	var compressedArrayPointer = passArrayToWasm(compressedArray, len + 7);
	var decompressedSize = decompressMethod(compressedArrayPointer, len);
	decompressedArrayPointer = getInt32(compressedArrayPointer + len)
	var decompressedArray = getArrayFromWasm(decompressedArrayPointer, decompressedSize).slice();
	d5ly_._free(compressedArrayPointer)
	d5ly_._free(decompressedArrayPointer)
	return decompressedArray;
}

function deflate_compress(sourceArray) {
	return compress(sourceArray, d5ly_._deflate_compress);
}
  
function deflate_decompress(compressedArray) {
	return decompress(compressedArray, d5ly_._deflate_decompress);
}

function zlib_compress(sourceArray) {
	return compress(sourceArray, d5ly_._zlib_compress);
}
  
function zlib_decompress(compressedArray) {
	return decompress(compressedArray, d5ly_._zlib_decompress);
}

function gzip_compress(sourceArray) {
	return compress(sourceArray, d5ly_._gzip_compress);
}
  
function gzip_decompress(compressedArray) {
	return decompress(compressedArray, d5ly_._gzip_decompress);
}

d5ly_['onRuntimeInitialized'] = function() {
	exports.deflate_compress = deflate_compress;
	exports.deflate_decompress = deflate_decompress;
	exports.zlib_compress = zlib_compress;
	exports.zlib_decompress = zlib_decompress;
	exports.gzip_compress = gzip_compress;
	exports.gzip_decompress = gzip_decompress;
}


