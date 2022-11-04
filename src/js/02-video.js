import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

onPageUpdate();

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(evt) {
  //   console.log(evt.seconds);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(evt.seconds));
}

function onPageUpdate(evt) {
  const savedTime = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  //   console.log(savedTime);
  player
    .setCurrentTime(savedTime)
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
