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
function onOpenSaved() {} //dont forget

function onImgSelect(ev, imgId) {
  document.querySelector('.gallery').classList.add('hidden')
  document.querySelector('.meme-editor').classList.remove('hidden')
  document.querySelector('.filtering').classList.add('hidden')

  const currImg = findImg(imgId)
  const img = new Image()
  img.src = currImg.imgUrl
  img.onload = () => {
    gCurrentImg = img
    createMeme(imgId)
    onRenderMeme(img)
  }

  console.log('img', currImg)
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
