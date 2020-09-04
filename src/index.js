document.addEventListener('DOMContentLoaded', () => {

    const userFetchAdapter = new FetchAdapter("http://localhost:3000/")


    //Fetch all users
    const action = users => users.forEach(console.log)
    userFetchAdapter.get("users", action)
    
})