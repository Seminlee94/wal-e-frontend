document.addEventListener('DOMContentLoaded', () => {
    const navCart = document.querySelector(".nav-cart")
    const cartContainer = document.querySelector(".cart-container")
    const mainContainers = document.querySelector("#main-containers")
    const ddAisle = document.querySelector(".dropdown-aisle")

    // const userFetchAdapter = new FetchAdapter("http://localhost:3000/")


    //Fetch all users
    // const action = users => users.forEach(console.log)
    // userFetchAdapter.get("users", action)


    // hide & seek with the cart
    navCart.addEventListener("click", () => {
        if (cartContainer.style.display === "block") {
            cartContainer.style.display = "none"
        } else if (cartContainer.style.display === "none") { 
          cartContainer.style.display = "block"
        }
    });

    ddAisle.addEventListener("click", (e) => {
        itemCategory = e.target.innerText 
        mainContainers.innerHTML = `
            <h1>${itemCategory}</h1>
        `
    })


})

