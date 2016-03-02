export default function (params) {
  // get the current date & format
  const Today = new Date();
  let dd = Today.getDate();
  let mm = Today.getMonth() + 1; // January is 0!
  let today;

  const yyyy = Today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  if (params === 'mm/dd/yyyy') {
    today = `${mm}/${dd}/${yyyy}`;
  } else if (params === 'yyyy-mm-dd') {
    today = `${yyyy}-${mm}-${dd}`;
  }
  return today;
}
