function Pet(type, name, weight, likes) {
  this.type = type;
  this.name = name;
  this.weight = weight;
  this.likes = likes;
}
 
window.onload = init;

function init() {
  var pickles = new Pet("cat", "Pickles", 7, ["sleeping", "purring", "eating butter"]);
  var picklesJSON = JSON.stringify(pickles);
  console.log(picklesJSON);
  
  var anotherPickles = JSON.parse(picklesJSON);
  console.log(anotherPickles);
  
  var colors = {"springColors":["AF7575","EFD8A1","BCD693","AFD7DB","3D9CA8"],
  "earthColors":["332525","907465","EDC5B5","878C6D","63674A"]}
  
  var colorsJSON = JSON.stringify(colors);
  console.log(colorsJSON);
  
  var altColors = JSON.parse(colorsJSON);
  console.log(altColors);
  
  var colorScheme = JSON.parse('{"springColors":["AF7575","EFD8A1","BCD693","AFD7DB","3D9CA8"], "earthColors":["332525","907465","EDC5B5","878C6D","63674A"]}');
  console.log(colorScheme);
  
  var tilla = new Pet("dog", "Tilla", 25, ["sleeping", "eating", "walking"]);
  
  var petsArray = [ pickles, tilla ];
  var petsArrayJSON = JSON.stringify(petsArray);
}