export default function swDev() {
  let swUrl = `${process.env.BASE_URL}/sw.js`;
  navigator.serviceWorker.register(swUrl).then((response) => {
    console.warn('response', response);
  });
}
