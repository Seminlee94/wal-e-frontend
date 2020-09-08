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
    const wishlistMiddle = document.querySelector(".wishlist-middle")
    // const wishlistItem = document.querySelector(".wishlist-middle-item")

    const itemFetchAdapter = new FetchAdapter("http://localhost:3000/")


    // Fetch all users
    const action = items => items.forEach(item => renderItem(item))
    // itemFetchAdapter.get("items", action)

 
    // debugger
    const renderItem = item => {
        const itemDiv = document.createElement("div")
        itemDiv.className = "api-item"
        itemDiv.id = item.sub_category
        
        const apiItemName = document.createElement("div")
        apiItemName.className = "api-item-name"
        apiItemName.innerHTML = `${item.name}`
        itemDiv.append(apiItemName)

        containers.append(itemDiv)
        // debugger
    }

    
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
    
    // clickhandler
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

        // category different colors
        switch (blank.innerText){
            case "Bakery":
                blank.style.backgroundColor = "BurlyWood";
                blank.style.height = "50px";
                break;
            case "Produce":
                blank.style.backgroundColor = "LightGreen";
                blank.style.height = "50px";
                break;
            case "Cheese":
                blank.style.backgroundColor = "GoldenRod";
                blank.style.height = "50px";
                break;
            case "Prepared Foods":
                blank.style.backgroundColor = "LightSlateGrey";
                blank.style.height = "50px";
            break;
            case "Meat":
                blank.style.backgroundColor = "FireBrick";
                blank.style.height = "50px";
            break;
            case "Seafood":
                blank.style.backgroundColor = "DodgerBlue";
                blank.style.height = "50px";
            break;
            case "Wine, Beer & Spirits":
                blank.style.backgroundColor = "Crimson";
                blank.style.height = "50px";
            break;
            case "Other Departments":
                blank.style.backgroundColor = "BlueViolet";
                blank.style.height = "50px";
            break;
            case "View All":
                blank.style.backgroundColor = "DimGrey";
                blank.style.height = "50px";
                sideNav.style.display = "none"
                itemFetchAdapter.get("items", action)
            break;
        }

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
        draggable.style.borderBottom = "dotted"
        draggable.style.height="85px"
        cartList.appendChild(draggable)
    })
  
    wishContainer.addEventListener("dragover", () => {
        const draggable = document.querySelector(".dragging")
        draggable.style.borderBottom = "none"
        draggable.style.height="30px"
        wishContainer.append(draggable)
    })


    //compare click button
    compareBtn.addEventListener("click", (e) => {
        if (e.target.previousElementSibling.childElementCount <= 1) {
            alert("You need to choose two or more items to compare!")
        } else {
            wishContainer.childNodes.forEach(item => {
                //create div for each item
                const itemDiv = document.createElement("div")
                itemDiv.className = "wishlist-middle-item"
                wishlistMiddle.append(itemDiv)
                
                //create item title
                const itemTitle = document.createElement("div")
                itemTitle.className = "wishlist-item-title"
                itemDiv.append(itemTitle)
                itemTitle.innerHTML = `${item.innerHTML}`

                //create item price
                const itemPrice = document.createElement("div")
                itemPrice.className = "wishlist-item-price"
                itemPrice.innerText = "Price goes here"
                itemDiv.append(itemPrice)

                //create item nutrition
                const itemNutrition = document.createElement("div")
                itemNutrition.className = "wishlist-item-nutrition"
                itemNutrition.innerHTML = "nutrition goes here"
                itemDiv.append(itemNutrition)

                //create remove button
                const wishlistRemoveBtn = document.createElement("button")
                wishlistRemoveBtn.className = "wishlist-remove-btn"
                wishlistRemoveBtn.innerText = "Remove Item"
                itemDiv.append(wishlistRemoveBtn)
                    //clickhandler => DELETE item from cart 
            })

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

