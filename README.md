# D5LY - npm
# The fastest deflate compressor in npm

## Usage 

With [npm](https://npmjs.org/) installed, run:

    $ npm install d5ly

Then use:

```javascript
d5ly = require('d5ly');
sourceArray = new Uint8Array(100000);
compressedArray = d5ly.compress(sourceArray);
decompressedArray = d5ly.decompress(compressedArray);
```
