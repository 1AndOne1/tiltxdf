const form = document.querySelector("form")

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const formData = new FormData(form);
    const username = formData.get('username')
    const password = formData.get('password')

    try {
        const url = await fetch('http://localhost:3000/registration', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})
        })
        const data = await url.json()
        console.log(data)
    } catch (e) {

    }
})