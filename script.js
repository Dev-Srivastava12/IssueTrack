document.getElementById("issueInputForm").addEventListener("submit", saveIssue);

function saveIssue(e) {
  var issueDesc = document.getElementById("issueDescInput").value;
  var issueSeverity = document.getElementById("issueSeverityInput").value;
  var issueAssignedTo = document.getElementById("issueAssignedToInput").value;
  var issueId = chance.guid();
  var issueStatus = "Open";
  let issueState = "new";

  var issue = {
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    assignedTo: issueAssignedTo,
    status: issueStatus,
    state: issueState,
  };

  if (localStorage.getItem("issues") == null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem("issues"));
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  }

  document.getElementById("issueInputForm").reset();

  fetchIssues();

  e.preventDefault();
}

function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));
  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "Closed";
    }
  }

  localStorage.setItem("issues", JSON.stringify(issues));

  fetchIssues();

  document.location.reload();
}

function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));
  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1);
    }
  }

  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
  document.location.reload();
}

function prevState(id) {
  const issues = JSON.parse(localStorage.getItem("issues"));
  console.log("prev");
  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id && issues[i].state !== 'new') {
      var issueState = checkPrevState(issues[i].state);
      issues[i].state = issueState;
      break;
    }
  }
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
  document.location.reload();
}

function checkPrevState(issueState) {
  if (issueState === "done") {
    return "QA";
  }
  if (issueState === "QA") {
    return "development";
  }
  if (issueState === "development") {
    return "new";
  }
}

function nextState(id) {
  const issues = JSON.parse(localStorage.getItem("issues"));
  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id && issues[i].state !== 'done') {
      var issueState = checkNextState(issues[i].state);
      issues[i].state = issueState;
      console.log(issueState);
      break;
    }
  }
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
  document.location.reload();
}

function checkNextState(issueState) {
  if (issueState === "new") {
    return "development";
  }
  if (issueState === "development") {
    return "QA";
  }
  if (issueState === "QA") {
    return "done";
  }
}

