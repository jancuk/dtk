var posts;

document.addEventListener('DOMContentLoaded', function() {
  NProgress.start();
  initStart();
});

var initStart = function(){
  posts = document.querySelector(".posts");
  $.getJSON("http://detikcom.herokuapp.com/newsfeeds", function(posts) {
    if (posts.success) {
      var newsfeed = posts.data.nonheadline;
      newsfeed.reverse();
      for (var i = 0;i < newsfeed.length;i++){
        addNewsFeed(newsfeed[i]);
        if (i == 15){
          setTimeout(function(){ NProgress.done()}, 2000)
        }
      }
    }
  });
}

var addNewsFeed = function(post) {
  var postDom = document.createElement("div");
  postDom.classList.add("post");

  postDom.innerHTML += "<h2><a href='"+post.article_url+"' target='_blank'>"+post.title+"</h2>";
  postDom.innerHTML += "<p>" + post.resume + "</p>";
  postDom.innerHTML += "<span class='avatar'> <img src='"+post.image+"?w=150'></span>";

  posts.insertBefore(postDom, posts.firstChild);
}
