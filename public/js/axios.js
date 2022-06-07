window.onload = async () => {
    const addPokemonsToTeamBtn = document.querySelectorAll('.add-pokemon-to-team-btn');
    addPokemonsToTeamBtn.forEach(button => {
        button.addEventListener('click', async (event) => {
            console.log(event.currentTarget.children[0].innerHTML)
            const id = event.currentTarget.children[0].innerHTML
            console.log(id)
            console.log(id)
            await axios.post(`http://localhost:3000/app/own-pokemon-team-edit-remove/${id}`)
            const response = await axios.get('http://localhost:3000/app/own-pokemon-team-edit/json-list')
            response.data.forEach((pokemon) => {

            })
        })
    })

    const removePokemonsFromTeamBtn = document.querySelectorAll('.remove-pokemon-from-team-btn');
    removePokemonsFromTeamBtn.forEach(button => {
        button.addEventListener('click', async (event) => {
            console.log(event.currentTarget.children[0].innerHTML)
            const id = event.currentTarget.children[0].innerHTML
            console.log(id)
            await axios.post(`http://localhost:3000/app/own-pokemon-team-edit-remove/${id}`)
            const response = await axios.get('http://localhost:3000/app/own-pokemon-team-edit/json-list')
            response.data.forEach((pokemon) => {

            })
        })
    })

}