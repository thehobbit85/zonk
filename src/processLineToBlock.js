module.exports = function(text,lineLength,endLinePrecent) {

  var lineLength = lineLength || 80;
  var endLinePrecent = endLinePrecent || 90;
  var singleCharPrecent = (1 / lineLength) * 100;

  var newText = [];
  var tempText = "";
  var tempPrecent = 0;

  for (var i = 0; i < text.length; i++) {
    
    var letter = text[i];
    
    if (letter !== " " && tempPrecent === (100 - (2 * singleCharPrecent)) ) {
      if (letter !== ":" && letter !== ")" && letter !== "(" && letter !== "-" && letter !==".") {
        // console.log("If last letter in line needs - ");
        tempText = tempText + letter + "-";
        tempPrecent = 100;
      }
      else {
        // console.log("If last letter in line dosn't needs - beacuase it's a special char ");
        tempText = tempText + letter;
        tempPrecent = tempPrecent + singleCharPrecent;
      }
    }
    else if (letter !== " " || tempPrecent !== 0) {
      // console.log('Normal letter');
      tempText = tempText + letter;
      tempPrecent = tempPrecent + singleCharPrecent;
    }
    else {
      // console.log('First letter is space');
      tempPrecent = tempPrecent + singleCharPrecent;
    }

    if (tempPrecent === 100 || letter === '.') {
      // console.log("End of line or dot has been reached");
      newText.push(tempText);
      tempText = "";
      tempPrecent = 0;
    }
    else if (tempPrecent >= endLinePrecent) {
      if (letter === ' ') {
        // console.log("End of line for reching endLinePrecent and letter is space");
        newText.push(tempText);
        tempText = "";
        tempPrecent = 0;
      }
    }
  }
  if (tempText) newText.push(tempText);

  return newText.join("\n");
}