function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem("issues"));

  var issuesList = document.getElementById("issuesList");
  var developmentList = document.getElementById("developmentList");
  var QAList = document.getElementById("QAList");
  var DoneList = document.getElementById("DoneList");

  issuesList.innerHTML = "";

  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;
    var issueState = issues[i].state;

    if (issueState === "new") {
      issuesList.innerHTML +=
        '<div class = "well" style="margin-right: 10px; width:23.6%">' +
        "<h6>Issue ID: " +
        id +
        "</h6>" +
        '<p><span class = "label label-info">' +
        status +
        "</span></p>" +
        "<h3>" +
        desc +
        "</h3>" +
        '<p><span class = "glypicon glypicon-time"></span> ' +
        severity +
        "</p>" +
        '<p><span class = "glypicon glypicon-user"></span> ' +
        assignedTo +
        "</p>" +
        '<div style="display: flex; justify-content: space-between;">' +
        // '<div>'+
        "<span>" +
        '<a href = "#" onclick = "setStatusClosed(\'' +
        id +
        '\')" class = "btn btn-warning">Close</a> ' +
        '<a href = "#" onclick = "deleteIssue(\'' +
        id +
        '\')" class = "btn btn-danger">Delete</a>' +
        "</span>" +
        // '</div>'+
        // '<div>'+
        "<span>" +
        '<a href = "#" onclick = "prevState(\'' +
        id +
        '\')" class = "btn btn-danger">Prev</a> ' +
        '<a href = "#" onclick = "nextState(\'' +
        id +
        '\')" class = "btn btn-danger">Next</a>' +
        "</span>" +
        // '</div>'+
        "</div>" +
        // '<a href = "#" onclick = "setStatusClosed(\''+id+'\')" class = "btn btn-warning">Close</a> ' +
        // '<a href = "#" onclick = "deleteIssue(\''+id+'\')" class = "btn btn-danger">Delete</a>' +

        "</div>";
    }

    if (issueState === "development") {
      developmentList.innerHTML +=
        '<div class = "well" style="margin-right: 10px; width:23.6%">' +
        "<h6>Issue ID: " +
        id +
        "</h6>" +
        '<p><span class = "label label-info">' +
        status +
        "</span></p>" +
        "<h3>" +
        desc +
        "</h3>" +
        '<p><span class = "glypicon glypicon-time"></span> ' +
        severity +
        "</p>" +
        '<p><span class = "glypicon glypicon-user"></span> ' +
        assignedTo +
        "</p>" +
        '<div style="display: flex; justify-content: space-between;">' +
        // '<div>'+
        "<span>" +
        '<a href = "#" onclick = "setStatusClosed(\'' +
        id +
        '\')" class = "btn btn-warning">Close</a> ' +
        '<a href = "#" onclick = "deleteIssue(\'' +
        id +
        '\')" class = "btn btn-danger">Delete</a>' +
        "</span>" +
        // '</div>'+
        // '<div>'+
        "<span>" +
        '<a href = "#" onclick = "prevState(\'' +
        id +
        '\')" class = "btn btn-danger">Prev</a> ' +
        '<a href = "#" onclick = "nextState(\'' +
        id +
        '\')" class = "btn btn-danger">Next</a>' +
        "</span>" +
        // '</div>'+
        "</div>" +
        // '<a href = "#" onclick = "setStatusClosed(\''+id+'\')" class = "btn btn-warning">Close</a> ' +
        // '<a href = "#" onclick = "deleteIssue(\''+id+'\')" class = "btn btn-danger">Delete</a>' +

        "</div>";
    }

    if (issueState === "QA") {
      QAList.innerHTML +=
        '<div class = "well" style="margin-right: 10px; width:23.6%">' +
        "<h6>Issue ID: " +
        id +
        "</h6>" +
        '<p><span class = "label label-info">' +
        status +
        "</span></p>" +
        "<h3>" +
        desc +
        "</h3>" +
        '<p><span class = "glypicon glypicon-time"></span> ' +
        severity +
        "</p>" +
        '<p><span class = "glypicon glypicon-user"></span> ' +
        assignedTo +
        "</p>" +
        '<div style="display: flex; justify-content: space-between;">' +
        // '<div>'+
        "<span>" +
        '<a href = "#" onclick = "setStatusClosed(\'' +
        id +
        '\')" class = "btn btn-warning">Close</a> ' +
        '<a href = "#" onclick = "deleteIssue(\'' +
        id +
        '\')" class = "btn btn-danger">Delete</a>' +
        "</span>" +
        // '</div>'+
        // '<div>'+
        "<span>" +
        '<a href = "#" onclick = "prevState(\'' +
        id +
        '\')" class = "btn btn-danger">Prev</a> ' +
        '<a href = "#" onclick = "nextState(\'' +
        id +
        '\')" class = "btn btn-danger">Next</a>' +
        "</span>" +
        // '</div>'+
        "</div>" +
        // '<a href = "#" onclick = "setStatusClosed(\''+id+'\')" class = "btn btn-warning">Close</a> ' +
        // '<a href = "#" onclick = "deleteIssue(\''+id+'\')" class = "btn btn-danger">Delete</a>' +

        "</div>";
    }

    if (issueState === "done") {
      DoneList.innerHTML +=
        '<div class = "well" style="margin-right: 10px; width:23.6%">' +
        "<h6>Issue ID: " +
        id +
        "</h6>" +
        '<p><span class = "label label-info">' +
        status +
        "</span></p>" +
        "<h3>" +
        desc +
        "</h3>" +
        '<p><span class = "glypicon glypicon-time"></span> ' +
        severity +
        "</p>" +
        '<p><span class = "glypicon glypicon-user"></span> ' +
        assignedTo +
        "</p>" +
        '<div style="display: flex; justify-content: space-between;">' +
        // '<div>'+
        "<span>" +
        '<a href = "#" onclick = "setStatusClosed(\'' +
        id +
        '\')" class = "btn btn-warning">Close</a> ' +
        '<a href = "#" onclick = "deleteIssue(\'' +
        id +
        '\')" class = "btn btn-danger">Delete</a>' +
        "</span>" +
        // '</div>'+
        // '<div>'+
        "<span>" +
        '<a href = "#" onclick = "prevState(\'' +
        id +
        '\')" class = "btn btn-danger">Prev</a> ' +
        '<a href = "#" onclick = "nextState(\'' +
        id +
        '\')" class = "btn btn-danger">Next</a>' +
        "</span>" +
        // '</div>'+
        "</div>" +
        // '<a href = "#" onclick = "setStatusClosed(\''+id+'\')" class = "btn btn-warning">Close</a> ' +
        // '<a href = "#" onclick = "deleteIssue(\''+id+'\')" class = "btn btn-danger">Delete</a>' +

        "</div>";
    }
  }
  // setTimeout(() => {
  //   document.location.reload();
  // }, 3000);
}
