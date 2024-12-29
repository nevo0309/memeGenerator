'use strict'

let gImgs = []
let gText = ["When you're late, but the coffee's worth it.", "I can't adult today. Please don't make me.", "That moment when you realize... it's Monday.", "Me: I'll just have one slice. Also me: *eats the whole pizza*", 'Why fall in love when you can fall asleep instead?', "My brain at 3 AM: Let's overthink everything."]

_createImgs()

function _createImgs() {
  gImgs = [
    _createImg('imgs/1.jpg', ['funny', 'person', 'sad']),
    _createImg('imgs/2.jpg', ['cute', 'pets']),
    _createImg('imgs/3.jpg', ['cute', 'chill']),
    _createImg('imgs/4.jpg', ['cute', 'pets']),
    _createImg('imgs/5.jpg', ['funny', 'sad']),
    _createImg('imgs/6.jpg', ['funny', 'sarcstic']),
    _createImg('imgs/7.jpg', ['funny', 'kids']),
    _createImg('imgs/8.jpg', ['funny']),
    _createImg('imgs/9.jpg', ['funny', 'kids']),
    _createImg('imgs/10.jpg', ['funny', 'person']),
    _createImg('imgs/11.jpg', ['funny', 'person']),
    _createImg('imgs/12.jpg', ['funny']),
    _createImg('imgs/13.jpg', ['happy']),
    _createImg('imgs/14.jpg', ['funny']),
    _createImg('imgs/15.jpg', ['funny']),
    _createImg('imgs/16.jpg', ['funny']),
    _createImg('imgs/17.jpg', ['funny']),
    _createImg('imgs/18.jpg', ['funny']),
    _createImg('imgs/19.jpg', ['funny']),
    _createImg('imgs/20.jpg', ['happy']),
    _createImg('imgs/21.jpg', ['happy']),
    _createImg('imgs/23.jpg', ['kids', 'happy']),
  ]
}

function _createImg(imgUrl, keywords) {
  return {
    id: makeId(),
    imgUrl,
    keywords,
  }
}
function findImg(imgId) {
  return gImgs.find((img) => img.id === imgId)
}

function getImgs() {
  return gImgs
}

function calcKeywordCount() {
  const keywordCounts = {}

  // Count keyword occurrences
  gImgs.forEach((img) => {
    img.keywords.forEach((keyword) => {
      if (!keywordCounts[keyword]) {
        keywordCounts[keyword] = 0
      }
      keywordCounts[keyword]++
    })
  })

  return keywordCounts
}
