'use strict'

let gMeme = {
  selectedImgId: null,
  selectedLineIdx: 0,
  lines: [],
}

function getMeme() {
  return gMeme
}

function setLineTxt(txt) {
  const line = gMeme.lines[gMeme.selectedLineIdx]
  if (!line) return
  line.txt = txt
}

function createMeme(selectedImgId) {
  gMeme = {
    selectedImgId,
    selectedLineIdx: 0,
    lines: [
      {
        txt: 'Your Text Here',
        size: 20,
        color: 'red',
        x: 50,
        y: 50,
      },
    ],
  }
}

function findImg(imgId) {
  return gImgs.find((img) => img.id === imgId)
}
