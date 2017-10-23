$(document).ready(function() {
    populateTable();

    $(".vote").on('click', function(e){
        var isUpvote = false;
        if($(this).hasClass("up-vote"))
        {
            isUpvote = true;
        }
        
        var index = getIndexOfClickedItem(e);
        var oldIndex;

        updateVoteCount(index, isUpvote);

        while(index != oldIndex)
        {
            updatePositionOfElement(index, isUpvote);
            oldIndex = index;            
            index = getIndexOfClickedItem(e);
        }
    });
});

function populateTable()
{
    addItemToTable("1", "500 Startups", 0);
    addItemToTable("2", "NEA", 0);
    addItemToTable("3", "Y Combinator", 0);
}

function addItemToTable(index, name, votes)
{
    $("#companies tbody").append('<tr id="'+index+'"><td>' + index + '</td><td>' + name + '</td><td class="votes">' + votes + '</td><td><button type="button" class="btn btn-success vote up-vote">UP</button><button type="button" class="btn btn-danger vote down-vote">DOWN</button></td></tr>');
}

function getIndexOfClickedItem(e)
{
    return $(e.target.closest("tr")).index() + 1;
}

function updateVoteCount(index, isUpvote)
{
    var row = getElementFromIndex(parseInt(index));

    var voteDisplayElement = row.children(".votes:first");
    var currentVoteValueText = voteDisplayElement.text();
    var currentVoteValue = parseInt(currentVoteValueText);

    if(isUpvote)
    {
        voteDisplayElement.text(currentVoteValue + 1);   
    }
    else
    {        
        voteDisplayElement.text(currentVoteValue - 1);   
    }

}

function updatePositionOfElement(indexText, isUpvote)
{
    var index = parseInt(indexText);
    var nextElement = getNextElement(index, isUpvote);
    var currentElement = getElementFromIndex(index);
    var nextElementVoteCount = parseInt($(nextElement.children(".votes:first")).text());
    var currentElementVoteCount = parseInt($(currentElement.children(".votes:first")).text());

    if(!isUpvote && nextElementVoteCount > currentElementVoteCount)
    {
        currentElement.insertAfter(currentElement.next());
    }

    if(isUpvote && nextElementVoteCount < currentElementVoteCount)
    {
        currentElement.insertBefore(currentElement.prev());
    }
}

function getNextElement(index, isUpvote)
{
    if(isUpvote)
    {
        index--;
    }
    else
    {
        index++;
    }
    
    return getElementFromIndex(index);
}

function getElementFromIndex(index)
{
    return $("#companies tr").eq(index);
}