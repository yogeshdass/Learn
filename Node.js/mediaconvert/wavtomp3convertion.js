const AWS = require('aws-sdk');
const fs =  require('fs');
const wget = require('wget-improved');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const s3 = new AWS.S3({
  accessKeyId : "AKIAI6M3M3LRWMHYC5BA",
  secretAccessKey: "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"
});
const buck = "rohit1112"

let surl = 'https://s3.amazonaws.com/'+buck;
const options = {};

let listparams = { Bucket: buck };
s3.listObjects(listparams, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
        for (let i=0; i<data.Contents.length; i++) {

            let track = data.Contents[i].Key;
            let newfname = track.replace("wav", "mp3");
            let checkparams = {
                Bucket: buck, 
                Key: newfname
            };
            s3.headObject(checkparams, function(err, data) {
                if (err) {
                    console.log("File not present");  // an error occurred
                    function resolveAfter1Seconds(x) {
                        return new Promise(resolve => {
                          setTimeout(() => {

                            let parms = { Bucket: buck, Key: track };
                            let src = surl+"/"+track;
                            console.log(src);
                            let download = wget.download(src, track, options);
                                download.on('error', function(err) {
                                        console.log(err);
                                });
                                download.on('end', function(output) {
                                    console.log('Converting: ' + track);
                                ffmpeg(track)
                                .toFormat('mp3')
                                .on('error', (err) => {
                                    console.log('An error occurred: ' + err.message);
                                })
                                .on('progress', (progress) => {
                                    console.log('Converting: ' + progress.targetSize + ' KB converted');
                                })
                                .on('end', () => {
                                    console.log('Convertion finished !');
                                    resolve(x);   
                                })
                                .save(newfname);
                                
                                console.log(output);
                                });

                            
                          }, 2000);
                        });
                      };
                      function resolveAfter2Seconds(x) {
                        return new Promise(resolve => {
                          setTimeout(() => {
                            fs.readFile(newfname, function (err, data) {
                              if (err) { throw err; }
                                  params = {Bucket: buck, Key: newfname, Body: data };
                                  s3.putObject(params, function(err, data) {
                                      if (err) {
                                          console.log(err)
                                      } else {
                                          console.log("Successfully uploaded: " + newfname);
                                          resolve(x);
                                      }
                                  });
                              });
                            
                          }, 2000);
                        });
                      };  
                      
                      var procx = async function(x) { // async function expression assigned to a variable
                        var a = await resolveAfter1Seconds(20);
                        var b = await resolveAfter2Seconds(30);
                        return b;
                      };
                      
                      procx(10).then(v => {});
                    
                } 
                else console.log("File present");          // successful response
            });
        }
    }        
 });


