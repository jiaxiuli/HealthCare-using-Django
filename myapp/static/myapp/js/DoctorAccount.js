const $navigation = $('#navigation');
const $showArea = $('#showArea');
const $appointments = $('#appointments');
const $naviArray = $('.naviItems');
const $showitems = $('.shownItems');
const $time = $('#time');
const $title = $('#title h1');
const $bg = $('body');
const $mask = $('#mask');
const username = $('#username').html();
const firstname = $('#first_name').html();
const $changeUname = $('#changeUname');
const $changeEma = $('#changeEma');
const $uninput = $('#uninput');
const $emailinput = $('#emailinput');

const $fninput = $('#fninput');
const $changefn = $('#changefn');

const $lninput = $('#lninput');
const $changeln = $('#changeln');

const $ageinput = $('#ageinput');
const $changeage = $('#changeage');

const $addrinput = $('#addrinput');
const $changeaddr = $('#changeaddr');

const $genderselect = $('#genderselect');
const $changegender = $('#changegender');

const error = $('#error').html();
const $mes = $('#message');
const message = "click to update";

const last_name = $changeln.html();
const $unreadCount = $(".unreadCount");
const $count = $(".count");

const $photo = $('#photo').html();
console.log($photo)
 $('#show').css(
                {"background-image": "url('../../../.."+$photo+"')"},
                {"background-size": "cover"},
 )
//向服务器询问是否有未读信息
setInterval(function (){
  getReceivedRecord();
}, 1000);

//向服务器询问是否有未读消息
setInterval(function (){
    checkIfUnreadMessage();
}, 500)
DocGetAppointmentForToday();

if(error == 1){
    $mes.fadeIn(800);
}

$navigation.fadeIn(1000);
$showArea.fadeIn(1000);
$appointments.fadeIn(1000);

$naviArray.click(function(){
    const index = this.getAttribute("value");
    $naviArray.each(function(){
        if(index === this.getAttribute("value")){
            $(this).css('background-color', 'rgba(0, 0, 0, 0.3)');
        }else{
            $(this).css('background-color', 'rgba(0, 0, 0, 0)');
        }
    });
    if(index == 5){
        checkWorkInfo();
    }
     if(index == 2 || index == 3){

        $("#showArea").animate({
            "width": "25%"
        },900);
        $("#rightArea").animate({
            "width": "40%"
        },900);
        $('#reply_failed').animate({
            "width": "40%"
        },900);
          if(index == 2){
              getReceivedRecord();
         }else{
                getChatHistory();
          }
    }else{
        if(index == 4){
            getAllAppointments();
        }
        if(index == 1){
            DocGetAppointmentForToday();
        }
        $("#showArea").animate({
            "width": "40%"
        },900);
        $("#rightArea").animate({
            "width": "25%"
        },900);
         $('#reply_failed').animate({
            "width": "25%"
        },900);
    }
    $showitems.each(function(){
        if(index === this.getAttribute("value")){
           // $(this).css('display', 'block');
           $(this).fadeIn(1000);
        }else{
           // $(this).css('display', 'none');
           $(this).fadeOut(1000);
        }
    });
});

function checkWorkInfo(){
    $.ajax({
        url: "/checkWorkInfo",
        type: "post",
        data: {
            user: $("input[name=id]").val(),
        },
        success: function (data) {
             let obj = JSON.parse(data);
             $('#FocusOnselect').val(obj[0]);
             $('#main').val(obj[1]);
             $('#quote').val(obj[2]);
        }
    });

}

$('#doctorWorkSubmit').click(function (){
    let department = $('#FocusOnselect').val();
    let main = $('#main').val();
    let quote = $('#quote').val();
    $.ajax({
        url: "/saveDoctorWorkInfo",
        type: "post",
        data:{
            user: $("input[name=id]").val(),
            department : department,
            main: main,
            quote: quote
        },
        success: function (){
            $('#workInfosaved').fadeIn(400);
            setTimeout(function (){
                $('#workInfosaved').fadeOut(400);
            }, 2000);
        }
    })
});

