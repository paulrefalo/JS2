function Play(name, author, yearWritten, mainCharacters, oneAct) {
  this.name = name;
  this.author = author;
  this.yearWritten = yearWritten;
  this.mainCharacters = mainCharacters;
  this.oneAct = oneAct;
}
 
window.onload = init;

function init() {
  var macbeth = new Play("Macbeth", "Shakespeare", 1606, 
  		["Macbeth", "Lady Macbeth", "Duncan", "Malcolm", "Donalbain", "Banquo", "Macduff"], false);
  var macbethJSON = JSON.stringify(macbeth);
  console.log(macbethJSON);
  
  var altMacbeth = JSON.parse(macbethJSON);
  console.log(altMacbeth);
}