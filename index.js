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

function deflateCompress(instance, sourceArray) {
	return compress(instance, sourceArray, instance._deflate_compress);
}
  
function deflateDecompress(instance, compressedArray) {
	return decompress(instance, compressedArray, instance._deflate_decompress);
}

function zlibCompress(instance, sourceArray) {
	return compress(instance, sourceArray, instance._zlib_compress);
}
  
function zlibDecompress(instance, compressedArray) {
	return decompress(instance, compressedArray, instance._zlib_decompress);
}

function gzipCompress(instance, sourceArray) {
	return compress(instance, sourceArray, instance._gzip_compress);
}
  
function gzipDecompress(instance, compressedArray) {
	return decompress(instance, compressedArray, instance._gzip_decompress);
}

exports.setup = d5ly;
exports.deflateCompress = deflateCompress;
exports.deflateDecompress = deflateDecompress;
exports.zlibCompress = zlibCompress;
exports.zlibDecompress = zlibDecompress;
exports.gzipCompress = gzipCompress;
exports.gzipDecompress = gzipDecompress;

