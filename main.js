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
            var txt = {
                type:'html',
                wordHTML:word,
                spanClass:''
            };
            if(result.score!==0){
                if(result.positive.length>0){
                    txt.spanClass = 'pos';//"<span class='pos'>"+word+"</span>";
                    if(word.match(/[!]+/g) !==null && word.match(/[!]+/g) !=='null') {

                        txt.spanClass= 'pos exclaim';//"<span class='neg'>"+word+"</span>";

                    }
                }else{
                    if(swears.indexOf(strippedWord)>-1){
                        txt.spanClass ='hearts';//"<span class='hearts'>"+word+"</span>";
                    }else{
                        if(word.match(/[!]+/g) !==null && word.match(/[!]+/g) !=='null') {
                            if(result.negative.length>0){
                                txt.spanClass= 'neg exclaim';//"<span class='neg'>"+word+"</span>";
                            }else{
                                txt.spanClass ='neutral exclaim';
                            }
                        }else{
                            if(result.negative.length>0) {
                                txt.spanClass ='neg';
                            }else{
                                if(word.match(/[!]+/g) !==null && word.match(/[!]+/g) !=='null') {
                                    txt.spanClass ='neutral exclaim';
                                }else{
                                    txt.spanClass ='neutral';
                                }

                            }
                        }
                    }
                }
            }else{
                if(word.match(/[!]+/g) !==null && word.match(/[!]+/g) !=='null') {
                    txt.spanClass ='neutral exclaim';
                }else{
                    txt.spanClass ='neutral';
                }
            }

            page.comments[0].text.push(txt);
        });

    });
    replyText.forEach(function(word){
        var span;
        getSentiment(word, function(result){
            var strippedWord = word.replace(/[!?'",.].*/g,'');
            var txt = {
                type:'html',
                wordHTML:word,
                spanClass:''
            };
            if(result.score!==0){
                if(result.positive.length>0){
                    txt.spanClass = 'pos';//"<span class='pos'>"+word+"</span>";
                    if(word.match(/[!]+/g) !==null && word.match(/[!]+/g) !=='null') {

                            txt.spanClass= 'pos exclaim';//"<span class='neg'>"+word+"</span>";

                    }
                }else{
                    if(swears.indexOf(strippedWord)>-1){
                        txt.spanClass ='hearts';//"<span class='hearts'>"+word+"</span>";
                    }else{
                        if(word.match(/[!]+/g) !==null && word.match(/[!]+/g) !=='null') {
                            if(result.negative.length>0){
                                txt.spanClass= 'neg exclaim';//"<span class='neg'>"+word+"</span>";
                            }else{
                                txt.spanClass ='neutral exclaim';
                            }
                        }else{
                            if(result.negative.length>0) {
                                txt.spanClass ='neg';
                            }else{
                                if(word.match(/[!]+/g) !==null && word.match(/[!]+/g) !=='null') {
                                    txt.spanClass ='neutral exclaim';
                                }else{
                                    txt.spanClass ='neutral';
                                }
                            }
                        }
                    }
                }
            }

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
    var page = {"permalink":"","id":"1","pageContents":{"title":"Hello Goodbye","article":"123456789`1234567 123456 123456y7 1234567","byLine":"janet jackson"},"comments":[{"userName":"Keith Singer","datePublished":"2015-05-13T15:45:27.486Z","replies":[{"userName":"Gary Reynolds","datePublished":"2015-05-13T15:45:27.486Z","replies":[],"score":"+2","text":[{"type":"html","wordHTML":"All","spanClass":""},{"type":"html","wordHTML":"of","spanClass":""},{"type":"html","wordHTML":"you","spanClass":""},{"type":"html","wordHTML":"that","spanClass":""},{"type":"html","wordHTML":"think","spanClass":""},{"type":"html","wordHTML":"my","spanClass":""},{"type":"html","wordHTML":"post","spanClass":""},{"type":"html","wordHTML":"is","spanClass":""},{"type":"html","wordHTML":"drama,","spanClass":""},{"type":"html","wordHTML":"look","spanClass":""},{"type":"html","wordHTML":"at","spanClass":""},{"type":"html","wordHTML":"the","spanClass":""},{"type":"html","wordHTML":"Verizon-AOL","spanClass":""},{"type":"html","wordHTML":"merger.","spanClass":""},{"type":"html","wordHTML":"It's","spanClass":""},{"type":"html","wordHTML":"all","spanClass":""},{"type":"html","wordHTML":"about","spanClass":""},{"type":"html","wordHTML":"money.","spanClass":""},{"type":"html","wordHTML":"Gullibility","spanClass":"neg"},{"type":"html","wordHTML":"and","spanClass":""},{"type":"html","wordHTML":"greed","spanClass":"neg"},{"type":"html","wordHTML":"go","spanClass":""},{"type":"html","wordHTML":"hand","spanClass":""},{"type":"html","wordHTML":"in","spanClass":""},{"type":"html","wordHTML":"hand.","spanClass":""},{"type":"html","wordHTML":"PAY","spanClass":"neg"},{"type":"html","wordHTML":"UP!!!","spanClass":""},{"type":"html","wordHTML":"Hilarious!!!","spanClass":"pos exclaim"}]}],"score":"+13","text":[{"type":"html","wordHTML":"Here's","spanClass":"neutral"},{"type":"html","wordHTML":"an","spanClass":"neutral"},{"type":"html","wordHTML":"idea...","spanClass":"neutral"},{"type":"html","wordHTML":"show","spanClass":"neutral"},{"type":"html","wordHTML":"me","spanClass":"neutral"},{"type":"html","wordHTML":"ALL","spanClass":"neutral"},{"type":"html","wordHTML":"the","spanClass":"neutral"},{"type":"html","wordHTML":"posts","spanClass":"neutral"},{"type":"html","wordHTML":"from","spanClass":"neutral"},{"type":"html","wordHTML":"ALL","spanClass":"neutral"},{"type":"html","wordHTML":"my","spanClass":"neutral"},{"type":"html","wordHTML":"friends","spanClass":"neutral"},{"type":"html","wordHTML":"and","spanClass":"neutral"},{"type":"html","wordHTML":"ALL","spanClass":"neutral"},{"type":"html","wordHTML":"of","spanClass":"neutral"},{"type":"html","wordHTML":"the","spanClass":"neutral"},{"type":"html","wordHTML":"pages","spanClass":"neutral"},{"type":"html","wordHTML":"I","spanClass":"neutral"},{"type":"html","wordHTML":"have","spanClass":"neutral"},{"type":"html","wordHTML":"\"Liked\"","spanClass":"pos"},{"type":"html","wordHTML":"in","spanClass":"neutral"},{"type":"html","wordHTML":"the","spanClass":"neutral"},{"type":"html","wordHTML":"order","spanClass":"neutral"},{"type":"html","wordHTML":"in","spanClass":"neutral"},{"type":"html","wordHTML":"which","spanClass":"neutral"},{"type":"html","wordHTML":"they","spanClass":"neutral"},{"type":"html","wordHTML":"were","spanClass":"neutral"},{"type":"html","wordHTML":"posted.","spanClass":"neutral"},{"type":"html","wordHTML":"NOT","spanClass":"neutral"},{"type":"html","wordHTML":"what","spanClass":"neutral"},{"type":"html","wordHTML":"you","spanClass":"neutral"},{"type":"html","wordHTML":"Facebook","spanClass":"neutral"},{"type":"html","wordHTML":"thinks","spanClass":"neutral"},{"type":"html","wordHTML":"I","spanClass":"neutral"},{"type":"html","wordHTML":"would","spanClass":"neutral"},{"type":"html","wordHTML":"be","spanClass":"neutral"},{"type":"html","wordHTML":"interested","spanClass":"pos"},{"type":"html","wordHTML":"in","spanClass":"neutral"},{"type":"html","wordHTML":"3","spanClass":"neutral"},{"type":"html","wordHTML":"days","spanClass":"neutral"},{"type":"html","wordHTML":"later.","spanClass":"neutral"},{"type":"html","wordHTML":"FAHK","spanClass":"neutral"},{"type":"html","wordHTML":"FACEBOOK","spanClass":"neutral"}]}]};
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