setInterval(() => {
    const myDate = new Date();
    const time = myDate.toLocaleString();
    $time.html(time);
    const hour = myDate.getHours();

    if( hour >= 6 && hour < 12 ){
        if(firstname == message)
            $title.html('Good morning, ' + '<span style="color: lightseagreen">'+username+'</span>');
        else
            $title.html('Good morning, ' + '<span style="color: lightseagreen">'+firstname+'</span>');
        $bg.css({
            "background-image": "url('../../static/myapp/img/morning.jpg')",
            "background-repeat":"no-repeat",
            "background-size": "100%"
        });
        $mask.css("opacity", '0.5');
    }else if(hour >= 12 && hour < 18 ){
         if(firstname == message)
            $title.html('Good afternoon, ' + '<span style="color: lightseagreen">'+username+'</span>');
        else
            $title.html('Good afternoon, ' + '<span style="color: lightseagreen">'+firstname+'</span>');
        $bg.css({
            "background-image": "url('../../static/myapp/img/afternoon.jpg')",
            "background-repeat":"no-repeat",
            "background-size": "100%"
        });
        $mask.css("opacity", '0.5');
    }else if(hour >= 18 && hour < 24){
         if(firstname == message)
            $title.html('Good evening, ' + '<span style="color: lightseagreen">'+username+'</span>');
        else
            $title.html('Good evening, ' + '<span style="color: lightseagreen">'+firstname+'</span>');
        $bg.css({
            "background-image": "url('../../static/myapp/img/evening.jpg')",
            "background-repeat":"no-repeat",
            "background-size": "100%"
        });
        $mask.css("opacity", '0.3');
    }else{
        if(firstname == message)
            $title.html('Good night, ' + '<span style="color: lightseagreen">'+username+'</span>');
        else
            $title.html('Good night, ' + '<span style="color: lightseagreen">'+firstname+'</span>');
         $bg.css({
            "background-image": "url('../../static/myapp/img/evening.jpg')",
            "background-repeat":"no-repeat",
            "background-size": "100%"
        });
        $mask.css("opacity", '0.3');
    }
}, 1000);

// $changeUname.html().click(function () {
//     $uninput.css('display', 'block');
//     $changeUname.css('display', 'none');
//     return  false;
// });
// $changeEma.click(function () {
//     $emailinput.fadeIn(800);
//     $changeEma.fadeOut(800);
//     return  false;
// });
const showusername = function () {
    $changeUname.fadeOut(800, function () {
        $uninput.fadeIn(800);
        $mes.fadeOut(800);
    });
};
const showemail = function () {
    $changeEma.fadeOut(800, function () {
        $emailinput.fadeIn(800);
    });
};

const showfirstname = function () {
    $changefn.fadeOut(800, function () {
        $fninput.fadeIn(800);
    });
};

const showlastname = function () {
    $changeln.fadeOut(800, function () {
        $lninput.fadeIn(800);
    });
};

const showage = function () {
    $changeage.fadeOut(800, function () {
        $ageinput.fadeIn(800);
    });
};

const showaddr = function () {
    $changeaddr.fadeOut(800, function () {
        $addrinput.fadeIn(800);
    });
};

const showgender = function () {
    $changegender.fadeOut(800, function () {
        $genderselect.fadeIn(800);
    });
};


