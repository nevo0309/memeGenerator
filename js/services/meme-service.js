'use strict'
let gNewHeight
let gMeme = {
  selectedImgId: null,
  selectedLineIdx: 0,
  lines: [],
}

function getMeme() {
  return gMeme
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

function addLine(txt = 'Enter your text') {
  let newXLocation = getRandomIntInclusive(0, 480)
  let newYLocation = getRandomIntInclusive(0, 480)
  const newLine = {
    txt,
    size: 20,
    color: 'red',
    x: newXLocation,
    y: newYLocation,
  }
  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function setLineTxt(txt) {
  const line = gMeme.lines[gMeme.selectedLineIdx]
  if (!line) return
  line.txt = txt
}

function setLineFontSize(value) {
  const line = gMeme.lines[gMeme.selectedLineIdx]
  if (!line) return
  let newSize = line.size + value
  line.size = newSize
}

function setLineColor(color) {
  const line = gMeme.lines[gMeme.selectedLineIdx]
  if (!line) return
  line.color = color
}

function findImg(imgId) {
  return gImgs.find((img) => img.id === imgId)
}
