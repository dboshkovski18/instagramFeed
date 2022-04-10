let posts = new Array();
let initialPosts = 0;
let morePosts = 4;

//Read the data.json file and store them in the posts array
fetch("data.json")
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            posts.push(data[i]);
        }
        loadPosts(initialPosts, morePosts);
    });

//test the posts array
console.log(posts)

//function for loading all the posts
let loadPosts = function (initialPosts, morePosts) {
    let output = document.querySelector("#posts").innerHTML;

    for (var i = initialPosts; i < morePosts; i++) {
        output += `
    <div class="card" >

        <div class="card-header">
            <div class="user">
                <img src="${posts[i].profile_image}" />
                <div class="user-info">
                    <b>${posts[i].name}</b><br/>
                    <small>${new Date(posts[i].date).toDateString()}</small>
                </div>

            </div>
            <img src="instagram-logo.svg" class="instagram-logo"/>
        </div>

        <div class="card-body">
            <img src="${posts[i].image}" class="card-image"/>
            <div class="card-text">
               ${posts[i].caption == "" ? "No caption by the user :(" : posts[i].caption.substring(0, 100) + "..."}
              
            </div>
        </div>
        <hr class="card-line">
        <div class="card-footer">
            <img src="heart.svg" id="heart-${i}" class="heart" onclick="likeAPost(${i})"/>
            <small class="likes" id="${i}">${posts[i].likes}</small>
             <button type="button" id="open" class="view" onclick="openPost(${i})">View post</button>
        </div>

    </div>`
    }
    document.querySelector("#posts").innerHTML = output;
}

//function for calling the loadPosts method for the next four posts without loading the present again
//plus checking if the number of card classes - posts are equal to the number of posts in the data.json
let loadMorePosts = function () {
    loadPosts(initialPosts += 4, morePosts += 4)
    if (document.getElementsByClassName("card").length == posts.length) {
        document.querySelector(".load-more").setAttribute("hidden", "true")
    }
}

//this function is called for not loading all the posts again and lose all of the styles and classes appended
let loadLikes = function (i) {
    document.getElementById(i).innerText = posts[i].likes;
    if(document.getElementById("modal-"+i) != undefined){
        document.getElementById("modal-"+i).innerText = posts[i].likes;
    }
}

//this method is called when clicked on the heart icon and increasing or decreasing the number of likes of that post
let likeAPost = function (i) {
    if (document.getElementById("heart-" + i).classList.contains("liked") ) {
        likes = parseInt(posts[i].likes) - 1;
        posts[i].likes = likes;
        loadLikes(i);
        document.getElementById("heart-" + i).classList.remove("liked")
        document.getElementById("heart-modal-" + i).classList.remove("liked")
    } else {
        likes = parseInt(posts[i].likes) + 1;
        posts[i].likes = likes;
        loadLikes(i);
        document.getElementById("heart-" + i).classList.add("liked");
        document.getElementById("heart-modal-" + i).classList.add("liked")
    }
}

let openPost = function (i) {

    var classes = document.getElementById("heart-"+i).classList


    let modal = `<div class="modal-image"><img src="${posts[i].image}"/></div>
        <div class="modal-info">
            <div class="modal-user">
                <img src="${posts[i].profile_image}"/>
                <h3>${posts[i].name}</h3>
                <p>${new Date(posts[i].date).toDateString()}</p>
            </div>
            <img src="instagram-logo.svg" class="intagram-modal"/>
            <hr class="modal-line"/>
            <div class="modal-text">
                ${posts[i].caption}
            </div>
            <div class="modal-likes">
                <img src="heart.svg" id="heart-modal-${i}" class="${classes}" onclick="likeAPost(${i})"/>
                <p id="modal-${i}" >${posts[i].likes}</p>
            </div>
            
        </div>`

    document.getElementById("render_modal").innerHTML = modal;
    document.getElementById("modal_container").classList.add("show");
}

let closePost = function () {
    document.getElementById("modal_container").classList.remove("show");
}


