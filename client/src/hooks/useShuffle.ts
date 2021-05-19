export default function shuffle(arr: any[]) {
  var j, x, i;
  for (i = arr.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = arr[i - 1];
    arr[i - 1] = arr[j];
    arr[j] = x;
  }
}
