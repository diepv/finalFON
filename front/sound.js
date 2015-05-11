/**
 * Created by viviandiep on 4/27/15.
 */

$(document).ready(function(){

    $("#soundStart").on('click', function(event){
        var pos_count = $('.pos').length; /*counts positive comments*/
        var neg_count = $('.neg').length; /*counts negative comments*/
        var comment_count = $('.commentContainer').length; /*counts number of comments*/

        var file = undefined;


        if (comment_count <= 1){ /*if there are few comments*/
            file = 'sounds/pindrop.wav';
        } else if (Math.abs(pos_count - neg_count) < 2) { /*if there are about as many pos and neg*/
            file = 'sounds/cafe.wav';
        } else  if (pos_count > neg_count) { /*if there are more positive*/
            file = 'sounds/cheer.wav'
        } else  if (neg_count > pos_count) {
            file = 'sounds/angry.mp3'
        } else{
            file = 'sounds/cafe.wav';
        }

        var audio = new Audio(file);
        audio.play();



    });


});