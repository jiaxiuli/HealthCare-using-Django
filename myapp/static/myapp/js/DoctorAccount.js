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
const $unreadCount = $("#unreadCount");
const $count = $("#count");

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
     if(index == 2){
        $("#showArea").animate({
            "width": "25%"
        },900);
        $("#rightArea").animate({
            "width": "40%"
        },900);
        $('#reply_failed').animate({
            "width": "40%"
        },900);
        getReceivedRecord();
    }else{

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
                     $("#rightArea").html('<div id="appointments">\n' +
                         '        <div id="noAppoint">No appointment currently</div>\n' +
                         '        </div>');
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

