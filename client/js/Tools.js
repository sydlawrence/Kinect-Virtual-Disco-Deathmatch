console.log = console.dir;

log = function(str) {
  $('#log').append(str+"\n");

}