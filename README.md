# D5LY - npm
# The fastest deflate compressor in npm

## Usage 

With [npm](https://npmjs.org/) installed, run:

    $ npm install d5ly

Then use:

```javascript
d5ly = require('d5ly');
sourceArray = new Uint8Array(100000);
deflateCompressedArray = d5ly.deflate_compress(sourceArray);
deflateDecompressedArray = d5ly.deflate_decompress(deflateDecompressedArray);
zlibCompressedArray = d5ly.zlib_compress(sourceArray);
zlibDecompressedArray = d5ly.zlib_decompress(zlibCompressedArray);
gzipCompressedArray = d5ly.gzip_compress(sourceArray);
gzipDecompressedArray = d5ly.gzip_decompress(gzipCompressedArray);
```

