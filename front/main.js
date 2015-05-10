/**
 * Created by viviandiep on 4/27/15.
 */

$(document).ready(function(){
    var blueviolet = 'rgb(76, 80, 169)';
    function loadComments(){
       return $.ajax({
            url:'http://localhost:3000/getComments',
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
            console.log('comment',comment);
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

    }
    function populateScoreContainer(data){
        var word = data.score; //string
        var scoreText = document.createElement('p');
        scoreText.setAttribute('class','scoreText');// <p class='scoreText'>{{score}}</p>
        scoreText.innerHTML = word;
        if(parseInt(word)){

        }
        return scoreText;
    }

    function populatePostContainer(data){

        var text='';
        console.log('data dot text',data.text);
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
        console.log('postText text:',text);
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
            $(this).css('background-color','white');
        }else{
            $(this).css('background-color',blueviolet);
        }

    });

    $("#submitPost").on('click', function(event){
        console.log('BLUR');
        var texty = $("#test").val();
        var dataSend = {stuff:"hhahaha",text:texty};
        $.ajax({
            url:"https://lit-gorge-3288.herokuapp.com/sentiment",
            data:dataSend,
            dataType:'json',
            method:"POST",
            complete:function(obj,msg){
                obj.fail(function(){
                    console.log('faily');
                });
                obj.success(function(daaa){
                    console.log(daaa);
                    var newComment = {
                        _id:234567,
                        userName:'testUser',
                        datePublished: new Date(),
                        score:0,
                        text:[],
                        replies:[]
                    };
                    var htmlString = '';
                    //var wordHTML='';
                    var tt = texty.replace(/[\.\,]/g,' ');
                    tt.split(' ').forEach(function(word,wordIndex){
                        console.log('word',word);
                        console.log('wordindex',wordIndex);
                        console.log('check pos:', daaa.positive.indexOf(word));
                        var textEntry = {
                            type:'',
                            wordHTML:word,
                            spanClass:''
                        };
                        if(daaa.positive.indexOf(word)>-1){
                            textEntry.type = 'html';
                            textEntry.spanClass = 'pos';
                        }else{

                            if(daaa.negative.indexOf(word)>-1){
                                textEntry.type ='html';
                                textEntry.spanClass ='neg';
                            }else{
                                textEntry.type= 'string';
                                textEntry.spanClass='neutral';
                            }
                        }
                        newComment.text.push(textEntry);
                    });
                    createComment(newComment);
                    //var cc = "<p class='highlighted'>"+wordHTML+"</p>";
                    //$(".highlighted").last().after(cc);
                    //$(cc).html(wordHTML);
                });
            }
        })
    })
});