'use strict'
let gElCanvas
let gCtx
let gTextBoundingBoxes = []
let isDragging = false
let dragOffset = { x: 0, y: 0 }

function onRenderMeme(img = gCurrentImg) {
  if (!img) {
    console.error('Image is not loaded.')
    return
  }

  initializeCanvas(img)

  const meme = getMeme()
  gTextBoundingBoxes = []

  meme.lines.forEach((line, idx) => {
    renderText(line)
    const boundingBox = calculateBoundingBox(line, idx)
    gTextBoundingBoxes[idx] = boundingBox
    drawBoundingBox(boundingBox, idx === meme.selectedLineIdx)
  })
}

function addMouseListeners() {
  gElCanvas.addEventListener('mousedown', onDown)
  gElCanvas.addEventListener('mousemove', onMove)
  gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
  gElCanvas.addEventListener('touchstart', onDown)
  gElCanvas.addEventListener('touchmove', onMove)
  gElCanvas.addEventListener('touchend', onUp)
}
function initializeCanvas(img) {
  gElCanvas = document.querySelector('canvas')
  gCtx = gElCanvas.getContext('2d')

  gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
  gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}
function renderText(line) {
  const textWidth = gCtx.measureText(line.txt).width
  gCtx.textAlign = line.textAlign || 'left'
  gCtx.font = `${line.size}px ${line.font}`
  gCtx.strokeStyle = 'black'
  gCtx.fillStyle = line.color
  gCtx.strokeText(line.txt, line.x, line.y)
  gCtx.fillText(line.txt, line.x, line.y)
}

function drawBoundingBox(boundingBox, isSelected) {
  if (isSelected) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.strokeRect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height)

    gCtx.fillStyle = isSelected ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0)'
    gCtx.fillRect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height)
  }
}

function onTextInput(input) {
  setLineTxt(input.value)
  onRenderMeme()
}

function onChangeFontSize(value) {
  setLineFontSize(value)
  onRenderMeme()
}

function onSetColor(color) {
  setLineColor(color)
  onRenderMeme()
}

function onDeleteLine() {
  deleteLine()
  onRenderMeme()
}
function onChangeFont(font) {
  changeFont(font)
  onRenderMeme()
}
function onChangealignment(value) {
  changealignment(value)
  onRenderMeme()
}
function onChangePlace(value) {
  changePlace(value)
  onRenderMeme()
}
function onAddLine() {
  addLine()

  const meme = getMeme()
  const selectedLine = meme.lines[meme.selectedLineIdx]
  const textInput = document.querySelector('.text-input input')
  textInput.value = selectedLine.txt

  onRenderMeme()
}
function onSwitchLine() {
  const meme = getMeme()
  meme.selectedLineIdx = (meme.selectedLineIdx + 1) % meme.lines.length

  updateTextInput(meme.selectedLineIdx)
  onRenderMeme()
}

function onCanvasClick(ev) {
  const pos = getEvPos(ev)
  const clickedLineIdx = detectClickedLine(pos, gTextBoundingBoxes)

  if (clickedLineIdx !== -1) {
    console.log(`Clicked on line index: ${clickedLineIdx}`)
    console.log('pos', pos)
    selectLine(clickedLineIdx)
    updateTextInput(clickedLineIdx)
  } else {
    console.log('Clicked on empty space')
    console.log('pos', pos)
  }
}

function updateCanvasSize() {
  if (!gElCanvas || !gCurrentImg) return

  const imgRatio = gCurrentImg.naturalHeight / gCurrentImg.naturalWidth
  gElCanvas.width = gElCanvas.clientWidth
  gElCanvas.height = gElCanvas.width * imgRatio

  onRenderMeme()
}

function onUploadImg(ev) {
  ev.preventDefault()
  const canvasData = gElCanvas.toDataURL('image/jpeg')

  // After a succesful upload, allow the user to share on Facebook
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    console.log('encodedUploadedImgUrl:', encodedUploadedImgUrl)
    document.querySelector('.share-container').innerHTML = `
          <a href="${uploadedImgUrl}">Photo</a>
          <button class="btn-facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}')">
             Share on Facebook  
          </button>`
  }
  uploadImg(canvasData, onSuccess)
}
function onDownloadImg(elLink) {
  const dataUrl = gElCanvas.toDataURL()
  elLink.href = dataUrl
  elLink.download = 'my-meme'
}

function onDown(ev) {
  ev.preventDefault()
  const pos = getEvPos(ev)
  const clickedLineIdx = detectClickedLine(pos, gTextBoundingBoxes)

  if (clickedLineIdx !== -1) {
    isDragging = true
    selectLine(clickedLineIdx)
    const selectedLine = gMeme.lines[clickedLineIdx]
    dragOffset = { x: pos.x - selectedLine.x, y: pos.y - selectedLine.y }
    updateTextInput(clickedLineIdx)
  }
}

function onMove(ev) {
  if (!isDragging) return
  ev.preventDefault()

  const pos = getEvPos(ev)
  const selectedLine = gMeme.lines[gMeme.selectedLineIdx]

  selectedLine.x = pos.x - dragOffset.x
  selectedLine.y = pos.y - dragOffset.y

  onRenderMeme()
}

function onUp(ev) {
  isDragging = false
}
