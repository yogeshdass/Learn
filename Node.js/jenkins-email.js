let xml2json = require('xml2js').parseString;
let fs = require('fs');
let _ = require('lodash');

fs.readFile('./Results/output.xml', 'UTF-8', (err, contents) => {
    xml2json(contents, (err, result) => {
        let testname = [];
        let teststatus = [];
        let length = _.get(result, 'robot.suite[0].test').length;
        let out = '';
        for (i = 0; i < length; i++) {
            let name_iteratee = `robot.suite[0].test[${i}].$.name`
            let status_iteratee = `robot.suite[0].test[${i}].status[0].$.status`;
            testname.push(_.get(result, name_iteratee));
            teststatus.push(_.get(result, status_iteratee));
            out = out + testname[i] + '  :      ' + teststatus[i] + '\n';
        }
        console.log(out);
        fs.writeFile('out', out, (err) => {
            if (err) {
                console.log(err);
            }
        })
    })
})
