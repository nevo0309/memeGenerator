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

function selectLine(idx) {
  const meme = getMeme()
  meme.selectedLineIdx = idx
  onRenderMeme()
}
function updateTextInput(lineIdx) {
  const meme = getMeme()
  const selectedLine = meme.lines[lineIdx]
  const textInput = document.querySelector('.text-input input')
  textInput.value = selectedLine.txt // Update the text input to match the selected line
}

function detectClickedLine(pos, boundingBoxes) {
  return boundingBoxes.findIndex(
    (box) =>
      pos.x >= box.x && // The click is to the right of or on the left  of the box
      pos.x <= box.x + box.width && // The click is to the left of or on the right  of the box
      pos.y >= box.y && // The click is below or on the top of the box
      pos.y <= box.y + box.height // The click is above or on the bottom of the box
  )
}

function findImg(imgId) {
  return gImgs.find((img) => img.id === imgId)
}
