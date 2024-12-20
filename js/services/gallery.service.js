'use strict'

let gImgs = []
_createImgs()

function _createImgs() {
  gImgs = [
    _createImg('imgs/1.jpg', ['funny', 'person']),
    _createImg('imgs/2.jpg', ['cute', 'pets']),
    _createImg('imgs/3.jpg', ['cute', 'chill']),
    _createImg('imgs/4.jpg', ['cute', 'pets']),
    _createImg('imgs/5.jpg', ['funny', 'kid']),
    _createImg('imgs/6.jpg', ['funny', 'sarcstic']),
    _createImg('imgs/7.jpg', ['funny', 'kids']),
    _createImg('imgs/8.jpg', ['funny']),
    _createImg('imgs/9.jpg', ['funny', 'kids']),
    _createImg('imgs/10.jpg', ['funny', 'person']),
    _createImg('imgs/11.jpg', ['bros before hoes']),
    _createImg('imgs/12.jpg', ['funny']),
    _createImg('imgs/13.jpg', ['funny']),
    _createImg('imgs/14.jpg', ['funny']),
    _createImg('imgs/15.jpg', ['funny']),
  ]
}

function _createImg(imgUrl, keywords) {
  return {
    id: makeId(),
    imgUrl,
    keywords,
  }
}