function uploadFile(obj, type) {
    $.ajaxFileUpload({
        url : "uploadImg/",
        secureuri : false,
        fileElementId : "fileUpload"+type,
        dataType : 'jsonp',
        data: {
            'type': type,
            'userId': $("input[name=id]").val(),
        },

        success : function(data){
            console.log(data);
            $('#show').css(
                {"background-image": "url('../../../../media/img/"+data+"')"},
                {"background-size": "cover"},
            )
        },
        error : function(data){
              console.log(data);
            $('#show').css(
                {"background-image": "url('../../../../media/img/"+data+"')"},
                {"background-size": "cover"},
            )
        }
 });
 return false;
}

 let getReplyIndex;
 function getReceivedRecord(){
            $.ajax({
                url: '/getReceivedRecord',
                type: 'post',
                data: {
                    userId: $("input[name=id]").val(),
                },
                success: function (data) {
                    let obj = JSON.parse(data);
                    $('#requestArea').html('');
                    for (var i = obj.length - 1; i >= 0; i--) {
                        if (obj[i].isRead == 1) {
                            $('#requestArea').append(
                                '<div class="request">\n' +
                                '<div class="red_point"></div>' +
                                '<div id="index" style="display: none">' + i + '</div>' +
                                '<div class="patient_photo"></div>\n' +
                                '<div class="patient_name">' + obj[i].first_name + ' ' + obj[i].last_name + '</div>\n' +
                                '</div>'
                            );
                        } else {
                            $('#requestArea').append(
                                '<div class="request">\n' +
                                '<div class="red_point_unread"></div>' +
                                '<div id="index" style="display: none">' + i + '</div>' +
                                '<div class="patient_photo"></div>\n' +
                                '<div class="patient_name">' + obj[i].first_name + ' ' + obj[i].last_name + '</div>\n' +
                                '</div>');
                        }

                    }
                    for (var i = obj.length - 1; i >= 0; i--) {
                        $(".patient_photo:eq(" + (obj.length - 1 - i) + ")").css(
                            {"background-image": "url('../../../.." + obj[i].img + "')"},
                            {"background-size": "cover"});
                    }
                    $(".request").click(function () {
                        const index = $(this).find("#index").html();
                        getReplyIndex = index;
                        console.log(obj[index])
                        $(this).find(".red_point_unread").fadeOut(400);
                        $("#rightArea").html(
                            ' <div class="symInfo">\n' +
                            '<p class="patientName">' + obj[index].first_name + ' ' + obj[index].last_name + '</p>\n' +
                            '<p class="patientInfo">' + obj[index].gender + '&emsp;' + obj[index].age + '&emsp;' + obj[index].address + '&emsp;' + '<em>wrote at: </em>' + '&nbsp;' + obj[index].create_time + '</p>\n' +
                            '<p class="symContent">' + obj[index].text + '</p>\n' +
                            '<p class="recievedTime"> <em> Received at: </em>' + '&nbsp;' + obj[index].send_time + '</p>\n' +
                            '</div>\n' +
                            '<div class="reply">\n' +
                            '<p class="a_and_t">&emsp;Analysis:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;' +
                            '&emsp;&emsp;&emsp;&emsp;&emsp;Treatment:</p>'+
                            '<textarea class="analysis"></textarea>\n' +
                            '<textarea class="treatment"></textarea>\n' +
                            '<button class="done">Done</button>\n' +
                            '</div>\n' +
                            '</div>')
                        $(".done").click(function (){
                            let analysis = $(this).siblings(".analysis").val();
                            let treatment = $(this).siblings(".treatment").val();
                            let patient_id = obj[getReplyIndex].patient_id;
                            let doctor_id = obj[getReplyIndex].doctor_id;
                            let sym_id = obj[getReplyIndex].sym_id;

                            sendReply(doctor_id, patient_id, sym_id, analysis, treatment);

                        });
                        $.ajax({
                            url: '/recordIsRead',
                            type: 'post',
                            data: {
                                "transId": obj[index].transId
                            },
                            success: function () {
                            }
                        });
                    }).mousedown(function (){
                        $(this).css("background-color", "rgba(0,0,0,0.5)")
                    }).mouseup(function (){
                        $(this).css("background-color", "rgba(0,0,0,0)")
                    });
                    let unreadList = $(".red_point_unread");
                    let unreadCount = unreadList.length;
                    if(unreadCount == 0){
                        $unreadCount.css("display", "none");
                    }else{
                        $unreadCount.css("display", "block");
                        $count.html(unreadCount);
                    }

                }
            })
}

function sendReply(doctor_id, patient_id, sym_id, analysis, treatment){
    $.ajax({
        url: '/getReply',
        type: 'post',
        data: {
            doctor_id: doctor_id,
            patient_id: patient_id,
            sym_id: sym_id,
            analysis: analysis,
            treatment: treatment
        },
        success: function (data){
            if(data == 'record deleted'){
                $("#reply_failed").fadeIn(400);
                setTimeout(function (){
                     $("#reply_failed").fadeOut(400);
                     DocGetAppointmentForToday();
                }, 2000);
            }else{
                $('#reply_sent').fadeIn(400);
                setTimeout(function (){
                     $('#reply_sent').fadeOut(400);
                }, 2000);
            }
        }
    })
}

