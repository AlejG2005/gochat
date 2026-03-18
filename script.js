const getMessages = async () => {
    const response = await fetch('/api/messages')
    const messages = await Response.json()
    
    const ul = document.getElementById('messages')
    ul.innerHTML = ''

    for(let i = 0; i < message.length; i++){
        const li = document.createElement('li')
        li.innerHTML = ´<strong>${message.user}:</strong> ${message.text}
        ul.append(li)
    }
}

const postMesagge = async (message) => {
    const response = await fetch('/api/messages', {
        method: 'POST',
        body: JSON.stringify(message), 
    })
}

getMessages()

document.getElementById('send').addEventListener('click', () => {
    const message = document.getElementById('message')
    const message = textArea.value
    postMesagge({
        user:'alejandro'
        text:'message'
    })


})