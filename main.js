/**
 * Created by viviandiep on 4/22/15.
 */
var mongo = require('mongodb');
var Server = mongo.Server;
Db = mongo.Db;
BSON = mongo.BSONPure;

var http = require('http');
var https = require('https');
//var filesys = require('fs');
var server = new Server('localhost',27017,{auto_reconnect:true, safe: true});
var db = new Db('finalFON', server);

exports.page = function(req,res){
    res.send("HEEEEE");
 console.log("aloha");
};

function getTestData(){
    var x = [{
        userName:'viviandiep',
        _id:'122',
        datePublished:new Date(),
        replies:['123'],
        score:'+120',
        text:[
            {
                type:'string',
                wordHTML:"hello",
                spanClass:''
            },
            {
                type:'html',
                wordHTML:"goodbye",
                spanClass:'neg'
            }
        ]
    },
    {
        userName:'viviandiep',
        _id:'123',
        datePublished:new Date(),
        replies:[
            {
                userName:'bebop',
                _id:'122',
                datePublished:new Date(),
                replies:['1'],
                score:'+120',
                text:[
                    {
                        type:'string',
                        wordHTML:"lizze",
                        spanClass:''
                    },
                    {
                        type:'html',
                        wordHTML:"biddy",
                        spanClass:'neg'
                    }
                ]
            }
        ],
        score:'+120',
        text:[
            {
                type:'string',
                wordHTML:"hello",
                spanClass:''
            },
            {
                type:'html',
                wordHTML:"goodbye",
                spanClass:'neg'
            }
        ]
    }
    ];
}