function getChatHistory(){

    $.ajax({
        url:'/getChatHistory',
        type: 'post',
        data:{
            patient_id : $("input[name=id]").val(),
        },
        success: function (data){
              let obj = JSON.parse(data);
              $('#listForChat').html('');
              for(var i = 0 ; i < obj.length ; i++ ){

                    let last_message = obj[i].last_message;
                    if(last_message.length > 15){
                        last_message = last_message.substring(0, 15) + "...";
                    }
                    var isChattingwith = $('#rightArea').find('.chatToWho_id').html()
                    if(obj[i].unReadCount != 0 && obj[i].user_id != isChattingwith){
                         $('#listForChat').append(' <div class="chat_item">\n' +
                       '                    <div class="unreadMessage">'+obj[i].unReadCount+'</div>'+
                       '                    <div class="photo_chat"></div>\n' +
                       '                    <div style="display: none" class="chatsendto">'+obj[i].user_id+'</div>'+
                       '                    <div class="chat_name">'+obj[i].first_name+' '+obj[i].last_name+'</div>\n' +
                       '                    <div class="chat_time">'+obj[i].last_mes_time+'</div>\n' +
                       '                    <div class="chat_lastMessage">'+last_message+'</div>\n' +
                       '                </div>');
                    }else{
                         $('#listForChat').append(' <div class="chat_item">\n' +
                       '                    <div class="photo_chat"></div>\n' +
                       '                    <div style="display: none" class="chatsendto">'+obj[i].user_id+'</div>'+
                       '                    <div class="chat_name">'+obj[i].first_name+' '+obj[i].last_name+'</div>\n' +
                       '                    <div class="chat_time">'+obj[i].last_mes_time+'</div>\n' +
                       '                    <div class="chat_lastMessage">'+last_message+'</div>\n' +
                       '                </div>');
                    }
                    if(obj[i].unReadCount != 0 && obj[i].user_id == isChattingwith){
                         $(".chat_history").html('');
                        requestChatHistory(isChattingwith, $("input[name=id]").val());
                        messageHasBeenRead(isChattingwith, $("input[name=id]").val());
                        //滚动条最下面
                        $('.chat_history').scrollTop( $('.chat_history')[0].scrollHeight );
                    }
               }
               for (var i = 0; i < obj.length; i++ ) {
                        $(".photo_chat:eq(" + i + ")").css(
                            {"background-image": "url('../../../.." + obj[i].img + "')"},
                            {"background-size": "cover"});
                    }


               $('.chat_item').click(function (){
                    let pat_id = $(this).find('.chatsendto').html();
                    let doc_id = $("input[name=id]").val();
                    $('#rightArea').html(
                    '<p class="chatToWho_id" style="display: none">'+$(this).find('.chatsendto').html()+'</p>'+
                    '<p class="chatToWho">Chatting with: '+$(this).find('.chat_name').html()+'</p>'+
                    ' <div class="chat_history"></div>\n' +
                    '<textarea class="chat_input"></textarea>\n' +
                    '<button class="chat_send">Send</button>');
                    //消息已读
                    messageHasBeenRead(pat_id, doc_id, this);
                     //请求聊天记录
                    requestChatHistory(pat_id, doc_id);
                     //滚动条最下面
                   $('.chat_history').scrollTop( $('.chat_history')[0].scrollHeight );
                    $(".chat_send").click(function (){
                        var message = $(this).prev().val();
                        var _this = this;
                        $.ajax({
                            url: '/chatTransaction',
                            type: 'post',
                            data:{
                                receiver: pat_id,
                                sender: doc_id,
                                text: message
                            },
                            success: function (send_time){
                                $(_this).prev().val("");
                                $(_this).siblings(".chat_history").append(
                                    '<div class="mes_sender">\n' +
                                    '<div class="message_send_time">'+send_time+'</div>'+
                                    '<div class="chatting_photo"></div>\n' +
                                    '<span class="chat_content">' + message +
                                    '</span>\n' +
                                    '</div>');
                                $(_this).siblings(".chat_history").find(".chatting_photo").css(
                                     {"background-image": "url('../../../.."+$photo+"')"},
                                     {"background-size": "cover"});
                                getChatHistory();
                                 //滚动条最下面
                                $('.chat_history').scrollTop( $('.chat_history')[0].scrollHeight );
                            }
                        })
                    });
                 ////////////////////////////////////////////////////////////////////////////////////////
               });
        },
        error: function (){}
    })
}
$("#search").click(function (){
    $(this).stop().animate({
        "left": 0
    }, 600, "swing")
    return false;
});
$(window).click(function (){
     $("#search").stop().animate({
        "left": "-80%"
    }, 600, "swing")
});
$("#search_go").click(function (){
    $.ajax({
        url:"/searchUser",
        type: "post",
        data: {
            user: $("#search").find("input").val()
        },
        success: function (data){
             let obj = JSON.parse(data);
             if(obj.length == 0){
                 $("#search_output").html("").append("did not find any user!")
             }else{
                  $("#search_output").html("").append(
                 '<div id="result_id" style="display: none">'+obj[0].user+'</div>\n' +
                 '<div id="result_photo"></div>\n' +
                 '<div id="result_name">'+obj[0].firstname+' '+obj[0].lastname+'</div>'
                );
                $("#result_photo").css(
                   {"background-image": "url('../../../.."+obj[0].img+"')"},
                   {"background-size": "cover"}
                );
                $("#search_output").click(function (){
                    let doc_id = $(this).find('#result_id').html();
                    let pat_id = $("input[name=id]").val();
                    $('#rightArea').html(
                    '<p class="chatToWho">Chatting with: '+$(this).find('#result_name').html()+'</p>'+
                    ' <div class="chat_history"></div>\n' +
                    '<textarea class="chat_input"></textarea>\n' +
                    '<button class="chat_send">Send</button>');

                     //请求聊天记录
                    requestChatHistory(doc_id, pat_id);

                    $(".chat_send").click(function (){
                        var message = $(this).prev().val();
                        var _this = this;
                        $.ajax({
                            url: '/chatTransaction',
                            type: 'post',
                            data:{
                                receiver: doc_id,
                                sender: pat_id,
                                text: message
                            },
                            success: function (send_time){
                                $(_this).prev().val("");
                                $(_this).siblings(".chat_history").append(
                                    '<div class="mes_sender">\n' +
                                    '<div class="message_send_time">'+send_time+'</div>'+
                                    '<div class="chatting_photo"></div>\n' +
                                    '<span class="chat_content">' + message +
                                    '</span>\n' +
                                    '</div>');
                                $(_this).siblings(".chat_history").find(".chatting_photo").css(
                                     {"background-image": "url('../../../.."+$photo+"')"},
                                     {"background-size": "cover"});
                                getChatHistory();
                                 //滚动条最下面
                                $('.chat_history').scrollTop( $('.chat_history')[0].scrollHeight );
                            }
                        })
                    });
                });
             }
        }
    })
});


