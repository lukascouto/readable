export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('pt-br')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function formatComment ({ text }) {
  return {
    author: 'junior',
    id: generateUID(),
    text,
    timestamp: Date.now(),
    parentId: '8xf0y6ziyjabvozdd253nd',
  }
}
