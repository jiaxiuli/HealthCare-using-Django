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
const $unreadCount = $(".unreadCount");
const $count = $(".count");

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

//向服务器询问是否有未读消息
setInterval(function (){
    checkIfUnreadMessage();
}, 500)

getAppointmentList();
$naviArray.click(function(){
    var index = this.getAttribute("value");
    $naviArray.each(function(){
        if(index === this.getAttribute("value")){
            $(this).css('background-color', 'rgba(0, 0, 0, 0.3)');
        }else{
            $(this).css('background-color', 'rgba(0, 0, 0, 0)');
        }
    });
    if(index == 1){
       getAppointmentList();
    }
    if(index == 3 || index == 4 || index == 5){
        if(index == 3){
            getReceivedReply();
        }else if(index == 4){
            getChatHistory();
        }else{
            appointmentGetDocList();
            getAppointmentList();
        }

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
                    getDoctorList(this, 0, true, true);
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
                    getDoctorList(this, 0, true, true);
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

function getDoctorList(record, docType, clickable, show){
     if(show){
          $("#selected").html(" <p style=\"margin-top: 20px\">Record selected</p>\n" +
         "                <p style=\"font-size: small\">please select a doctor</p>").fadeIn(200);
        setTimeout(function (){
         $("#selected").fadeOut(400);
     }, 2000);
     }

     $.ajax({
            url: '/getDoctorList',
            type: 'post',
            data:{
            },
            success: function (data) {
                let obj = JSON.parse(data);

                $('#rightArea').html(
                      '<select id="docListSelect">'+
                     ' <option value="0">All</option>'+
                      ' <option value="1">General Practitioner</option>'+
                     '  <option value="2">Pediatrician</option>'+
                      ' <option value="3">Endocrinologist</option>'+
                      ' <option value="4">Neurologist</option>'+
                      ' <option value="5">Rheumatologist</option>'+
                      ' <option value="6">Nephrologist</option>'+
                      ' <option value="7">Pulmonologist</option>'+
                      ' <option value="8">Surgeon</option>'+
                     '  <option value="9">Ophthalmologist</option>'+
                      ' <option value="10">Oncologist</option>'+
                      ' <option value="11">Urologist</option>'+
                      ' <option value="12">Otolaryngologist</option>'+
                      ' <option value="13">Dermatologist</option>'+
                      ' <option value="14">Cardiologist</option>'+
                '</select>'+
                    "<div id='appointments'>" +
                    "</div>");
                $("#docListSelect").find("option[value='"+docType+"']").attr("selected",true);
                for(var i = 0 ; i < obj.length ; i++ ){
                    var gender;
                    if(obj[i].gender == 'M'){
                        gender = 'Male'
                    }else if(obj[i].gender == 'F'){
                        gender = 'Female'
                    }else{
                        gender = ''
                    }
                    if(docType==0){
                        $('#appointments').append(
                        "<div id=\"div01\">\n" +
                        "<div class=\"item\">\n" +
                        "<div class='unvisibleindex' style='display: none'>"+i+"</div>\n"+
                        "<div id='user_id' style='display: none'>"+obj[i].user_id+"</div>"+
                        "<div class=\"Doc_pic\"></div>"+
                        "<div class=\"Doc_info\">\n" +
                        "<div class=\"name\">"+obj[i].first_name+"&nbsp;"+obj[i].last_name+"</div>\n" +
                        "<div class=\"info\">"+gender+" &emsp;"+ obj[i].age +"&emsp; "+obj[i].address+" <br>"+ obj[i].email+"</div>\n" +
                        "</div>"+
                        "</div>"
                       );
                    }else{
                        if(docType==obj[i].department){
                            $('#appointments').append(
                            "<div id=\"div01\">\n" +
                            "<div class=\"item\">\n" +
                            "<div class='unvisibleindex' style='display: none'>"+i+"</div>\n"+
                            "<div id='user_id' style='display: none'>"+obj[i].user_id+"</div>"+
                            "<div class=\"Doc_pic\"></div>"+
                            "<div class=\"Doc_info\">\n" +
                            "<div class=\"name\">"+obj[i].first_name+"&nbsp;"+obj[i].last_name+"</div>\n" +
                            "<div class=\"info\">"+gender+" &emsp;"+ obj[i].age +"&emsp; "+obj[i].address+" <br>"+ obj[i].email+"</div>\n" +
                            "</div>"+
                            "</div>");
                        }
                    }


               }
                // var clickable = true;
                var itemcount = 0;
                for(var i = 0 ; i < obj.length ; i++ ){
                    if(docType==0){
                         $(".Doc_pic:eq("+i+")").css(
                        {"background-image": "url('../../../.."+obj[i].img+"')"},
                        {"background-size": "cover"});
                    }else{
                        if(docType == obj[i].department){
                              $(".Doc_pic:eq("+itemcount+")").css(
                            {"background-image": "url('../../../.."+obj[i].img+"')"},
                            {"background-size": "cover"});
                            itemcount++;
                        }
                    }


                     $(".item:eq("+i+")").hover(function (){
                            var index = $(this).find('.unvisibleindex').html();
                            let gender = 'Male';
                            if(obj[index].gender == 'F'){
                                gender = 'Female';
                            }
                            let department = 'General Practitioner';
                            switch (obj[index].department){
                               case '1': department = 'General Practitioner';break;
                               case '2': department = 'Pediatrician';break;
                               case '3': department = 'Endocrinologist';break;
                               case '4': department = 'Neurologist';break;
                               case '5': department = 'Rheumatologist';break;
                               case '6': department = 'Nephrologist';break;
                               case '7': department = 'Pulmonologist';break;
                               case '8': department = 'Surgeon';break;
                               case '9': department = 'Ophthalmologist';break;
                               case '10': department = 'Oncologist';break;
                               case '11': department = 'Urologist';break;
                               case '12': department = 'Otolaryngologist';break;
                               case '13': department = 'Dermatologist';break;
                               case '14': department = 'Cardiologist';break;
                            }
                            let main = '';
                            let quote = '';
                            if(obj[index].main == null){
                                main = '';
                            }else{
                                main = obj[index].main;
                            }
                            if(obj[index].quote == null){
                                quote = '';
                            }else{
                                quote = obj[index].quote;
                            }
                            $('#docInfoHover').html(' <div id="infoWholeofHover">\n' +
                                '        <div class="infoItemSingle"> <b>User id:</b>&emsp;'+obj[index].user_id+'</div>\n' +
                                '        <div class="infoItemSingle"> <b>Username:</b> &emsp;'+obj[index].username+'</div>\n' +
                                '        <div class="infoItemSingle"> <b>Name:</b> &emsp;'+obj[index].first_name+' '+obj[index].last_name+'</div>\n' +
                                '        <div class="infoItemSingle"> <b>Gender:</b> &emsp;'+gender+'</div>\n' +
                                '        <div class="infoItemSingle"> <b>Age:</b> &emsp;'+obj[index].age+'</div>\n' +
                                '        <div class="infoItemSingle"> <b>Email:</b> &emsp;'+obj[index].email+'</div>\n' +
                                '        <div class="infoItemSingle"> <b>Address:</b> &emsp;'+obj[index].address+'</div>\n' +
                                '        <div class="infoItemSingle"> <b>Department:</b> &emsp;'+department+'</div>\n' +
                                '        <div class="infoItemSingle"> <b>Reasearch Interests:</b> &emsp;\n' +
                                '            <br>\n' +
                                '            '+main+'\n' +
                                '        </div>\n' +
                                '        <div class="infoItemSingle"> <b>Motto:</b> &emsp;\n' +
                                '            <br>\n' +
                                '            '+quote+'\n' +
                                '        </div>\n' +
                                '    </div>');
                            $('#docInfoHover').css('display', 'block');
                            $(this).css("background-color", "rgba(0,0,0,0.5)");
                          },
                          function (){
                            $('#docInfoHover').css('display', 'none');
                            $(this).css("background-color", "rgba(0,0,0,0)");
                     });
                     $('#docListSelect').change(function (){
                         var val = $('#docListSelect').val();
                         getDoctorList(record, val, true, false);
                     });
                     $(".item:eq("+i+")").click(function (){
                        if(clickable){

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
                        }

                     });
                }

            },
         error:function (){
                console.log("error")
         }
        })
}
$(".sendbtn").click(function (){
    getDoctorList(this, 0, true, true);
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
                    let doc_id = $(this).find('.chatsendto').html();
                    let pat_id = $("input[name=id]").val();
                    $('#rightArea').html(
                    '<p class="chatToWho_id" style="display: none">'+$(this).find('.chatsendto').html()+'</p>'+
                    '<p class="chatToWho">Chatting with: '+$(this).find('.chat_name').html()+'</p>'+
                    ' <div class="chat_history"></div>\n' +
                    '<textarea class="chat_input"></textarea>\n' +
                    '<button class="chat_send">Send</button>');
                    //消息已读
                    messageHasBeenRead(doc_id, pat_id, this);
                     //请求聊天记录
                    requestChatHistory(doc_id, pat_id);
                     //滚动条最下面
                   $('.chat_history').scrollTop( $('.chat_history')[0].scrollHeight );
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
function appointmentGetDocList(){

     $.ajax({
       url: "/appointmentGetDocList",
       type: "post",
       data:{

       } ,
       success: function (data){
            let obj = JSON.parse(data);
            $('#appointmentDoc').html('');
            for(var i = 0 ; i < obj.length ; i++ ){
                 $('#appointmentDoc').append('<option value="'+obj[i].user_id+'">'+obj[i].first_name+' '+obj[i].last_name+'</option>');
            }

        }
    });
}
$('#appointmentSubmit').click(function (){
    let appointDoc = $('#appointmentDoc').val();
    let appointDate = $('#appointmentDate').val();
    let appointTime = $('#appointmentTime').val();
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var today = year+'-'+month+'-'+day;

    var date1 = new Date(today);
    var date2 = new Date(appointDate);

    if(date1.getTime() >= date2.getTime() || appointDate == ''){
        $('#connotBook').fadeIn(400);
        setTimeout(function (){
             $('#connotBook').fadeOut(400);
        }, 2500);
    }else{
        $.ajax({
       url: "/makeAppointment",
       type: "post",
       data:{
           patient: $("input[name=id]").val(),
           doctor: appointDoc,
           date: appointDate,
           time: appointTime
       } ,
       success: function (data){
           $('#booked').fadeIn(400);
        setTimeout(function (){
             $('#booked').fadeOut(400);
        }, 2500);
            getAppointmentList();
        }
    });
    }
});
function getAppointmentList(){
     $.ajax({
       url: "/getAppointmentList",
       type: "post",
       data:{
           patient: $("input[name=id]").val()
       } ,
       success: function (data) {
           let obj = JSON.parse(data);
           if(obj.length == 0){
               $('#rightArea').html('<div id="appointments">\n' +
               '            <div id="noAppoint">No appointment currently</div>'+
           '                </div>');
           }else{
                $('#rightArea').html('<div id="appointments">\n' +
                    '       <div id="appointmentToday"><p>Today</p></div>'+
               '            <div id="hasAppoint">'+
           '                </div>'+
           '                </div>');
           $('#hasAppoint').html('');
             var date = new Date();
             var year = date.getFullYear();
             var month = date.getMonth() + 1;
             var day = date.getDate();
             var today = year+'-'+month+'-'+day;
             var dateToday = new Date(today);
             var hasAppToday = false;
           for(var i = 0 ; i < obj.length ; i++){

                if(today == obj[i].date){
                    hasAppToday = true;
                    let name = obj[i].first_name + ' ' + obj[i].last_name;
                    let time;
                    if(obj[i].time == 8){
                        time = "8am - 10am";
                    }else if(obj[i].time == 10){
                        time = "10am - 12am";
                    }else if(obj[i].time == 14){
                        time = "2pm - 4pm";
                    }else{
                        time = "4pm - 6pm";
                    }
                    $('#appointmentToday').append(
                        '<div class="appointTodayItems">'+time+'<br>---'+name+'<br>'+'<hr>'+'</div>'
                    );
                }
           }
           if(!hasAppToday){
                 $('#appointmentToday').append(
                        '<div class="appointTodayItems">No appointment today.<br><hr></div>'
                    );
           }
           var appointNum = 1;
           for(var i = 0 ; i < obj.length ; i++ ){
               var dateDay = new Date(obj[i].date);
               if(dateDay > dateToday){
                       let name = obj[i].first_name + ' ' + obj[i].last_name;
                       let time;
                       if(obj[i].time == 8){
                           time = "8am - 10am";
                       }else if(obj[i].time == 10){
                           time = "10am - 12am";
                       }else if(obj[i].time == 14){
                           time = "2pm - 4pm";
                       }else{
                           time = "4pm - 6pm";
                       }
                       $('#hasAppoint').append(' <div class="appointItems">\n' +
                       '                    <p class="appointID" style="display: none">'+obj[i].id+'</p>\n' +
                       '                    <p>appointment #'+appointNum+'</p>\n' +
                       '                    <p>With:&emsp; '+name+'</p>\n' +
                       '                    <p>Date:&emsp; '+obj[i].date+'</p>\n' +
                       '                    <p>Time:&emsp; '+time+'</p>\n' +
                       '                    <button class="appointCancel">Cancel this appointment</button>\n' +
                       '                </div>');
                       appointNum++;
                       }
           }
           $(".appointCancel").click(function (){
              let appointID = $(this).siblings('.appointID').html();
                $.ajax({
                    url: "/deleteAppointment",
                    type: "post",
                    data:{
                        appointID: appointID
                    } ,
                    success: function (data){
                          $('#canceled').fadeIn(400);
                            setTimeout(function (){
                            $('#canceled').fadeOut(400);
                            }, 2500);
                        getAppointmentList();
                    }
                    });
           });
           }


       }
    });
}