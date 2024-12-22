'use strict'

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
    lines: [],
  }
}

function addLine(txt = 'Enter your text') {
  let newXLocation = getRandomIntInclusive(0, 350)
  let newYLocation = getRandomIntInclusive(20, 350)
  const newLine = {
    txt,
    size: 20,
    color: 'white',
    x: newXLocation,
    y: newYLocation,
  }
  gMeme.lines.push(newLine)
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}
function deleteLine() {
  const meme = getMeme()
  const lineIdx = meme.selectedLineIdx

  if (lineIdx < 0 || lineIdx >= meme.lines.length) return
  meme.lines.splice(lineIdx, 1)
  console.log('Updated lines:', meme.lines)
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
