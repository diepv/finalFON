/**
 * Created by viviandiep on 4/26/15.
 */

var key = "94cc7cf5-151b-4789-ba95-55cdc34ff98d";
var url = "https://api.semantria.com/phrases.json?config_id="+key;

exports.getSentimental = function(req,res){
var body = req.body.text;
    var sent = require('sentiment');

    console.log(body);
    var processed = sent(body);
    console.log('processed',processed);
    res.send(processed);

};
