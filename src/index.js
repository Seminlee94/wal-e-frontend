document.addEventListener('DOMContentLoaded', () => {
    const navCart = document.querySelector(".nav-cart")
    const cartContainer = document.querySelector(".cart-container")
    const ddAisle = document.querySelector(".dropdown-aisle")
    const mainContainers = document.querySelector("#main-containers")
    const sideNav = document.querySelector(".item-side-nav")


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


    // click the items in dropdown list to fetch the category api

    ddAisle.addEventListener("click", (e) => {
        itemCategory = e.target.innerText 
        //dataset.num ( category ID )
        let categoryId = e.target.dataset.num
        const newDiv = document.createElement("div")
        newDiv.dataset.num = categoryId
        newDiv.classList.add("item-categories")
        mainContainers.innerHTML = `
            <h1>${itemCategory}</h1>
        `
        
        sideNav.style.display = "block"
        sideNav.innerHTML = `
            ${itemCategory}
        `
        sideNav.dataset.num = categoryId
        // debugger
    })


})

