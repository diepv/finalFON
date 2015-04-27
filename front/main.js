/**
 * Created by viviandiep on 4/27/15.
 */

$(document).ready(function(){
    $("#test").on('blur', function(event){
        console.log('BLUR');
        var texty = $("#test").val();
        var dataSend = {stuff:"hhahaha",text:texty};
        $.ajax({
            url:"http://localhost:3000/sentiment",
            data:dataSend,
            dataType:'json',
            method:"POST",
            complete:function(obj,msg){
                obj.fail(function(){
                    console.log('faily');
                });
                obj.success(function(daaa){
                    console.log(daaa);
                    var htmlString = '';
                    var wordHTML='';
                    var tt = texty.replace(/[\.\,]/g,' ');
                    tt.split(' ').forEach(function(word,wordIndex){
                        console.log('word',word);
                        console.log('wordindex',wordIndex);
                        console.log('check pos:', daaa.positive.indexOf(word));
                        if(daaa.positive.indexOf(word)>-1){
                            console.log("found word: ",word);
                            wordHTML += "<span class=posWord>"+word+"</span>";
                        }else{
                            console.log('check neg:', daaa.negative.indexOf(word));
                            if(daaa.negative.indexOf(word)>-1){
                                wordHTML += "<span class=negWord>"+word+"</span>";
                            }else{
                                wordHTML += " "+word+" ";
                            }
                        }

                    });
                    var cc = "<p class='highlighted'>"+wordHTML+"</p>";
                    $(".highlighted").last().after(cc);
                    //$(cc).html(wordHTML);
                });
            }
        })
    })
});