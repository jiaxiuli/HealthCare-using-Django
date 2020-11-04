var $navigation = $('#navigation');
var $showArea = $('#showArea');
var $appointments = $('#appointments');
var $naviArray = $('.naviItems');
var $showitems = $('.shownItems');
var $time = $('#time');
var $title = $('#title h1');
var $bg = $('body');
var $mask = $('#mask');
var username = $('#username').html();
var firstname = $('#first_name').html();
var $changeUname = $('#changeUname');
var $changeEma = $('#changeEma');
var $uninput = $('#uninput');
var $emailinput = $('#emailinput');

var $fninput = $('#fninput');
var $changefn = $('#changefn');

var $lninput = $('#lninput');
var $changeln = $('#changeln');

var $ageinput = $('#ageinput');
var $changeage = $('#changeage');

var $addrinput = $('#addrinput');
var $changeaddr = $('#changeaddr');

var $genderselect = $('#genderselect');
var $changegender = $('#changegender');

var error = $('#error').html();
var $mes = $('#message');
var message = "click to update"

var last_name = $changeln.html();
const $unreadCount = $("#unreadCount");
const $count = $("#count");

var $add = $('#add');
var $cancel = $('#cancel');
var $editArea = $('#editArea');
var $record = $('.record');
var $photo = $('#photo').html();
console.log($photo)
 $('#show').css(
                {"background-image": "url('../../../.."+$photo+"')"},
                {"background-size": "cover"},
 )


if(error == 1){
    $mes.fadeIn(800);
}
console.log("username: "+username)
console.log("lastname: "+last_name)

$navigation.fadeIn(1000);
$showArea.fadeIn(1000);
$appointments.fadeIn(1000);

//向服务器询问是否有未读信息
setInterval(function (){
  getReceivedReply();
}, 1000);



