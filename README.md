# D5LY - npm
# The fastest deflate compressor in npm

## Usage 

With [npm](https://npmjs.org/) installed, run:

    $ npm install d5ly

Then use:

```javascript
d5ly = require('d5ly');
sourceArray = new Uint8Array(100000);
compressedArray = d5ly.deflate_compress(sourceArray);
decompressedArray = d5ly.deflate_decompress(compressedArray);
compressedArray = d5ly.zlib_compress(sourceArray);
decompressedArray = d5ly.zlib_decompress(compressedArray);
compressedArray = d5ly.gzip_compress(sourceArray);
decompressedArray = d5ly.gzip_decompress(compressedArray);
```
