/**
 * Created by viviandiep on 4/27/15.
 */

$(document).ready(function(){
    var blueviolet ="rgb(102, 255, 204)" ;//'rgb(138, 43, 226)';
    var blue = "rgb(153, 204, 255)";
    function loadComments(){
       return $.ajax({
            url:'https://lit-gorge-3288.herokuapp.com/getComments',
            method:"GET",
            fail:function(){
                console.log('joy of joys, there is an ajax failure');
            }
        });
    }
    //function loadComments() {
    //    var template = $('#postTemplate').html();
    //    Mustache.parse(template);   // optional, speeds up future uses
    //    var data = getComments();
    //    var rendered = Mustache.render(template, data);
    //    console.log("rendered",rendered);
    //    $('#commentsMain').html(rendered);
    //}
    loadComments().done(function(data){
        var data = JSON.parse(data).comments;
        data.forEach(function(comment,commentIndex){
            //console.log('comment',comment);
            createComment(comment);
        });
    });

    function createComment(data){

        var threadContainer = document.createElement('div');
        threadContainer.setAttribute('class','threadContainer');

        var commentContainer = document.createElement('div');
        commentContainer.setAttribute('class','commentContainer');

        var scoreContainer = document.createElement("div");
        scoreContainer.setAttribute('class','scoreContainer');

        var scoreContent = populateScoreContainer(data);
        scoreContainer.appendChild(scoreContent);
        //var postContainer = document.createElement('div');
        //postContainer.setAttribute('class','postContainer');
        var postContent = populatePostContainer(data);
        var replies = populateReplies(data,commentContainer);
        scoreContainer.appendChild(scoreContent);
        $(commentContainer).append($(scoreContainer),$(postContent));
        $(threadContainer).append($(commentContainer));
        $(threadContainer).append($(replies));
        $('#commentsMain').append($(threadContainer));
        return commentContainer;

    }
    function populateScoreContainer(data){
        var word = data.score; //string
        var scoreContainer = document.createElement('div');
        scoreContainer.setAttribute('class','scoreControlGroup');
        var voteButtons = document.createElement('div');
        voteButtons.setAttribute('class','voteButtons');
        var scoreText = document.createElement('p');
        scoreText.setAttribute('class','scoreText');// <p class='scoreText'>{{score}}</p>
        scoreText.innerHTML = word;

        var upvote = document.createElement('div');
        upvote.setAttribute('class','upvoteButton');
        var downvote = document.createElement('div');
        downvote.setAttribute('class','downvoteButton');
        voteButtons.appendChild(upvote);
        voteButtons.appendChild(downvote);
        scoreContainer.appendChild(scoreText);
        scoreContainer.appendChild(voteButtons);

        if(parseInt(word)){

        }
        return scoreContainer;
    }

    function populatePostContainer(data){

        var text='';
        //console.log('data dot text',data.text);
        data.text.forEach(function(word,wordIndex){
            if(word.type=='html'){
                var span = document.createElement('span');
                span.setAttribute('class',word.spanClass);
                span.innerHTML = word.wordHTML;
                text += ' '+span.outerHTML;
            }else{
                text += ' '+ word.wordHTML;
            }

        });
        var postContainer = document.createElement('div');
        postContainer.setAttribute('class','postContainer');

        var postDetails = document.createElement('div');
        postDetails.setAttribute('class','postDetails');
        var userName = document.createElement('p');
        userName.setAttribute('class','userName');
        userName.innerHTML = data.userName;

        var postAge = document.createElement('p');
        postAge.setAttribute('class','postAge');
        var today = new Date();
        var age = today-new Date(data.datePublished);
        postAge.innerHTML = " "+age+" days ago.";

        var replyCount = document.createElement('p');
        replyCount.setAttribute('class','replyCount');
        replyCount.innerHTML = data.replies.length + " replies.";

        postDetails.appendChild(userName);
        postDetails.appendChild(postAge);
        postDetails.appendChild(replyCount);

        var postTextContainer = document.createElement('div');
        postTextContainer.setAttribute('class','postTextContainer');
        var postText = document.createElement('p');
        postText.setAttribute('class','postText');
        //console.log('postText text:',text);
        postText.innerHTML = text;
        postTextContainer.appendChild(postText);

        postContainer.appendChild(postDetails);
        postContainer.appendChild(postTextContainer);
        return postContainer;
    }

    function populateReplies(data){
        var replies = data.replies;
        if(replies.length>0){
            var replyPosts = document.createElement('div');
            replyPosts.setAttribute('class','replyPosts');
            replies.forEach(function(replyData,index){
                var postContainment = document.createElement('div');
                postContainment.setAttribute('class','commentContainer');
                var score = populateScoreContainer(replyData);
                postContainment.appendChild(score);
                var post = populatePostContainer(replyData);
                postContainment.appendChild(post);
                var rr = populateReplies(replyData);
                $(replyPosts).append($(postContainment));
                $(replyPosts).append($(rr));
            });
        }
        return replyPosts;
    }
    $(".modeButtons").on('click', function(event){
        if($(this).css('background-color')== blueviolet){
            $(".modeButtons").css('background-color',blueviolet);
            $(this).css('background-color','white');
        }else{
            $(".modeButtons").css('background-color', 'white');
            $(this).css('background-color',blueviolet);
        }

    });
    $(".postButtons").on('click', function(event){
        if($(this).css('background-color')== blue){
            $(".postButtons").css('background-color',blue);
            $(this).css('background-color','white');
        }else{
            $(".postButtons").css('background-color', 'white');
            $(this).css('background-color',blue);
        }

    });
    var exclamationTracker = 0;
    var lastWordTracker ='';
    var typed = '';
    var workingSpan = document.createElement('span');
    workingSpan.setAttribute('id','workingSpan');
    workingSpan.setAttribute('class','neutral');
    //$("#commentBox").on('keypress',function(event){
    //
    //    var typedCharacter = String.fromCharCode(event.keyCode);
    //
    //    //if(typedCharacter == ' '){
    //    //    var writtenSoFar = this.value + typedCharacter;
    //    //    var writtenSoFarArray = writtenSoFar.split(' ');
    //    //    var lastWord = writtenSoFarArray[writtenSoFarArray.length -1];
    //    //}
    //
    //    //console.log('keyup',String.fromCharCode(event.keyCode));
    //    switch(typedCharacter){
    //        case "!":
    //            if(exclamationTracker>=0){
    //                exclamationTracker++;
    //            }
    //            break;
    //        case " ":
    //            //console.log('this html ',$("#commentBox").html());
    //            //console.log('this text ',$("#commentBox").text());
    //            //console.log('lastWordTracker',lastWordTracker);
    //            //var writtenSoFar = $(this).html() ;//+ typedCharacter;
    //            //var writtenSoFarArray = writtenSoFar.split(' ');
    //            //var lastWord = writtenSoFarArray[writtenSoFarArray.length-1];
    //            //var allButLastWord = writtenSoFar.substring(0,writtenSoFar.length - writtenSoFarArray[writtenSoFarArray.length -1].length);
    //
    //            //console.log('lastWord', lastWord);
    //            if(exclamationTracker>1){
    //                //var strippedWord = writtenSoFarArray[writtenSoFarArray.length -1].replace(/!+/g,'**');
    //                //var newContent = allButLastWord + " "+strippedWord;
    //                //console.log('newContent',newContent);
    //                //exclamationTracker = 0;
    //                //$("#commentBox").val(newContent);
    //            }else{
    //                //var newlast = $.parseHTML("<span class='neg'> &nbsp "+lastWordTracker+" </span>");
    //                ////var newContent = allButLastWord + " "+newlast;
    //                ////$("#commentBox").text(allButLastWord);
    //                ////var txt = $(this).text();
    //                //$("#commentBox").html('');
    //
    //                var lastWord = $("#commentBox").text().match(/\w+$/g)[0];
    //                var newlast = "<span class='neg'>"+lastWord+" </span>";
    //                console.log("last Word Length:", lastWordTracker.length);
    //                var commentBoxContentLength = $("#commentBox").html().length;
    //                console.log('comment box content length:',commentBoxContentLength);
    //                var oldText = $("#commentBox").html().substring(0, commentBoxContentLength-lastWordTracker.length);
    //                console.log("old Text: ", oldText);
    //                console.log('newlast',newlast);
    //                var dd = $("#commentBox").html().replace(/\w+$/g,newlast);
    //                console.log('dd',dd);
    //                //$("#commentBox").empty();
    //                //console.log('commentBoxText', $("#commentBox").text());
    //                $("#commentBox").html(dd);
    //                lastWordTracker = '';
    //
    //            }
    //
    //            break;
    //        default:
    //            exclamationTracker = 0;
    //            lastWordTracker+=typedCharacter;
    //            //console.log("lastwordtracker", lastWordTracker);
    //    }
    //
    //});

    $("#commentBox").on('keypress', function(event){
        //console.log("KEYPRESS", event.keyCode);
        var typedCharacter = String.fromCharCode(event.keyCode);

        switch(typedCharacter){
            case " ":
                //word has been finished. add to the previewBox according to what 'modes' it meets
                var lastWord = $("#commentBox").html().match(/[A-Za-z0-9_']+[!?.'#$%^&*(){}\[\];:<>\/\\]*$/g)[0];
                var strippedWord = lastWord.replace(/[!?'",.]+.*/g,'');
                //console.log("last typed word: ", lastWord);
                getSentimentScore(lastWord, function(result){
                    if(parseInt(result.score)!==0){
                        if(result.positive.length>0){
                            //console.log("positive word!", result.positive[0]);
                            $("#workingSpan").attr('class','pos');
                        }else{
                            //console.log('negative word!', result.negative[0]);
                            $("#workingSpan").attr('class','neg');
                        }
                        //$("#workingSpan").after("<span class='space'>&nbsp</span>");
                        //$("#workingSpan").removeAttr('id');
                        //workingSpan = document.createElement('span');
                        //workingSpan.setAttribute('id','workingSpan');
                        //workingSpan.setAttribute('class','neutral');
                        //$("#previewBox").append($(workingSpan));
                    }
                    // else{
                        isInsult(strippedWord, function(res){
                            isSwear(strippedWord,function(result){
                            if(res){
                                $("#workingSpan").attr('class','hearts');
                            }
                            if(result){
                                $("#workingSpan").attr('class','hearts');
                            }
                            //else{
                            //    $("#workingSpan").attr('class','neutral');
                            //}
                            $("#workingSpan").after("<span class='space'>&nbsp</span>");
                            $("#workingSpan").removeAttr('id');
                            workingSpan = document.createElement('span');
                            workingSpan.setAttribute('id','workingSpan');
                            workingSpan.setAttribute('class','neutral');
                            $("#previewBox").append($(workingSpan));
                         });
                        });

                    //}

                });
                //getSentiment of lastWord
                //check for funky punctuation or 'typographical emphasis'

                break;
            default:
                //console.log("workingspan length---",$("#workingSpan").length);
                if($("#workingSpan").length>0){
                    var oldText = $("#workingSpan").text();
                    //console.log('old text prev text',oldText);
                    $("#workingSpan").text(oldText+typedCharacter);
                }else{
                    $("#previewBox").append($(workingSpan));
                    $("#workingSpan").html(typedCharacter);
                }
        }
    });
    $("#commentBox").on("keydown",function(event){
        //console.log('keyed down event code: ',event.keyCode);
        if(event.keyCode==8 && $("#previewBox").text()!==""){
            var oldText ='';
            var span='';
                if($("#workingSpan").length==0){
                    oldText = $("#previewBox").last("span").text();
                    span = $("#previewBox").last('.space');
                }else{
                    //console.log($("#workingSpan").length);
                    if($("#workingSpan").text()==''){
                        oldText = $("#workingSpan").prev().text();
                        span = $("#workingSpan").prev();
                    }else{
                        oldText = $("#workingSpan").text();//.text();//.text();
                        span = $("#workingSpan");
                    }
                }
            if(oldText.length<1){
                if(span.attr('class')=='space'){
                    span.remove();
                }else{
                    console.log("removing span: ",$("#previewBox").children().last('span'));
                    span.remove();
                }

            }else{
                console.log("OLD TEXT: ", oldText);
                if(span.attr('class')=='space'){
                  span.remove();

                }else{
                    var newText = oldText.substring(0,oldText.length-1);

                    span.text(newText);
                    if(newText.length==0){
                        span.remove();
                    }
                }
            }
        }
    });

    $("#commentsMain").on('click',function(event){
        console.log('upvoteclick', $(event.target));
        if($(event.target).attr('class')=='upvoteButton'){
            var value = $(".scoreText").val();
            var newValue = parseInt(value)+1;
            $(".scoreText").val(newValue);
        }else{
            var value = $(".scoreText").val();
            var newValue = parseInt(value)-1;
            $(".scoreText").val(newValue);
        }

    });
    function getSentimentScore(word, callback){
        var dataSend = {text:word};
        $.ajax({
            url:"https://lit-gorge-3288.herokuapp.com/sentiment",
            data:dataSend,
            dataType:'json',
            method:"POST",
            complete:function(obj, message){
                obj.fail(function(){

                });
                obj.success(function(data){
                    callback(data);
                });
            }
        });
    }

    function isInsult(word, callback){
        $.ajax({
            url:'./data/insults.csv',
            type:"GET",
            complete: function(obj,msg){
                obj.fail(function(){
                    console.log("FAILURE TO READ INSULT");
                });
                obj.success(function(message){
                    var data = $.csv.toArray(message);
                    if(data.indexOf(word)>-1){
                        callback(true);
                    }else{
                        callback(false);
                    }
                });
            }
        })

    }
    function isSwear(word, callback){
        $.ajax({
            url:'./data/swearWords.csv',
            type:"GET",
            complete: function(obj,msg){
                obj.fail(function(){
                    console.log("FAILURE TO READ INSULT");
                });
                obj.success(function(message){
                    var data = $.csv.toArray(message);
                    if(data.indexOf(word)>-1){
                        callback(true);
                    }else{
                        callback(false);
                    }
                });
            }
        })

    }
    $("#submitPost").on('click', function(event){
        var stuff = $("#previewBox").html();
        console.log("submit pos stuff: ",stuff);
        var newComment = {
            _id:234567,
            userName:'testUser',
            datePublished: new Date(),
            score:0,
            text:[],
            replies:[]
        };
        var commentContainer = createComment(newComment);
        $(".postTextContainer").last().html(stuff);
    });
    //$("#submitPost").on('click', function(event){
    //    console.log('BLUR');
    //    var texty = $("#commentBox").val();
    //    var dataSend = {stuff:"hhahaha",text:texty};
    //    $.ajax({
    //        url:"https://lit-gorge-3288.herokuapp.com/sentiment",
    //        data:dataSend,
    //        dataType:'json',
    //        method:"POST",
    //        complete:function(obj,msg){
    //            obj.fail(function(){
    //                console.log('faily');
    //            });
    //            obj.success(function(daaa){
    //                console.log(daaa);
    //                var newComment = {
    //                    _id:234567,
    //                    userName:'testUser',
    //                    datePublished: new Date(),
    //                    score:0,
    //                    text:[],
    //                    replies:[]
    //                };
    //                var htmlString = '';
    //                //var wordHTML='';
    //                var tt = texty.replace(/[\.\,]/g,' ');
    //                tt.split(' ').forEach(function(word,wordIndex){
    //                    console.log('word',word);
    //                    console.log('wordindex',wordIndex);
    //                    console.log('check pos:', daaa.positive.indexOf(word));
    //                    var textEntry = {
    //                        type:'',
    //                        wordHTML:word,
    //                        spanClass:''
    //                    };
    //                    if(daaa.positive.indexOf(word)>-1){
    //                        textEntry.type = 'html';
    //                        textEntry.spanClass = 'pos';
    //                    }else{
    //
    //                        if(daaa.negative.indexOf(word)>-1){
    //                            textEntry.type ='html';
    //                            textEntry.spanClass ='neg';
    //                        }else{
    //                            textEntry.type= 'string';
    //                            textEntry.spanClass='neutral';
    //                        }
    //                    }
    //                    newComment.text.push(textEntry);
    //                });
    //                createComment(newComment);
    //                //var cc = "<p class='highlighted'>"+wordHTML+"</p>";
    //                //$(".highlighted").last().after(cc);
    //                //$(cc).html(wordHTML);
    //            });
    //        }
    //    })
    //})
});