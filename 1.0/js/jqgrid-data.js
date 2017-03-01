$(function () {
    $("#list").jqGrid({
        url: "getJobHistory.do",
        datatype: "json",
        mtype: "GET",
        colNames: ["Action", "group", "job name", "description", "date initiated", "status", "user"],
        colModel: [
            { name: "changeType",sortable: true },
            { name: "groupName", sortable: true},
            { name: "jobName",sortable: true },
            { name: "description",sortable: true },
            { name: "dateInitiated",sortable: true},
            { name: "status", sortable: true },
            { name: "user", sortable: true }
        ],
        pager: "#pager",
        rowNum: 10,
    rownumbers: true,
        rowList: [5, 10, 15, 20, 25, 50, 75, 100],
    height: 'auto',
        autowidth: 'true',
        width: null,
        shrinkToFit: false,
        sortname: "dateInitiated",
        sortorder: "desc",
    //loadonce: true,
        loadComplete: function () {
    $(this).find(">tbody>tr.jqgrow:odd").addClass("row-even");
    $(this).find(">tbody>tr.jqgrow:even").addClass("row-odd");
	$("#details-list").trigger("reloadGrid");
	
	
}
    }); 
}); 