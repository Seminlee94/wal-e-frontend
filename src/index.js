document.addEventListener('DOMContentLoaded', () => {
    const navBar = document.querySelector(".navbar")
    const navLeft = document.querySelector("#nav-left")
    const navCart = document.querySelector(".nav-cart")
    const navWishlist = document.querySelector(".nav-wishlist")
    const containers = document.querySelector("#containers")
    const cartContainer = document.querySelector(".cart-container")
    const ddAisle = document.querySelector(".dropdown-aisle")
    const mainContainers = document.querySelector("#main-containers")
    const sideNav = document.querySelector(".item-side-nav")
    const blank = document.querySelector(".blank")
    const cartBtn = document.querySelector(".cart-btn")
    const cartItems = document.querySelectorAll(".cart-item")
    const cartList = document.querySelector(".cart-middle-left")
    const wishContainer = document.querySelector(".wishlist-container")
    const compareBtn = document. querySelector(".compare-btn")
    const compareContainer = document.querySelector(".compare-container")
    const compareX = document.querySelectorAll(".cart-btn")[1]
    const goCartBtn = document.querySelector(".go-cart-btn")

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
    document.addEventListener("click", (e) => {
        if (e.target === cartBtn) {
            cartContainer.style.display = "none"
            navBar.style.opacity = 1
            blank.style.opacity = 1
            sideNav.style.opacity = 1
            containers.style.opacity = 1
            document.body.style.overflow = "scroll"
        } else if (e.target === compareX) {
            compareContainer.style.display = "none"
            navBar.style.opacity = 1
            blank.style.opacity = 1
            sideNav.style.opacity = 1
            containers.style.opacity = 1
            document.body.style.overflow = "scroll"
        } else if (e.target === navWishlist) {
            compareContainer.style.display = "block"
            navBar.style.opacity = 0.3
            blank.style.opacity = 0.3
            sideNav.style.opacity = 0.3
            containers.style.opacity = 0.3
            document.body.style.overflow = "hidden"
        } else if (e.target === goCartBtn) {
            compareContainer.style.display = "none"
            cartContainer.style.display = "block"
        }
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
        // const copyDraggable = Object.assign({}, draggable)
        // cartList.appendChild(copyDraggable)
        draggable.style.borderBottom = "dotted"
        cartList.appendChild(draggable)
    })
  
    wishContainer.addEventListener("dragover", () => {
        const draggable = document.querySelector(".dragging")
        draggable.style.borderBottom = "none"
        // draggable.style.border-bottom-style = "none"
        wishContainer.append(draggable)
    })


    //compare click button
    compareBtn.addEventListener("click", (e) => {
        if (e.target.previousElementSibling.childElementCount <= 1) {
            alert("You need to choose two or more items to compare!")
        } else {
            cartContainer.style.display = "none"
            compareContainer.style.display = "block"
            navBar.style.opacity = 0.3
            blank.style.opacity = 0.3
            sideNav.style.opacity = 0.3
            containers.style.opacity = 0.3
            document.body.style.overflow = "hidden"
        }
    })


})

