# D5LY - npm
# The fastest deflate compressor in npm

## Usage 

With [npm](https://npmjs.org/) installed, run:

    $ npm install d5ly

Then use:

For React:
```javascript
import d5ly from 'd5ly'
```

For NodeJS:
```javascript
d5ly = require('d5ly')
```

Then:
```javascript
d5ly.setup().then(
    (instance)=> {
      var sourceArray = new Uint8Array(1000000);
      sourceArray[4] = 45;
      sourceArray[9] = 32;
      console.log(sourceArray);
      var compressedArray = d5ly.deflateCompress(instance, sourceArray);
      console.log(compressedArray);
      var decompressedArray = d5ly.deflateDecompress(instance, compressedArray);
      console.log(decompressedArray);
      compressedArray = d5ly.zlibCompress(instance, sourceArray);
      console.log(compressedArray);
      decompressedArray = d5ly.zlibDecompress(instance, compressedArray);
      console.log(decompressedArray);
      compressedArray = d5ly.gzipCompress(instance, sourceArray);
      console.log(compressedArray);
      decompressedArray = d5ly.gzipDecompress(instance, compressedArray);
      console.log(decompressedArray);
    }
);
```

Speed test in compare with [pako](https://www.npmjs.com/package/pako) and [wasm-flate](https://www.npmjs.com/package/wasm-flate):
![Test](/image/test.jpg)