//请求聊天记录
function requestChatHistory(doc_id, pat_id){
     $.ajax({
        url: '/showChatHistory',
        type: 'post',
        data:{
            receiver: doc_id,
            sender: pat_id,
        },
    success: function (data){
         let list = JSON.parse(data);
         let img = list[0];
         for( var i = 1 ; i < list.length ; i++ ){
             //右边
             if(list[i].sender == pat_id){
                 $(".chat_history").append( '<div class="mes_sender">\n' +
                '<div class="message_send_time">'+list[i].time+'</div>'+
                '<div class="chatting_photo"></div>\n' +
                '<span class="chat_content">' + list[i].text +
                '</span>\n' +
                '</div>')
             }else{
                $(".chat_history").append( '<div class="mes_sender_left">\n' +
                '<div class="message_send_time_left">'+list[i].time+'</div>'+
                '<div class="chatting_photo_left"></div>\n' +
                '<span class="chat_content_left">' + list[i].text +
                '</span>\n' +
                '</div>')
             }
         }
         $(".chatting_photo_left").css(
              {"background-image": "url('../../../.." + img + "')"},
              {"background-size": "cover"}
         )
         $(".chatting_photo").css(
              {"background-image": "url('../../../.." + $photo + "')"},
              {"background-size": "cover"}
         )
        //滚动条最下面
       $('.chat_history').scrollTop( $('.chat_history')[0].scrollHeight );
    }
})
}

function checkIfUnreadMessage(){
    $.ajax({
       url: "/checkIfUnreadMessage",
       type: "post",
       data:{
           receiver: $("input[name=id]").val()
       } ,
       success: function (unread){
           if(unread != 0){
               getChatHistory();
               $('.unreadCount2').fadeIn(400);
               $('.count2').html(unread);
           }else{
                $('.unreadCount2').fadeOut(400);
           }
        }
    });
}

