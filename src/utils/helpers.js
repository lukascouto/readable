export function formatDate(timestamp) {
    var monthName = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
    var data = new Date(timestamp);
    var day = data.getDate();
    var month = data.getMonth();
    month = monthName[month];
    var year = data.getFullYear();
    return [day, month, year].join(' ');
}


export function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}
