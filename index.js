d5ly = require('./d5ly')


function passArrayToWasm(instance, array, size) {
    const ptr = instance._malloc(size);
	if(!ptr) throw "Memory Error"
	instance.HEAPU8.set(array, ptr);
	return ptr;
}
function getArrayFromWasm(instance, ptr, len) {
	return instance.HEAPU8.subarray(ptr, ptr + len);
}

function getInt32(instance, uint8Pointer){
	return instance.HEAPU32[Math.ceil(uint8Pointer/4)]
}

function compress(instance, sourceArray, compressMethod) {
	var len = sourceArray.length;
	var sourcePointer = passArrayToWasm(instance, sourceArray, len * 2);
	var compressedSize = compressMethod(sourcePointer, len);
	var compressedArray = getArrayFromWasm(instance, sourcePointer+len, compressedSize).slice();
	instance._free(sourcePointer)
	return compressedArray;
}

function decompress(instance, compressedArray, decompressMethod) {
	var len = compressedArray.length;
	var compressedArrayPointer = passArrayToWasm(instance, compressedArray, len + 7);
	var decompressedSize = decompressMethod(compressedArrayPointer, len);
	decompressedArrayPointer = getInt32(instance, compressedArrayPointer + len)
	var decompressedArray = getArrayFromWasm(instance, decompressedArrayPointer, decompressedSize).slice();
	instance._free(compressedArrayPointer)
	instance._free(decompressedArrayPointer)
	return decompressedArray;
}

function deflate_compress(instance, sourceArray) {
	return compress(instance, sourceArray, instance._deflate_compress);
}
  
function deflate_decompress(instance, compressedArray) {
	return decompress(instance, compressedArray, instance._deflate_decompress);
}

function zlib_compress(instance, sourceArray) {
	return compress(instance, sourceArray, instance._zlib_compress);
}
  
function zlib_decompress(instance, compressedArray) {
	return decompress(instance, compressedArray, instance._zlib_decompress);
}

function gzip_compress(instance, sourceArray) {
	return compress(instance, sourceArray, instance._gzip_compress);
}
  
function gzip_decompress(instance, compressedArray) {
	return decompress(instance, compressedArray, instance._gzip_decompress);
}

exports.d5ly = d5ly;
exports.deflate_compress = deflate_compress;
exports.deflate_decompress = deflate_decompress;
exports.zlib_compress = zlib_compress;
exports.zlib_decompress = zlib_decompress;
exports.gzip_compress = gzip_compress;
exports.gzip_decompress = gzip_decompress;

