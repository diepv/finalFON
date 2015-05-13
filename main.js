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
//exports.addCommentToDb = function(pageId, comment){
//    db.collection('pages', function(error, collection){
//        collection.insert(comment,{w:1},function(err){
//            if(err){
//                console.log('err',err);
//            }
//        });
//    });
//};

exports.getPage = function(req, res){
    var page ={
        permalink:'',
        pageContents:{
            title:'Hello Goodbye',
            article:'123456789`1234567 123456 123456y7 1234567',
            byLine:"janet jackson"
        },
        comments:[{
            userName:'viviandiep',
            _id:'122',
            datePublished:new Date(),
            replies:[{
                userName:'georgey',
                _id:'456',
                datePublished:new Date(),
                replies:[{
                    userName:'booboobooobooo',
                    _id:'555',
                    datePublished:new Date(),
                    replies:[{
                        userName:'hohohoho',
                        _id:'8855',
                        datePublished:new Date(),
                        replies:[],
                        score:'-94',
                        text:[
                            {
                                type:'string',
                                wordHTML:"reply to first reply to first reply",
                                spanClass:''
                            },
                            {
                                type:'html',
                                wordHTML:"comment",
                                spanClass:'neg'
                            }
                        ]
                    }],
                    score:'4',
                    text:[
                        {
                            type:'string',
                            wordHTML:"reply to first reply",
                            spanClass:''
                        },
                        {
                            type:'html',
                            wordHTML:"comment",
                            spanClass:'pos'
                        }
                    ]
                }],
                score:'-90',
                text:[
                    {
                        type:'string',
                        wordHTML:"reply to first",
                        spanClass:''
                    },
                    {
                        type:'html',
                        wordHTML:"comment",
                        spanClass:'neg'
                    }
                ]
            }],
            score:'+120',
            text:[
                {
                    type:'string',
                    wordHTML:"first",
                    spanClass:''
                },
                {
                    type:'html',
                    wordHTML:"comment",
                    spanClass:'neg'
                }
            ]
        },
        {
            userName:'youtube',
            _id:'123',
            datePublished:new Date(),
            replies:[],
            score:'+3',
            text:[
                {
                    type:'string',
                    wordHTML:"second",
                    spanClass:''
                },
                {
                    type:'html',
                    wordHTML:"comment",
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
                    replies:[
                        {
                            userName:'bebop',
                            _id:'122',
                            datePublished:new Date(),
                            replies:[],
                            score:'+9',
                            text:[
                                {
                                    type:'string',
                                    wordHTML:'reply to reply of third comment',
                                    spanClass:''
                                }
                            ]

                        }
                    ],
                    score:'+120',
                    text:[
                        {
                            type:'string',
                            wordHTML:"reply to",
                            spanClass:''
                        },
                        {
                            type:'html',
                            wordHTML:"third comment",
                            spanClass:'neg'
                        }
                    ]
                }
            ],
            score:'+120',
            text:[
                {
                    type:'string',
                    wordHTML:"third",
                    spanClass:''
                },
                {
                    type:'html',
                    wordHTML:"comment",
                    spanClass:'neg'
                }
            ]
        }
        ]
    };
    res.status(200).send(JSON.stringify(page));
};