/*
export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('pt-br')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}
*/

export function formatDate(timestamp) {
    var monthName = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']
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
