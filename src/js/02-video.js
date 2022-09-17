// Ознайомся з документацією бібліотеки Vimeo плеєра. 
// Додай бібліотеку як залежність проекту через npm.
// Ініціалізуй плеєр у файлі скрипта як це описано в секції pre-existing player, але враховуй, що у тебе плеєр доданий як npm пакет, а не через CDN.
// 1.Вивчи документацію методу on() і почни відстежувати подію 'timeupdate' - оновлення часу відтворення.
// 2. Зберігай час відтворення у локальне сховище. Нехай ключем для сховища буде рядок "videoplayer-current-time".
// 3. Під час перезавантаження сторінки скористайся методом setCurrentTime() з метою відновлення відтворення зі збереженої позиції.
// 4. Додай до проекту бібілотеку lodash.throttle і зроби так, щоб час відтворення оновлювався у сховищі не частіше, ніж раз на секунду.
import Player from '@vimeo/player';
// 4. import script name from package.json
import Throttle from 'lodash.throttle';
// Variables
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
// 2. create variable for function videoplayer-current-time (for easy use). according to the task condition
const timekey = 'videoplayer-current-time';
// created a function. by restructuring the seconds were retrieves from the object "time update" (recorded in localStorage).
function durationSavelocalstorage({ seconds }) {
  localStorage.setItem(timekey, seconds);
}
// the palayer restarted when the page was loaded
window.addEventListener('load', newStart);
// 1, 4. started the 'on' method and added a delay
player.on('timeupdate', Throttle(durationSavelocalstorage, 1000));
function newStart() {
  if (!localStorage.getItem(timekey)) {
    return;
  }
  const currentVideoTime = localStorage.getItem(timekey);
  //3. set 0 for zero listening
  player.setCurrentTime(currentVideoTime ?? 0);
}