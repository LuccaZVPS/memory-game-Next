export default function ConvertTImer(s: number) {
  var min = Math.floor(s / 60);
  var secons = Math.floor(s % 60);
  return `${min}:${secons.toString().padStart(2, "0")}`;
}
