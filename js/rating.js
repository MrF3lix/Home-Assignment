$(document).ready(function() {
    populateTable();

});

function populateTable()
{
    addItemToTable("1", "500 Startups", 0);
    addItemToTable("2", "NEA", 0);
    addItemToTable("3", "Y Combinator", 0);
}

function addItemToTable(index, name, votes)
{
    $("#companies tbody").append('<tr><td>' + index + '</td><td>' + name + '</td><td>' + votes + '</td><td><button type="button" class="btn btn-success vote up-vote">UP</button><button type="button" class="btn btn-danger vote down-vote">DOWN</button></td></tr>');
}