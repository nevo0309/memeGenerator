'use strict'

let gMeme
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

function addLine(txt = 'Enter your text', isSticker = false) {
  const canvasWidth = gElCanvas.width
  const canvasHeight = gElCanvas.height

  let newXLocation = getRandomIntInclusive(0, canvasWidth - 400)
  let newYLocation = getRandomIntInclusive(20, canvasHeight - 20)

  const newLine = {
    txt,
    size: isSticker ? 40 : 20,
    color: isSticker ? 'transparent' : 'white',
    x: newXLocation,
    y: newYLocation,
    isSticker,
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

function changeFont(font) {
  const line = gMeme.lines[gMeme.selectedLineIdx]
  line.font = font
}
function changealignment(direction) {
  const line = gMeme.lines[gMeme.selectedLineIdx]
  line.textAlign = direction
}
function changePlace(value) {
  const line = gMeme.lines[gMeme.selectedLineIdx]
  line.y += value
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

function calculateBoundingBox(line, idx) {
  const padding = 5
  const textWidth = gCtx.measureText(line.txt).width
  const textHeight = line.size

  let adjustedX = line.x
  if (line.textAlign === 'center') {
    adjustedX -= textWidth / 2
  } else if (line.textAlign === 'right') {
    adjustedX -= textWidth
  }

  return {
    x: adjustedX - padding,
    y: line.y - textHeight - padding,
    width: textWidth + padding * 2,
    height: textHeight + padding * 2,
    idx,
  }
}

function scrollCarousel(direction) {
  const carousel = document.querySelector('.carousel-items')
  const itemWidth = document.querySelector('.carousel-item').offsetWidth + 20
  const currentTransform = getComputedStyle(carousel).transform

  let currentX = 0
  if (currentTransform !== 'none') {
    currentX = parseFloat(currentTransform.split(',')[4])
  }

  const newX = currentX + direction * itemWidth
  const maxScroll = -(carousel.scrollWidth - carousel.parentElement.offsetWidth)

  if (newX <= 0 && newX >= maxScroll) {
    carousel.style.transform = `translateX(${newX}px)`
  }
}
