// BUSINESS LOGIC


function wordCounter(text) {
  if (text.trim().length === 0){
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
//  function numberOfOccurrencesInText(word, text) {
//     if ((text.trim().length === 0) || (word.trim().length === 0)) {
//     return 0;
//   }
//   const wordArray = text.split(" ");
//   let wordCount = 0;
//   wordArray.forEach(function(element) {
    // if (element.toLowerCase().includes(word.toLowerCase())) {
//       wordCount++;
//     }
//   });
//   return wordCount;
// }

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
  let punctuations = [".", ",", "-", "?", "!"]
  punctuations.forEach(function (element) {
    word = word.replace(element, "")
  })
  return word;
}

function numberOfOccurrencesInText(word, text) {
  if ((text.trim().length === 0) || (word.trim().length === 0)) {
    return "You need to enter both a word and a text passage!";
  }
  const wordArray = text.split(" ");
  let wordCount = 0;
  wordArray.forEach(function (element) {
    if (word === punctuationRemover(element)) {
      wordCount++;
    }
  });
  return "There are " + wordCount + " total match(es)!";
}

// function boldPassage(word, text) {
//   return "<p>" + text + "</p>";
// }

// function boldPassage(word, text) {
//   if (word === text) {
//     return "<p><b>" + text + "</b></p>";
//   } else
//   return "<p>" + text + "</p>";
// }

function boldPassage(word, text) {
  text = offensiveWordFilter(offensiveWords, text);
  let htmlString = "<p>";
  let textArray = text.split(" ");
  textArray.forEach(function (element) {
    if (word === punctuationRemover(element)) {
      htmlString = htmlString.concat("<b>" + element + "</b>");
    } else {
      htmlString = htmlString.concat(element);
    }
    htmlString = htmlString.concat(" ");
  });
  return htmlString + "</p>";
}

// function top3(sentences) {
//   let top = []
//   let topThree = "<p>"

// }

function top3(word) {
  let top = []
  let topThree = "<li>"
  word = word.toLowerCase();
  let myTop = word.split(" ");
  let newMyTop = [...new Set(myTop)];
  newMyTop.forEach(function (element) {
    let counter = 0;
    myTop.forEach(function (elements) {
      if (element === elements) {
        counter++
      }
    })
    let wordCountArray = [];
    wordCountArray.push(element);
    wordCountArray.push(counter);
    top.push(wordCountArray);
  });

  top.sort(function (a, b) {
    return b[1] - a[1]
  });

  for (i = 0; i < top.length - 1; i++) {

    if (i > 2) {

      break;
    }
    topThree = topThree.concat(top[i][0] + ":" + top[i][1])
  }
  topThree = topThree + "</li>"
  return topThree;
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
    const top3Common = top3(word)
    $("#total-count").html(wordCount);
    $("#selected-count").html(occurrencesOfWord);
    $("#bolded-passage").html(boldedPassage)
    $("#top-three").html(top3Common)
  });
});
