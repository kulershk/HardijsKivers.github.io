var kills = 0;
var status = 0; //0 off 1 onn

var lastLuck = 0;

var luckCounts = [];

function randomNumber(val){
  return Math.ceil(Math.random()*parseInt(val));
}

function doKill(){
  var nr = randomNumber($('.chance').val() );
  kills++;
  $('.kills').html(kills);
  $('.luck').html("1/" +Math.ceil(kills/luckCounts.length));
  if(nr == 1){
    //status = 0;
    var s = '';

    if( (kills-lastLuck) >= parseInt($('.chance').val())){
      s="danger";
    }else{
      s="success";
    }

    luckCounts.push({kc:kills, lk:(kills-lastLuck)});

    if( parseInt($('.luckyest').html()) >= (kills-lastLuck)){
      $('.luckyest').html((kills-lastLuck));
    }

    if( parseInt($('.unluckyest').html()) <= (kills-lastLuck)){
      $('.unluckyest').html((kills-lastLuck));
    }

    $('.table-luck').append('<div class="luck-box"> '+kills+' <span class="label label-'+s+'">+'+(kills-lastLuck)+'</span></div>');
    lastLuck = kills;
  }
}

function timer(){
  if(status == 1){
    for (var i = parseInt($('.radio input:radio:checked').val()) - 1; i >= 0; i--) {      
      doKill();
    };
  }
  setTimeout(function(){timer();},0);
}


jQuery(function($) {
  timer();
  $('.kills').html(0);
  $('.luck').html(0);

  $('.start-luck').click( function() {
    //Click
    status = 1;
  });

  $('.stop-luck').click( function() {
    //Click
    status = 0;
  });

  $('.reset-luck').click( function() {
    //Click
    status = 0;
    kills = 0;
    lastLuck = 0;
    $('.kills').html(0);
    $('.luck').html(0);
    $('.table-luck').html("");
  });

  $('.clean-luck').click( function() {
    //Click
    $('.table-luck').html("");
  });


});