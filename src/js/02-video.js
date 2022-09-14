import Player from '@vimeo/player';
// import script name from package.json
import Throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
// create const for function videoplayer-current-time (for easy use)
const timekey = 'videoplayer-current-time';
player.on('timeupdate', durationSavelocalstorage);
// create function, by restructuring got seconds from the object timeupdate (recorded to the localStorage)
function durationSavelocalstorage({ seconds }) {
  localStorage.setItem(timekey, seconds);
}
// the palayer restarted when the page was loaded
window.addEventListener('load', newStart);
player.on('timeupdate', Throttle(durationSavelocalstorage, 1000));
function newStart() {
  if (!localStorage.getItem(timekey)) {
    return;
  }
  const currentVideoTime = localStorage.getItem(timekey);
  player.setCurrentTime(currentVideoTime ?? 0);
}