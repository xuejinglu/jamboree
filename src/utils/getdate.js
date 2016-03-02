export default function () {
  // get the current date & format
  const Today = new Date();
  let dd = Today.getDate();
  let mm = Today.getMonth() + 1; // January is 0!

  const yyyy = Today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  const today = `${yyyy}-${mm}-${dd}`;
  return today;
}
