'use strict'

let gCurrentImg = null

function onInit() {
  makeInvisible()
  renderGallery()

  document.querySelector('canvas').addEventListener('click', onCanvasClick)
  window.addEventListener('resize', updateCanvasSize)
}

function renderGallery() {
  const imgs = gImgs
  const elGallery = document.querySelector('.gallery')
  const strHtmls = imgs.map(
    (img) => `
        <img onclick="onImgSelect(event, '${img.id}')" src="${img.imgUrl}" alt="${img.keywords}">
      `
  )
  elGallery.innerHTML = strHtmls.join('')
}

function makeInvisible() {
  document.querySelector('.main-generator').classList.add('hidden')
  document.querySelector('.main-saved').classList.add('hidden')
  document.querySelector('.meme-editor').classList.add('hidden')
}

function onOpenGallery() {
  document.querySelector('.main-generator').classList.add('hidden')
  document.querySelector('.main-saved').classList.add('hidden')
  document.querySelector('.meme-editor').classList.add('hidden')

  document.querySelector('.main-gallery').classList.remove('hidden')
  document.querySelector('.gallery').classList.remove('hidden')
  document.querySelector('.filtering').classList.remove('hidden')

  renderGallery()
}
function onOpenGenerator() {} //dont forget

function onImgSelect(ev, imgId) {
  document.querySelector('.gallery').classList.add('hidden')
  document.querySelector('.meme-editor').classList.remove('hidden')
  document.querySelector('.filtering').classList.add('hidden')
  document.querySelector('.text-input input').value = ''

  console.log('imgId', imgId)
  const currImg = findImg(imgId)
  const img = new Image()
  img.src = currImg.imgUrl
  img.onload = () => {
    gCurrentImg = img
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addMouseListeners()
    addTouchListeners()
    createMeme(imgId)
    onRenderMeme(img)
  }

  console.log('img', currImg)
}
function onRandomMeme() {
  let randIdx = getRandomIntInclusive(0, gImgs.length)
  let randImgId = gImgs[randIdx].id

  let randTextIdx = getRandomIntInclusive(0, gText.length - 1)
  let randText = gText[randTextIdx]

  onImgSelect(0, randImgId)

  setTimeout(() => {
    onRandomText()
  }, 100)
}

function onRandomText() {
  let randTextIdx = getRandomIntInclusive(0, gText.length - 1)
  let randText = gText[randTextIdx]

  setTimeout(() => {
    addLine(randText)
    const textInput = document.querySelector('.text-input input')
    const meme = getMeme()
    const selectedLine = meme.lines[meme.selectedLineIdx]
    textInput.value = selectedLine.txt

    onRenderMeme()
  }, 100)
}
function toggleMenu() {
  const nav = document.querySelector('.main-nav')
  const overlay = document.querySelector('.screen-overlay')

  const isOpen = nav.classList.contains('menu-open')
  if (isOpen) {
    nav.classList.remove('menu-open')
    overlay.classList.remove('active')
  } else {
    nav.classList.add('menu-open')
    overlay.classList.add('active')
  }
}

function closeMenu() {
  const nav = document.querySelector('.main-nav')
  const overlay = document.querySelector('.screen-overlay')

  nav.classList.remove('menu-open')
  overlay.classList.remove('active')
}