$naviArray.click(function(){
    var index = this.getAttribute("value");
    $naviArray.each(function(){
        if(index === this.getAttribute("value")){
            $(this).css('background-color', 'rgba(0, 0, 0, 0.3)');
        }else{
            $(this).css('background-color', 'rgba(0, 0, 0, 0)');
        }
    });
    if(index == 3){
        getReceivedReply();
        $showArea.animate({
            width: "25%"
        }, 800);
         $("#rightArea").animate({
            width: "40%"
        }, 800);
    }else{
        $showArea.animate({
            width: "40%"
        }, 800);
         $("#rightArea").animate({
            width: "25%"
        }, 800);
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
    var myDate = new Date();
    var time = myDate.toLocaleString();
    $time.html(time);
    var hour = myDate.getHours();

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
var showusername = function () {
     $changeUname.fadeOut(800, function () {
         $uninput.fadeIn(800);
         $mes.fadeOut(800);
     });
}
var showemail = function () {
     $changeEma.fadeOut(800, function () {
        $emailinput.fadeIn(800);
     });
}

var showfirstname = function () {
     $changefn.fadeOut(800, function () {
        $fninput.fadeIn(800);
     });
}

var showlastname = function () {
     $changeln.fadeOut(800, function () {
        $lninput.fadeIn(800);
     });
}

var showage = function () {
     $changeage.fadeOut(800, function () {
        $ageinput.fadeIn(800);
     });
}

var showaddr = function () {
     $changeaddr.fadeOut(800, function () {
        $addrinput.fadeIn(800);
     });
}

var showgender = function () {
     $changegender.fadeOut(800, function () {
        $genderselect.fadeIn(800);
     });
}

$add.click(function(){
    $editArea.fadeIn(800);
});
$cancel.click(function(){
    $editArea.fadeOut(800);
});
$record.hover(  function () {
    $(this).find("button").fadeIn(100)
    },
    function () {
    $(this).find("button").fadeOut(100)
}
)

function DeleteRecord(_this){
    $.ajax({
            url: '/DeleteSymRecord',
            type: 'post',
            data:{
                id: $(_this).val(),
                userId: $(_this).attr("name")
            },
            success: function (data) {
               let obj = JSON.parse(data);
               $('#history').html("");
               for(var i = 0 ; i < obj.length ; i++ ){
                   $('#history').append(" <div  class=\"record\">\n" +
                       " <p id=\"p1\">"+obj[i].username+":</p>\n" +
                       " <p id=\"p2\">"+obj[i].text+"</p>\n" +
                       " <p id=\"p3\">"+obj[i].time+"</p>\n" +
                       "\n" +
                       " <button class=\"delbtn\" value='' name=''>Delete</button>\n" +
                       " <button class=\"sendbtn\" value=\"\" name=\"\">Send to a doctor</button>"+
                       " </div>");
               }
               for(var i = 0 ; i < obj.length ; i++ ){
                   $($(".delbtn:eq("+i+")")).val(obj[i].id);
                   $($(".delbtn:eq("+i+")")).attr("name", obj[i].user_id)
                   $($(".sendbtn:eq("+i+")")).val(obj[i].id);
                   $($(".sendbtn:eq("+i+")")).attr("name", obj[i].user_id)
               }
               $(".delbtn").click(function (){
                    DeleteRecord(this);
               });
                 $(".sendbtn").click(function (){
                    getDoctorList(this);
                });

               $(".record").hover(  function () {
                        $(this).find("button").fadeIn(100)
                    },
                    function () {
                       $(this).find("button").fadeOut(100)
                    }
                )
            },
        })
}


function addRecord(){
    $.ajax({
            url: '/addSymRecord',
            type: 'post',
            data:{
                text: $("textarea[name=sym]").val(),
                userId: $("input[name=userId]").val(),
                username: $("#username").html(),
            },
            success: function (data) {
               let obj = JSON.parse(data);
               $('#history').html("");
               for(var i = 0 ; i < obj.length ; i++ ){
                   $('#history').append(" <div  class=\"record\">\n" +
                       " <p id=\"p1\">"+obj[i].username+":</p>\n" +
                       " <p id=\"p2\">"+obj[i].text+"</p>\n" +
                       " <p id=\"p3\">"+obj[i].time+"</p>\n" +
                       "\n" +
                       " <button class=\"delbtn\" value='' name=''>Delete</button>\n" +
                       " <button class=\"sendbtn\" value=\"\" name=\"\">Send to a doctor</button>"+
                       " </div>");
               }
               for(var i = 0 ; i < obj.length ; i++ ){
                   $($(".delbtn:eq("+i+")")).val(obj[i].id);
                   $($(".delbtn:eq("+i+")")).attr("name", obj[i].user_id)
                   $($(".sendbtn:eq("+i+")")).val(obj[i].id);
                   $($(".sendbtn:eq("+i+")")).attr("name", obj[i].user_id)
               }
                $(".delbtn").click(function (){
                    DeleteRecord(this);
               });
               $(".sendbtn").click(function (){
                    getDoctorList(this);
                });
               $(".record").hover(  function () {
                        $(this).find("button").fadeIn(100)
                    },
                    function () {
                       $(this).find("button").fadeOut(100)
                    }
                )
            },
        })
}

 $("#save").click(function (){
     $editArea.fadeOut(800);
     addRecord();
     $("textarea[name=sym]").val("");
 });


$(".delbtn").click(function (){
     DeleteRecord(this);
});

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

function getDoctorList(record){
     $("#selected").html(" <p style=\"margin-top: 20px\">Record selected</p>\n" +
         "                <p style=\"font-size: small\">please select a doctor</p>").fadeIn(200);
     setTimeout(function (){
         $("#selected").fadeOut(400);
     }, 2000);
     $.ajax({
            url: '/getDoctorList',
            type: 'post',
            data:{
            },
            success: function (data) {
                let obj = JSON.parse(data);
                $appointments.html("");
                for(var i = 0 ; i < obj.length ; i++ ){
                    var gender;
                    if(obj[i].gender == 'M'){
                        gender = 'Male'
                    }else if(obj[i].gender == 'F'){
                        gender = 'Female'
                    }else{
                        gender = ''
                    }
                    $appointments.append(" <div id=\"div01\">\n" +
                        "<div class=\"item\">\n" +
                        "<div id='user_id' style='display: none'>"+obj[i].user_id+"</div>"+
                        "<div class=\"Doc_pic\"></div>"+
                        "<div class=\"Doc_info\">\n" +
                        "<div class=\"name\">"+obj[i].first_name+"&nbsp;"+obj[i].last_name+"</div>\n" +
                        "<div class=\"info\">"+gender+" &emsp;"+ obj[i].age +"&emsp; "+obj[i].address+" <br>"+ obj[i].email+"</div>\n" +
                        "</div></div>");

               }
                var clickable = true;
                for(var i = 0 ; i < obj.length ; i++ ){
                     $(".Doc_pic:eq("+i+")").css(
                      {"background-image": "url('../../../.."+obj[i].img+"')"},
                      {"background-size": "cover"});

                     $(".item:eq("+i+")").hover(function (){
                            $(this).css("background-color", "rgba(0,0,0,0.5)");
                          },
                          function (){
                            $(this).css("background-color", "rgba(0,0,0,0)");
                     });
                     $(".item:eq("+i+")").click(function (){
                        if(clickable){
                            console.log("sympotm id: " + $(record).val());
                            console.log("patient id: "+ $(record).attr("name"));
                            console.log("Doctor id: "+$(this).find('#user_id').html());
                            clickable = false;
                            //发送请求 将记录保存到symTransaction表中
                             $.ajax({
                                url: '/sendRecordToDoctor',
                                type: 'post',
                                data:{
                                    "symId": $(record).val(),
                                    "patientId": $(record).attr("name"),
                                    "docId": $(this).find('#user_id').html(),
                                },
                                success: function (data) {
                                    $("#selected").html("<p style=\"margin-top: 30px\">Record Sent</p>").fadeIn(200);
                                        setTimeout(function (){
                                        $("#selected").fadeOut(400);
                                        }, 2000);
                                },

                                });
                        }else{
                             $("#selected").html("<p style=\"margin-top: 30px\">Please select a record</p>").fadeIn(200);
                             setTimeout(function (){
                                    $("#selected").fadeOut(400);
                            }, 2000);
                            console.log("choose a record")
                        }

                     });
                }

            }
        })
}
$(".sendbtn").click(function (){
    getDoctorList(this);
});

function getReceivedReply(){
  $.ajax({
      url: '/getReceivedReply',
      type: 'post',
      data: {
          userId: $("input[name=id]").val(),
      },
      success: function (data){
          let obj = JSON.parse(data);
          for(var i = 0 ; i < obj.length ; i++ ){
               console.log("From: "+ obj[i].first_name + " " + obj[i].last_name);
               console.log("original text: " + obj[i].text)
              console.log("reply: " + obj[i].analysis + "   " +obj[i].treatment)
          }

           $('#requestArea').html('');
                    for (var i = obj.length - 1; i >= 0; i--) {
                        if (obj[i].isRead == 1) {
                            $('#requestArea').append(
                                '<div class="request">\n' +
                                '<div class="red_point"></div>' +
                                '<div id="index" style="display: none">' + i + '</div>' +
                                '<div class="patient_photo"></div>\n' +
                                '<div class="patient_name" style="top: 8px">' + obj[i].first_name + ' ' + obj[i].last_name + '</div>\n' +
                                ' <div class="doc_info_left">' + obj[i].gender + '&emsp;'+ obj[i].age + '&emsp;' + obj[i].address +'</div>'+
                                '</div>'
                            );
                        } else {
                            $('#requestArea').append(
                                '<div class="request">\n' +
                                '<div class="red_point_unread"></div>' +
                                '<div id="index" style="display: none">' + i + '</div>' +
                                '<div class="patient_photo"></div>\n' +
                                '<div class="patient_name" style="top: 8px">' + obj[i].first_name + ' ' + obj[i].last_name + '</div>\n' +
                                ' <div class="doc_info_left">' + obj[i].gender + '&emsp;'+ obj[i].age + '&emsp;' + obj[i].address +'</div>'+
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
                        $("#rightArea").html(' <div class="reply_info">\n' +
                            '<p>Original message</p>\n' +
                            '<em>sent at: '+obj[index].create_time+'</em>\n' +
                            '<div class="doc_name">'+obj[index].first_name+' '+obj[index].last_name+'</div>\n' +
                            '<div class="ori_mes">'+ '&nbsp;&nbsp;'+ obj[index].text+'</div>\n' +
                            '<p>Analysis</p>\n' +
                            '<div class="ana_mes">\n' +'&nbsp;&nbsp;'+obj[index].analysis+
                            '<div class="reply_time">wrote at: '+obj[index].send_time+'</div>\n' +
                            '</div>\n' +
                            '<p>Treatment</p>\n' +
                            '<div class="treat_mes">\n' + '&nbsp;&nbsp;'+ obj[index].treatment+
                            '<div class="reply_time">wrote at: '+obj[index].send_time+'</div>\n' +
                            '</div>\n' +
                            '</div>')
                          $.ajax({
                            url: '/replyIsRead',
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
  });
}