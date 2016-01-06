function save_options() {
  var detik = document.getElementById('detik').checked;
  var kompas = document.getElementById('kompas').checked;
  var liputan6 = document.getElementById('liputan6').checked;
  chrome.storage.sync.set({
    favoriteDetik: detik,
    favoriteLiputan6: liputan6,
    favoriteKompas: kompas
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'News saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    favoriteKompas: true,
    favoriteDetik: true,
    favoriteLiputan6: true
  }, function(items) {
    document.getElementById('detik').checked = items.favoriteDetik;
    document.getElementById('kompas').checked = items.favoriteKompas;
    document.getElementById('liputan6').checked = items.favoriteLiputan6;
  });
}

function show_options() {
  $('#options').show();
  $('#hide-options').show();
  $('#show-options').hide();
}

function hide_options() {
  $('#options').hide();
  $('#hide-options').hide();
  $('#show-options').show();
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('hide-options').addEventListener('click', hide_options);
document.getElementById('show-options').addEventListener('click', show_options);