function messageHasBeenRead(doc_id, pat_id, _this){
     $.ajax({
       url: "/messageHasBeenRead",
       type: "post",
       data:{
           sender: doc_id,
           receiver: pat_id
       } ,
       success: function (){
            $(_this).find(".unreadMessage").fadeOut(400)
        }
    });
}
function DocGetAppointmentForToday(){
     let date = new Date();
     let year = date.getFullYear();
     let month = date.getMonth() + 1;
     let day = date.getDate();
     let today = year+'-'+month+'-'+day;
     $.ajax({
       url: "/DocGetAppointmentForToday",
       type: "post",
       data:{
           today: today,
           docId:  $("input[name=id]").val(),
       } ,
       success: function (data){
           $('#rightArea').html('<div id="appointments"></div>')
            let list = JSON.parse(data);
            console.log(list);
            if(list[0].length == 0 && list[1].length == 0 && list[2].length == 0 && list[3].length == 0){
                $('#appointments').html( '<div id="noAppoint">No appointment for today.</div>\n');
            }else{
                $('#appointments').html( '  <div id="appointForToday_Doc">\n' +
                    '                <p>appointments for today:</p>\n' +
                    '            </div>');
                 $('#appointForToday_Doc').append('<p>8am - 10am:</p>');
                for(var i = 0 ; i < list[0].length ; i++ ){
                   $('#appointForToday_Doc').append(list[0][i].fname + ' ' + list[0][i].lname + '<br>');
                }
                 $('#appointForToday_Doc').append('<hr><p>10am - 12am:</p>');
                for(var i = 0 ; i < list[1].length ; i++ ){
                   $('#appointForToday_Doc').append(list[1][i].fname + ' ' + list[1][i].lname + '<br>');
                }
                $('#appointForToday_Doc').append('<hr><p>2pm - 4pm:</p>');
                for(var i = 0 ; i < list[2].length ; i++ ){
                   $('#appointForToday_Doc').append(list[2][i].fname + ' ' + list[2][i].lname + '<br>');
                }
                 $('#appointForToday_Doc').append('<hr><p>4pm - 6pm:</p>');
                for(var i = 0 ; i < list[3].length ; i++ ){
                   $('#appointForToday_Doc').append(list[3][i].fname + ' ' + list[3][i].lname + '<br>');
                }
            }
        }
    });
}
function getAllAppointments(){
    $.ajax({
       url: "/getAllAppointments",
       type: "post",
       data:{
           docId:  $("input[name=id]").val(),
       } ,
       success: function (data){
           let obj = JSON.parse(data);
            $('#AllAppointments').html('');
           let dateList = []
           for(var i = 0 ; i < obj.length ; i++ ){
               dateList.push(obj[i].date);
           }
           dateList = Array.from(new Set(dateList));
           let list = [];
           for(let i = 0 ; i < dateList.length ; i++ ){
               let list8 = [];
               let list10 = [];
               let list14 = [];
               let list16 = [];
               for(let j = 0 ; j < obj.length ; j++ ){
                   if(obj[j].date == dateList[i]){
                       let name = obj[j].first_name + ' ' + obj[j].last_name;
                       switch (obj[j].time){
                            case '8': list8.push(name);break;
                            case '10': list10.push(name);break;
                            case '14': list14.push(name);break;
                            case '16': list16.push(name);break;
                       }
                   }
               }
               let temp = new Array();
               temp.push(list8);
               temp.push(list10);
               temp.push(list14);
               temp.push(list16);
               list.push(temp);
           }
         for(let i = 0 ; i < list.length ; i++ ){
             let date = dateList[i];
             $('#AllAppointments').append('<div class="appendDate">'+date+'</div>');
             $('#AllAppointments').append('<div class="appendTime">8am - 10am:</div>');
             for(let j = 0 ; j < list[i][0].length ; j++ ){
                 $('#AllAppointments').append('<div class="appendName">'+list[i][0][j]+'</div>');
             }
              $('#AllAppointments').append('<div class="appendTime"><hr>10am - 12am:</div>');
             for(let j = 0 ; j < list[i][1].length ; j++ ){
                 $('#AllAppointments').append('<div class="appendName">'+list[i][1][j]+'</div>');
             }
              $('#AllAppointments').append('<div class="appendTime"><hr>2pm - 4pm:</div>');
             for(let j = 0 ; j < list[i][2].length ; j++ ){
                 $('#AllAppointments').append('<div class="appendName">'+list[i][2][j]+'</div>');
             }
              $('#AllAppointments').append('<div class="appendTime"><hr>4pm - 6pm:</div>');
             for(let j = 0 ; j < list[i][3].length ; j++ ){
                 $('#AllAppointments').append('<div class="appendName">'+list[i][3][j]+'</div>');
             }

         }
        }
    });
}