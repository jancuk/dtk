var posts,
    newsfeed,
    newsfeed_storage;

document.addEventListener('DOMContentLoaded', function() {
  NProgress.start();
  initStart();
});

var initStart = function(){
  posts = document.querySelector(".posts");
  newsfeed_storage = statusHtmlStorage('newsfeed');
  if (newsfeed_storage == 0) {
    $.getJSON("http://detikcom.herokuapp.com/newsfeeds", function(posts) {
      if (posts.success) {
        newsfeed = posts.data.nonheadline;
        setHtmlStorage('newsfeed', JSON.stringify(newsfeed), 300);
        for (var i = 0;i < newsfeed.length;i++){
          addNewsFeed(newsfeed[i]);
          if (i == 15){
            setTimeout(function(){ NProgress.done()}, 2000)
          }
        }
      }
    });

  } else {
    newsfeed = JSON.parse(localStorage.getItem('newsfeed'));
    for (var i = 0;i < newsfeed.length;i++){
      addNewsFeed(newsfeed[i]);
      if (i == 15){
        setTimeout(function(){ NProgress.done()}, 2000)
      }
    }
  }
}

var addNewsFeed = function(post) {
  var postDom = document.createElement("div");
  postDom.classList.add("post");

  postDom.innerHTML += "<h2><a href='"+post.article_url+"' target='_blank'>"+post.title+"</h2>";
  postDom.innerHTML += "<p>" + post.resume + "</p>";
  postDom.innerHTML += "<span class='avatar'> <img src='"+post.image+"?w=150'></span>";

  posts.insertBefore(postDom, posts.firstChild);
}

function removeStorage(name) {
  localStorage.removeItem(name);
  localStorage.removeItem(name+'_time');
}

function setHtmlStorage(name, value, expires) {
  if (expires == undefined || expires == 'null') { var expires = 3600; }

  var date = new Date();
  var schedule = Math.round((date.setSeconds(date.getSeconds()+expires))/1000);
  localStorage.setItem(name, value);
  localStorage.setItem(name+'_time', schedule);
}

function statusHtmlStorage(name) {
  var date = new Date();
  var current = Math.round(+date/1000);

  // Get Schedule
  var store_time = localStorage.getItem(name+'_time');
  if (store_time == undefined || store_time == 'null') { var store_time = 0; }
  if (store_time < current) {
    removeStorage(name);
    return 0;
  } else {
    return 1;
  }

}
