function f() {
  var a = [];
  var i; 
  for(i = 0; i < 3; ++i) {
    a[i] = function(){
      return i;
    }
  } 
  return a;
}
var a = f();
