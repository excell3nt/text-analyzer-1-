// BUSINESS LOGIC


function wordCounter(text) {
  if (text.trim().length === 0) {
    return 0;
  }
  let wordCount = 0;
  const wordArray = text.split(" ");
  wordArray.forEach(function (element) {
    if (!Number(element.trim())) {
      wordCount++;
    }
  });
  return wordCount;
}


function numberOfOccurrencesInText(word, text) {
  if ((text.trim().length === 0) || (word.trim().length === 0)) {
    return "You need to enter both a word and a text passage!";
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function (element) {
    if ((word === punctuationRemover(element)) || (element.toLowerCase() === word.toLowerCase())) {
      wordCount++;
    }
  });
  return "There are " + wordCount + " total match(es)!";
}

let offensiveWords = ["zoinks", "muppeteer", "biffaroni", "loopdaloop"]
function offensiveWordFilter(offensiveWords, text) {
  const array = text.split(" ");
  let emptyArray = [];
  array.forEach(function (element) {
    if (offensiveWords.includes(punctuationRemover(element))) {
      emptyArray.push("<b>****</b>")
    } else {
      emptyArray.push(element)
    }
  });
  return emptyArray.join(" ");
}

function punctuationRemover(word) {
  let punctuations = [".", ",", "-", "?", "!", "'", ":", ";"]
  punctuations.forEach(function (element) {
    word = word.replace(element, "")
  })
  return word;
}

function boldPassage(word, text) {
  text = offensiveWordFilter(offensiveWords, text);
  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function (element) {
    if ((word === punctuationRemover(element)) || (element.toLowerCase() === word.toLowerCase())) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else {
      htmlString = htmlString.concat(element);
    }
    htmlString = htmlString.concat(" ");
  });
  return htmlString + "</p>";
}

function top3(sentence){
  let top = []
  let topThree = ""
  let myTop = sentence.split(" ")
  let myNewTop = [...new Set(myTop)]
  myNewTop.forEach(function(element){
    let elementFreeOfPunctuation = punctuationRemover(element)
    let counter = numberOfOccurrencesInText(elementFreeOfPunctuation, sentence)
    let wordCountArray = [];
    wordCountArray.push(elementFreeOfPunctuation);
    wordCountArray.push(counter);
    top.push(wordCountArray)
  });
  top.sort(function(a,b){
    return b[1] - a[1]  
  });
  for( let i =0; i<top.length; i++){
    if (i <= 2){
      topThree = topThree.concat("<li>", top[i][0] + ":" + top[i][1], "</li>") 
    }
  }
  return topThree
}



// UI LOGIC
$(document).ready(function () {
  $("form#word-counter").submit(function (event) {
    event.preventDefault();
    const passage = $("#text-passage").val();
    const word = $("#word").val();
    const wordCount = wordCounter(passage);
    const occurrencesOfWord = numberOfOccurrencesInText(word, passage);
    const boldedPassage = boldPassage(word, passage)
    const top3Common = top3(passage)
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldedPassage)
    $("#top-three").html(top3Common)
  });
});
