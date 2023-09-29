export function msToTime(duration: number) {
  let seconds: string | number = parseInt(((duration / 1000) % 60).toString());
  let minutes: string | number = parseInt(((duration / (1000 * 60)) % 60).toString());
  let hours: string | number = parseInt(((duration / (1000 * 60 * 60)) % 24).toString());

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return hours + ':' + minutes + ':' + seconds;
}
