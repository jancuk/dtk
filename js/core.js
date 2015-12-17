var posts;
var port = chrome.extension.connect({name: "detikcon Newsfeed"});
var init = function(){

  document.$getJSON("http://detikcom.herokuapp.com/newsfeeds", function(posts) {
    posts.reverse();
    for (var i = 0;i < posts.length;i++){
      addPost(posts[i]);
    }
  });

}

var addPost = function(post) {
  var postDom = document.createElement("div");
  postDom.classList.add("post");

  postDom.innerHTML += "<h2><a href='"+post.url+"' target='_blank'>"+post.title+"</h2>";
  postDom.innerHTML += "<p>" + post.description + "</p>";
  postDom.innerHTML += "<span class='avatar'> <img src='"+post.image_url+"'></span>";

  posts.insertBefore(postDom, posts.firstChild);
}
