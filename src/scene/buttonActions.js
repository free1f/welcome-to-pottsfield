import { state } from './main.js'

const enterButton = document.getElementById('enter-button')
const leaveButton = document.getElementById('leave-button')
const areYouSureModal = document.getElementById('are-you-sure-modal')
const leaveText = document.getElementById('leave-text')
const fade = document.getElementById('fade')

enterButton.addEventListener('click', () =>
{
  enterButton.classList.add('hidden')
  fade.classList.add('active')

  setTimeout(() =>
  {
    state.currentScene = 'main'
    fade.classList.remove('active')
    leaveButton.classList.remove('hidden')
    leaveButton.style.visibility = 'visible'
  }, 1000)
})

leaveButton.addEventListener('click', () =>
{
  areYouSureModal.classList.remove('hidden')
  areYouSureModal.style.visibility = 'visible'
  leaveButton.classList.add('hidden')
})

areYouSureModal.addEventListener('click', () =>
{
  fade.classList.add('active')
  leaveText.style.visibility = 'visible'
  areYouSureModal.classList.add('hidden')
  leaveButton.classList.add('hidden')
  leaveButton.style.visibility = 'hidden'
  setTimeout(() =>
    {
      fade.classList.remove('active')
      leaveText.style.visibility = 'hidden'
      enterButton.classList.remove('hidden')
      state.currentScene = 'intro'
    }, 4000)
})