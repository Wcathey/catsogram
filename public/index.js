// Your code here
window.onload = () => {
    let container = document.createElement('div');
    container.className = "container";

    let title = document.createElement('h1');
    let catImage = document.createElement('img');


    async function getCatImage() {
        let response = await fetch("https://api.thecatapi.com/v1/images/search");
        let result =  await response.json()



        localStorage.setItem("currentImage", result[0].url);

        catImage.setAttribute('src', result[0].url)
    }
    if(localStorage.getItem('currentImage')) {
        catImage.setAttribute('src', localStorage.getItem('currentImage'))

    }
    else{
        getCatImage()
    }


    title.innerText = "Kitten Pic";


    document.body.appendChild(container);
    container.appendChild(title)
    document.body.appendChild(catImage);

    //phase2

    //create button that displays a new cat image
    let generateButton = document.createElement('button');
    generateButton.setAttribute("type", "submit");
    generateButton.innerText = "Next";

    document.body.appendChild(generateButton);

    //create a score holder
    let scoreHolder = document.createElement("h2");
    let score = 0;
    scoreHolder.innerText = `Popularity Score: ${score}`;
    scoreHolder.setAttribute('id', "score-holder")
    document.body.appendChild(scoreHolder)

    //create vote buttons
    let voteContainer = document.createElement('div');
    voteContainer.setAttribute('class', "vote-container")
    //create upvote
    let upVote = document.createElement('button');
    upVote.setAttribute("type", "submit");
    upVote.innerText = "Upvote";
    upVote.setAttribute('id', "up-vote")
    //create downvote
    let downVote = document.createElement('button');
    downVote.setAttribute("type", "submit");
    downVote.innerText = "Downvote"
    downVote.setAttribute('id', "down-vote")

    //add both the vote buttons to their container
    voteContainer.append(upVote, downVote);
    //add the container to the body
    document.body.appendChild(voteContainer)

    //create input with placeholder to add a comment with a button of submit
    let commentContainer = document.createElement('div');
    commentContainer.setAttribute('class', "comment-container")
    let commentLabel = document.createElement('label');
    commentLabel.innerText = "Comment:";

    let comment = document.createElement('input');
    comment.setAttribute("type", "text");
    comment.setAttribute("placeholder", "Add a comment...");
    comment.setAttribute("id", "comment-text")
    //create submit button
    let submitCommit = document.createElement('button');
    submitCommit.setAttribute('type', "submit");
    submitCommit.setAttribute('id', "submit-comment");
    submitCommit.innerText = "Submit"
    //add the label and input to its container then to the body

    commentContainer.append(commentLabel, comment, submitCommit);
    document.body.appendChild(commentContainer);

    //add a comment table to store the submitted comments
    let commentTable = document.createElement('div');
    let commentList = document.createElement('ul');
    commentList.setAttribute('id', "comment-data");
    commentTable.appendChild(commentList);
    //add the table to the body
    document.body.appendChild(commentTable)

    //if stored comment is in storage make it still appear on refresh
    if(localStorage.getItem('storedComment')){
        let savedComments = localStorage.getItem('storedComment');
        let commentArray = savedComments.split(';');
        commentArray.forEach((comment)=> {
            if(comment.length) {
            let storedComment = document.createElement('li');
            storedComment.innerText = comment
            commentList.appendChild(storedComment)
            }
        })
 }
 //if refresh keep popularity score the same
    if(localStorage.getItem('savedScore')) {
        score = localStorage.getItem('savedScore')
        document.getElementById('score-holder').innerText = `Popularity Score ${score}`
    }



//eventlisteners
    //create click event for next button to display a new image
    generateButton.addEventListener('click', (e) => {
        score = 0;
        document.getElementById('score-holder').innerText = `Popularity Score ${score}`
       let textInput = document.getElementById('comment-text')

        getCatImage();
        textInput.value = '';
        localStorage.setItem('storedComment', '');
        let comments = document.querySelectorAll('li');
        comments.forEach((comment)=> {
            comment.remove();
        })

        })
    //create click event for upvote that increases the value of score
    document.getElementById("up-vote").addEventListener('click', (e) => {
        score += 1
        document.getElementById('score-holder').innerText = `Popularity Score: ${score}`
        localStorage.setItem('savedScore', score);

    })
    //do same for downvote to lower the score
    document.getElementById('down-vote').addEventListener('click', (e) => {
        if(score > 0) {
            score -= 1
            scoreHolder.innerText = `Popularity Score: ${score}`
            localStorage.setItem('savedScore', score);

        }

    })

    document.getElementById('submit-comment').addEventListener('click', (e) => {
        let newComment = document.createElement('li');
        let commentText = document.getElementById('comment-text');
        newComment.innerText = commentText.value
        commentList.appendChild(newComment)
        //store comment data inside local storage
        let savedComments = localStorage.getItem("storedComment")
        localStorage.setItem("storedComment", savedComments + ';' + commentText.value)
        commentText.value = '';
        //if image exists in storage render same comment

    })



}
