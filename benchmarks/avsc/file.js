/* jshint node: true */

'use strict';

var file = require('../../lib/file'),
    fs = require('fs'),
    util = require('util');

// Buffer.prototype.toJSON = function () { return this.toString('binary'); };

var n = 0;
var time;
fs.createReadStream('dat/user-5000000.avro')
  .pipe(new file.streams.ContainerDecoder())
  .pipe(new file.streams.BlockDecoder())
  .on('data', function (record) {
    if (!time) {
      time = process.hrtime();
    }
    n++;
    if (record.name === null) {
      this.emit('error', new Error('no name'));
    }
  })
  .on('end', function () {
    time = process.hrtime(time);
    console.log(util.format('%s %s', n, time[0] + time[1] * 1e-9));
  });
