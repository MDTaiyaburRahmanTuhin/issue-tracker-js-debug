document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
    const getInputValue = id => document.getElementById(id).value;
    const description = getInputValue('issueDescription');
    const severity = getInputValue('issueSeverity');
    const assignedTo = getInputValue('issueAssignedTo');
    const id = Math.floor(Math.random() * 100000000) + '';
    const status = 'Open';

    const issue = { id, description, severity, assignedTo, status };
    let issues = [];
    if (localStorage.getItem('issues')) {
        issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueInputForm').reset();
    fetchIssues();
    e.preventDefault();
}

/* const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => parseInt(issue.id) === id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
} */
const setStatusClosed = id => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const currentIssue = issues.find(issue => parseInt(issue.id) === id)
    currentIssue.status = 'Closed';
    alert('This issue is closed');

    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues()
    document.getElementById('red').style.backgroundColor = 'red'
}
const deleteIssue = id => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const remainingIssues = issues.filter(issue => parseInt(issue.id) !== id)
    localStorage.setItem('issues', JSON.stringify(remainingIssues));
    location.reload();
}

const fetchIssues = () => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    if (issues === null) {
        console.log('no issues found');
        return
    }
    //console.log(issues);
    const issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
        const { id, description, severity, assignedTo, status } = issues[i];
        console.log(issues[i]);

        issuesList.innerHTML += `<div class="well">
      <h6>Issue ID: ${id} </h6>
      <p><span id='red' class="label label-info"> ${status} </span></p>
      <h3  id = ${id}_title> ${description} </h3>
      <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
      <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
      <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
      <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
      </div>`;

        if (issues[i].status == 'Closed') {
            document.getElementById(`${id}_title`).style.textDecoration = 'line-through';
            document.getElementById(`${id}_title`).style.textDecorationColor = 'red';
        }

    }
}
