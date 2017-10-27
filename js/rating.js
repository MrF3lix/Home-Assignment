$(document).ready(function() {
    populateTable();

    $(".vote").on('click', function(e){
        updateTableSort(e);        
    });
});

function populateTable()
{
    addItemToTable("1", "500 Startups", 0);
    addItemToTable("2", "NEA", 0);
    addItemToTable("3", "Y Combinator", 0);
    addItemToTable("4", "Sequoia Capital", 0);
    addItemToTable("5", "Accel", 0);
    addItemToTable("6", "Kleiner Perkins", 0);
    addItemToTable("7", "Intel Capital", 0);
    addItemToTable("8", "Greylock Partners", 0);
}

function addItemToTable(index, name, votes)
{
    var row = $('<tr id="'+index+'">' +
                    '<td>' + index + '</td>' +
                    '<td>' + name + '</td>' +
                    '<td class="votes">' + votes + '</td>' +
                    '<td>' +
                        '<button type="button" class="btn btn-success vote up-vote"></button>' +
                        '<button type="button" class="btn btn-danger vote down-vote"></button>' +
                    '</td>' +
                '</tr>');

    $("#companies tbody").append(row);
    $("#" + index).children("td").wrapInner("<div class='cell-content'></div>");
}

function updateTableSort(e)
{
    var isUpvote = false;
    var index = getIndexOfClickedItem(e);
    var currentRow = getElementFromIndex(index);

    if($(e.target).hasClass("up-vote"))
    {
        isUpvote = true;
    }
    
    updateVoteCount(currentRow, index, isUpvote);
    updatePositionOfElement(currentRow, index, isUpvote);
}

function updateVoteCount(currentRow, index, isUpvote)
{
    var voteCount = getVoteCountFromIndex(index);
    var newVoteCount = voteCount;

    if(isUpvote)
    {
        newVoteCount++; 
    }
    else
    {        
        newVoteCount--;
    }
    
    currentRow.find(".votes>div:first").text(newVoteCount); 
}

function updatePositionOfElement(currentElement, index, isUpvote)
{
    var nextIndex = getNextElementIndex(index, isUpvote);
    var nextElement = getElementFromIndex(nextIndex);
    var currentElementVoteCount = getVoteCountFromIndex(index);
    var nextElementVoteCount = getVoteCountFromIndex(nextIndex);
    var currentElementCellContent = currentElement.find(".cell-content");
    var nextElementCellContent = nextElement.find(".cell-content");
    var dif = index - nextIndex;

    if(!isUpvote && nextElementVoteCount > currentElementVoteCount)
    {    
        var slideDistance = currentElement.height() * -dif; 
        var animationSpeed = 100 * -dif;

        slideRowDown(animationSpeed, currentElementCellContent, currentElement, nextElement, slideDistance)
        slideNextElement(animationSpeed, nextElementCellContent, -slideDistance)
    }

    if(isUpvote && nextElementVoteCount < currentElementVoteCount)
    {
        var slideDistance = currentElement.height() * dif; 
        var animationSpeed = 100 * dif;

        slideRowUp(animationSpeed, currentElementCellContent, currentElement, nextElement, -slideDistance)
        slideNextElement(animationSpeed, nextElementCellContent, slideDistance)
    }
}

function slideRowDown(animationSpeed, cellContent, currentElement, nextElement, currentElementSlideDistance)
{ 
        cellContent.animate({
            top: currentElementSlideDistance
        }, animationSpeed).promise().then(function(){
            currentElement.insertAfter(nextElement);
            cellContent.css('top', '0');
        });
}

function slideRowUp(animationSpeed, cellContent, currentElement, nextElement, currentElementSlideDistance)
{ 
        cellContent.animate({
            top: currentElementSlideDistance
        }, animationSpeed).promise().then(function(){
            currentElement.insertBefore(nextElement);
            cellContent.css('top', '0');
        });
}

function slideNextElement(animationSpeed, nextCellContent, nextElementSlideDistance)
{
    nextCellContent.animate({
        top: nextElementSlideDistance
    }, animationSpeed).promise().then(function(){
        nextCellContent.css('top', '0');
    });
}

function getNextElementIndex(index, isUpvote)
{
    var nextIndex = index;  
    
    if(isUpvote)
    {   
        do{
            nextIndex--;

            var curVote = getVoteCountFromIndex(index);
            var nextVote = getVoteCountFromIndex(nextIndex)

        }while(curVote > nextVote || nextVote == null);

        nextIndex++;
    }
    else
    {
        do{
            nextIndex++;

            var curVote = getVoteCountFromIndex(index);
            var nextVote = getVoteCountFromIndex(nextIndex)

        }while(curVote < nextVote || nextVote == null);

        nextIndex--;
    }

    return nextIndex;
}

function getElementFromIndex(index)
{
    return $("#companies tr").eq(index);
}

function getVoteCountFromIndex(index)
{
    var row = getElementFromIndex(index);
    var countText = row.find(".votes:first").text();

    return parseInt(countText);
}

function getIndexOfClickedItem(e)
{
    return $(e.target.closest("tr")).index() + 1;
}