//exports.newComment = function(req,res){
//    //a new comment was posted and needs to be saved
//    var textBody = req.body.comment;
//    var commentEntry = {
//        userName:'',
//        datePublished:new Date(),
//        replies:[],
//        score:'',
//        text:[]
//    };
//    var word = {
//        type:'will be string or html',
//        wordHTML:"",
//        spanClass:""
//    };
//    var stringArray = textBody.split(' ');
//    //for each word in the String Array..
//
//};
//
exports.addCommentToDb = function(req,res){
    var page = {
        permalink: '',
        id: "1",
        pageContents: {
            title: 'Hello Goodbye',
            article: '123456789`1234567 123456 123456y7 1234567',
            byLine: "janet jackson"
        },
        comments: [{
            userName:'Keith Singer',
            datePublished: new Date(),
            replies:[{
                userName:'Gary Reynolds',
                datePublished: new Date(),
                replies:[],
                score:'+2',
                text:[]
            }],
            score:'+13',
            text:[]
        }]
    };
    var text = "Here's an idea... show me ALL the posts from ALL my friends and ALL of the pages I have \"Liked\" in the order in which they were posted. NOT what you Facebook thinks I would be interested in 3 days later. FAHK FACEBOOK";
    var replyText ="All of you that think my post is drama, look at the Verizon-AOL merger. It's all about money. Gullibility and greed go hand in hand. PAY UP!!! Hilarious!!!";
    text = text.split(' ');
    replyText = replyText.split(' ');
    text.forEach(function(word){
        var span;
        getSentiment(word, function(result){
            var strippedWord = word.replace(/[!?'",.].*/g,'');
            if(result.score!==0){
                if(result.positive.length>0){
                    span ='pos' ;//"<span class='pos'>"+word+"</span>";
                }else{
                    if(swears.indexOf(strippedWord)>-1){
                        span = 'hearts';//"<span class='hearts'>"+word+"</span>";
                    }else{
                        span = 'neg';//"<span class='neg'>"+word+"</span>";
                    }

                }
            }
                var txt = {
                    type:'html',
                    wordHTML:word,
                    spanClass:span
                };
            page.comments[0].text.push(txt);
        });

    });
    replyText.forEach(function(word){
        var span;
        getSentiment(word, function(result){
            var strippedWord = word.replace(/[!?'",.].*/g,'');
            if(result.score!==0){
                if(result.positive.length>0){
                    span ='pos' ;//"<span class='pos'>"+word+"</span>";
                }else{
                    if(swears.indexOf(strippedWord)>-1){
                        span = 'hearts';//"<span class='hearts'>"+word+"</span>";
                    }else{
                        span = 'neg';//"<span class='neg'>"+word+"</span>";
                    }

                }
            }
            var txt = {
                type:'html',
                wordHTML:word,
                spanClass:span
            };
            page.comments[0].replies[0].text.push(txt);
        });

        console.log(JSON.stringify(page));

    });
    //db.collection('pages', function(error, collection){
    //    collection.update({id:'1',comments:comment},{w:1},function(err){
    //        if(err){
    //            console.log('err',err);
    //        }
    //    });
    //});
};

    function getSentiment(word, callback){

            var sent = require('sentiment');

            console.log(word);
            var processed = sent(word);
            console.log('processed',processed);
        callback(processed);

    }

    function getSwears(word, callback){

    }
exports.addPage = function(req,res){
    console.log('adddd');
    var page = {
        permalink: '',
        id: "1",
        pageContents: {
            title: 'Hello Goodbye',
            article: '123456789`1234567 123456 123456y7 1234567',
            byLine: "janet jackson"
        },
        comments: []
    };
    db.collection('pages', function(error, collection){
        collection.insert(page,function(err){
            if(err){
                console.log('err',err);
            }else{
                res.send(true);
            }
        });
    });
};
exports.getPage = function(req, res){
    var page = {"permalink":"","id":"1","pageContents":{"title":"Hello Goodbye","article":"123456789`1234567 123456 123456y7 1234567","byLine":"janet jackson"},"comments":[{"userName":"Keith Singer","datePublished":"2015-05-13T15:03:08.307Z","replies":[{"userName":"Gary Reynolds","datePublished":"2015-05-13T15:03:08.307Z","replies":[],"score":"+2","text":[{"type":"html","wordHTML":"All"},{"type":"html","wordHTML":"of"},{"type":"html","wordHTML":"you"},{"type":"html","wordHTML":"that"},{"type":"html","wordHTML":"think"},{"type":"html","wordHTML":"my"},{"type":"html","wordHTML":"post"},{"type":"html","wordHTML":"is"},{"type":"html","wordHTML":"drama,"},{"type":"html","wordHTML":"look"},{"type":"html","wordHTML":"at"},{"type":"html","wordHTML":"the"},{"type":"html","wordHTML":"Verizon-AOL"},{"type":"html","wordHTML":"merger."},{"type":"html","wordHTML":"It's"},{"type":"html","wordHTML":"all"},{"type":"html","wordHTML":"about"},{"type":"html","wordHTML":"money."},{"type":"html","wordHTML":"Gullibility","spanClass":"neg"},{"type":"html","wordHTML":"and"},{"type":"html","wordHTML":"greed","spanClass":"neg"},{"type":"html","wordHTML":"go"},{"type":"html","wordHTML":"hand"},{"type":"html","wordHTML":"in"},{"type":"html","wordHTML":"hand."},{"type":"html","wordHTML":"PAY","spanClass":"neg"},{"type":"html","wordHTML":"UP!!!"},{"type":"html","wordHTML":"Hilarious!!!","spanClass":"pos"}]}],"score":"+13","text":[{"type":"html","wordHTML":"Here's"},{"type":"html","wordHTML":"an"},{"type":"html","wordHTML":"idea..."},{"type":"html","wordHTML":"show"},{"type":"html","wordHTML":"me"},{"type":"html","wordHTML":"ALL"},{"type":"html","wordHTML":"the"},{"type":"html","wordHTML":"posts"},{"type":"html","wordHTML":"from"},{"type":"html","wordHTML":"ALL"},{"type":"html","wordHTML":"my"},{"type":"html","wordHTML":"friends"},{"type":"html","wordHTML":"and"},{"type":"html","wordHTML":"ALL"},{"type":"html","wordHTML":"of"},{"type":"html","wordHTML":"the"},{"type":"html","wordHTML":"pages"},{"type":"html","wordHTML":"I"},{"type":"html","wordHTML":"have"},{"type":"html","wordHTML":"\"Liked\"","spanClass":"pos"},{"type":"html","wordHTML":"in"},{"type":"html","wordHTML":"the"},{"type":"html","wordHTML":"order"},{"type":"html","wordHTML":"in"},{"type":"html","wordHTML":"which"},{"type":"html","wordHTML":"they"},{"type":"html","wordHTML":"were"},{"type":"html","wordHTML":"posted."},{"type":"html","wordHTML":"NOT"},{"type":"html","wordHTML":"what"},{"type":"html","wordHTML":"you"},{"type":"html","wordHTML":"Facebook"},{"type":"html","wordHTML":"thinks"},{"type":"html","wordHTML":"I"},{"type":"html","wordHTML":"would"},{"type":"html","wordHTML":"be"},{"type":"html","wordHTML":"interested","spanClass":"pos"},{"type":"html","wordHTML":"in"},{"type":"html","wordHTML":"3"},{"type":"html","wordHTML":"days"},{"type":"html","wordHTML":"later."},{"type":"html","wordHTML":"FAHK"},{"type":"html","wordHTML":"FACEBOOK"}]}]};
    //var page ={
    //    permalink:'',
    //    id:"1",
    //    pageContents:{
    //        title:'Hello Goodbye',
    //        article:'123456789`1234567 123456 123456y7 1234567',
    //        byLine:"janet jackson"
    //    },
    //    comments:[{
    //        userName:'viviandiep',
    //        _id:'122',
    //        datePublished:new Date(),
    //        replies:[{
    //            userName:'georgey',
    //            _id:'456',
    //            datePublished:new Date(),
    //            replies:[{
    //                userName:'booboobooobooo',
    //                _id:'555',
    //                datePublished:new Date(),
    //                replies:[{
    //                    userName:'hohohoho',
    //                    _id:'8855',
    //                    datePublished:new Date(),
    //                    replies:[],
    //                    score:'-94',
    //                    text:[
    //                        {
    //                            type:'string',
    //                            wordHTML:"reply to first reply to first reply",
    //                            spanClass:''
    //                        },
    //                        {
    //                            type:'html',
    //                            wordHTML:"comment",
    //                            spanClass:'neg'
    //                        }
    //                    ]
    //                }],
    //                score:'4',
    //                text:[
    //                    {
    //                        type:'string',
    //                        wordHTML:"reply to first reply",
    //                        spanClass:''
    //                    },
    //                    {
    //                        type:'html',
    //                        wordHTML:"comment",
    //                        spanClass:'pos'
    //                    }
    //                ]
    //            }],
    //            score:'-90',
    //            text:[
    //                {
    //                    type:'string',
    //                    wordHTML:"reply to first",
    //                    spanClass:''
    //                },
    //                {
    //                    type:'html',
    //                    wordHTML:"comment",
    //                    spanClass:'neg'
    //                }
    //            ]
    //        }],
    //        score:'+120',
    //        text:[
    //            {
    //                type:'string',
    //                wordHTML:"first",
    //                spanClass:''
    //            },
    //            {
    //                type:'html',
    //                wordHTML:"comment",
    //                spanClass:'neg'
    //            }
    //        ]
    //    },
    //    {
    //        userName:'youtube',
    //        _id:'123',
    //        datePublished:new Date(),
    //        replies:[],
    //        score:'+3',
    //        text:[
    //            {
    //                type:'string',
    //                wordHTML:"second",
    //                spanClass:''
    //            },
    //            {
    //                type:'html',
    //                wordHTML:"comment",
    //                spanClass:'neg'
    //            }
    //        ]
    //    },
    //    {
    //        userName:'viviandiep',
    //        _id:'123',
    //        datePublished:new Date(),
    //        replies:[
    //            {
    //                userName:'bebop',
    //                _id:'122',
    //                datePublished:new Date(),
    //                replies:[
    //                    {
    //                        userName:'bebop',
    //                        _id:'122',
    //                        datePublished:new Date(),
    //                        replies:[],
    //                        score:'+9',
    //                        text:[
    //                            {
    //                                type:'string',
    //                                wordHTML:'reply to reply of third comment',
    //                                spanClass:''
    //                            }
    //                        ]
    //
    //                    }
    //                ],
    //                score:'+120',
    //                text:[
    //                    {
    //                        type:'string',
    //                        wordHTML:"reply to",
    //                        spanClass:''
    //                    },
    //                    {
    //                        type:'html',
    //                        wordHTML:"third comment",
    //                        spanClass:'neg'
    //                    }
    //                ]
    //            }
    //        ],
    //        score:'+120',
    //        text:[
    //            {
    //                type:'string',
    //                wordHTML:"third",
    //                spanClass:''
    //            },
    //            {
    //                type:'html',
    //                wordHTML:"comment",
    //                spanClass:'neg'
    //            }
    //        ]
    //    }
    //    ]
    //};
    res.status(200).send(JSON.stringify(page));
};

var swears = ["anal","anus","arse","ass","ballsack","balls","bastard","bitch","biatch","bloody","blowjob","blow job","bollock","bollok","boner","boob","bugger","bum","butt","buttplug","clitoris","cock","coon","crap","cunt","damn","dick","dildo","dyke","fag","feck","fellate","fellatio","felching","fuck","f u c k","fudgepacker","fudge packer","flange","Goddamn","God damn","hell","homo","jerk","jizz","knobend","knob end","labia","lmao","lmfao","muff","nigger","nigga","omg","penis","piss","poop","prick","pube","pussy","queer","scrotum","sex","shit","s hit","sh1t","slut","smegma","spunk","tit","tosser","turd","twat","vagina","wank","whore","wtf"];