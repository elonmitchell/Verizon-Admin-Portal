
//
//
function submitOperation(){
    //get the modification type and capitalize the first letter
    var modType = $("#main-form-wrap #modify_li input:checked").val();
    var operation = modType.charAt(0).toUpperCase() + modType.substring(1);
    $.ajax({
    url:'mod'+ operation +'.do',
    type:'POST',
    dataType: 'json',
    data: {
        jobName: function(){return $("#main-form-wrap #job_field").val()},
        jobDescription: function(){return $("#main-form-wrap #job-description").val()},
        groupName: function(){return $("#main-form-wrap #group option:selected").val()},
        modifyType: modType,
        //setState: function(){return $(".msisdn-num").nextAll().children("input:checked").val()},
        //enabledProfile: function(){return $("#main-form-wrap input[name=set_state]:checked").val()},
        eidn: function(){
             var allRows =[];
             var eidCell = $("#overview-list td[aria-describedby='overview-list_eidList']")
             eidCell.each(function() {
                if($(this).siblings(".add-this").hasClass("added")){
                    console.log("checked");
                var eachRow = {};
                var msisdnSelected = $(this).siblings(".msisdn-num").find(".msisdn-select option:selected");
                var iccidSelected = $(this).siblings(".msisdn-des").find(".iccid-num");
                var stateSelected = $(this).siblings(".msisdn-num").nextAll().children("input:checked");
                eachRow["eid"] = $(this).html();
                eachRow["iccid"] = iccidSelected.text();
                eachRow["msisdn"] =msisdnSelected.text();
                eachRow["state"] = stateSelected.val();
                allRows.push(eachRow);
            }
             });
             return JSON.stringify(allRows);
         }
    },
    success: function( data ) {
        if(data.response.statusCode == "200"){
            // force the operations to reset
            $("#main-form #start_operation").trigger("change");
            //
            $("#request_li #request-message span").text(data.response.statusMessage);
            //retain the message
            $("#request_li #request-message").addClass("success").show();
            $("#main-form #request_li").show();

        }else{
            $("#request_li #request-message span").text(data.response.statusMessage);
            //retain the message
            $("#request_li #request-message").removeClass("success").show();
            $("#main-form #request_li").show();

        }
         $("#list").trigger("reloadGrid");
         $("#overview .close-panel-bt").trigger("click");
        },
    error: function( data ) {
        ("#request_li #request-message").removeClass("success");
        $("#request_li #request-message span").html(data.response.statusMessage);
        },
    });

}
//
//
//
// history search
function showHistory(){
    $("#details-list").trigger("reloadGrid");
    //
    $("#list").jqGrid("setGridParam",{mtype: "POST"}).jqGrid("setGridParam",{postData: 
        {
        fromTime: function(){return $("#history-bar #from-date").val()},
        toTime: function(){return $("#history-bar #to-date").val()},
        changeFilter: function(){return $("#history-bar #subChange:checked").val()},
        downloadFilter: function(){return $("#history-bar #profileDownload:checked").val()},
        stopFilter: function(){return $("#history-bar #subStop:checked").val()},
    }}).trigger("reloadGrid")
  
}
//
  //populate last job sent mesage
  $.getJSON("getJobHistory.do?page=1&rows=1",function(data){
    if(data.rows[0] != undefined || data.rows[0] != null){
    $("#branding-list #status #tense").text("has");
    // switch has to is for proccessing status
    if(data.rows[0].cell[5] =="IN_PROGRESS"){
        $("#branding-list #status #tense").text("is");
    }
        $("#branding-list #status #j-name").text('"'+data.rows[0].cell[2]+'"');
        $("#branding-list #status #j-stat").text(data.rows[0].cell[5]+".");
    }

  });
// 

