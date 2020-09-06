document.addEventListener('DOMContentLoaded', () => {
    const navBar = document.querySelector(".navbar")
    const navLeft = document.querySelector("#nav-left")
    const navCart = document.querySelector(".nav-cart")
    const containers = document.querySelector("#containers")
    const cartContainer = document.querySelector(".cart-container")
    const ddAisle = document.querySelector(".dropdown-aisle")
    const mainContainers = document.querySelector("#main-containers")
    const sideNav = document.querySelector(".item-side-nav")
    const blank = document.querySelector(".blank")
    const cartBtn = document.querySelector(".cart-btn")
    const cartItems = document.querySelectorAll(".cart-item")
    const cartList = document.querySelector(".cart-middle-left")
    const dragDiv = document.querySelector(".div1")
    const cartIcon = document.querySelector(".cart-icon")

    // const userFetchAdapter = new FetchAdapter("http://localhost:3000/")


    //Fetch all users
    // const action = users => users.forEach(console.log)
    // userFetchAdapter.get("users", action)

    // cart icon notif
    // cartIcon.innerText = `
    //     "1"
    // `
    // debugger

    
    // Flatiron click => page reload
    navLeft.addEventListener("click", (e) => {
        location.reload()
    })
    
    // hide & seek with the cart
    navCart.addEventListener("click", () => {
        cartContainer.style.display = "block"
        navBar.style.opacity = 0.3
        blank.style.opacity = 0.3
        sideNav.style.opacity = 0.3
        containers.style.opacity = 0.3
        document.body.style.overflow = "hidden"
    })
    
    // Cart X button
    cartBtn.addEventListener("click", (e) => {
        cartContainer.style.display = "none"
        navBar.style.opacity = 1
        blank.style.opacity = 1
        sideNav.style.opacity = 1
        containers.style.opacity = 1
        document.body.style.overflow = "scroll"
    })

    // click the items in dropdown list to fetch the category api

    ddAisle.addEventListener("click", (e) => {
        let categoryId = e.target.dataset.num
        let itemCategory = e.target.innerText 

        blank.innerText = itemCategory
        blank.style.backgroundColor = "DimGrey";
        blank.style.height = "50px";
        // debugger

        //dataset.num ( category ID )
        const newDiv = document.createElement("div")
        newDiv.dataset.num = categoryId
        newDiv.classList.add("item-categories")
        mainContainers.innerHTML = `
        <h1>${itemCategory}</h1>
        `
        
        //Side Navigation Bar
        sideNav.style.display = "block"       
        sideNav.innerHTML = `
        ${itemCategory}
        `
        sideNav.dataset.num = categoryId
        
        //
    })


    //drag and drop functions
    cartItems.forEach(cartItem => {
        cartItem.addEventListener("dragstart", () => {
            cartItem.classList.add("dragging")
        })
        cartItem.addEventListener("dragend", () => {
            cartItem.classList.remove("dragging")
        })
    })

    cartList.addEventListener("dragover", () => {
        const draggable = document.querySelector(".dragging")
        cartList.appendChild(draggable)
        // dragDiv.appendChild(draggable)
    })
  
    dragDiv.addEventListener("dragover", () => {
        const draggable = document.querySelector(".dragging")
        dragDiv.appendChild(draggable)
    })


    // function allowDrop(ev) {
    //     ev.preventDefault();
    // }
      
    // function drag(ev) {
    //     console.log(ev.target)
    //     ev.dataTransfer.setData("text", ev.target.id);
    // }
      
    // function drop(ev) {
    //     ev.preventDefault();
    //     let data = ev.dataTransfer.getData("text");
    //     ev.target.appendChild(document.getElementById(data));
    // }


})

