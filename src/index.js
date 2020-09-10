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
    const cartList = document.querySelector(".cart-middle-left")
    const wishContainer = document.querySelector(".wishlist-container")
    const compareBtn = document. querySelector(".compare-btn")
    const compareContainer = document.querySelector(".compare-container")
    const goCartBtn = document.querySelector(".go-cart-btn")
    const wishlistMiddle = document.querySelector(".wishlist-middle")
    const categoryItems = document.querySelector(".category-items")
    const groceryIndex = document.querySelector(".grocery-index")
    const cartSubtotal = document.querySelector(".cart-subtotal")
    const cartTax = document.querySelector(".cart-tax")
    const estimatedTotal = document.querySelector(".estimated-total")
    const cartPrices = document.getElementsByClassName("cart-price")
    const bakeryContainer = document.querySelector(".bakery-container")
    const cheeseContainer = document.querySelector(".cheese-container")
    const meatContainer = document.querySelector(".meat-container")
    const paginationElement = document.querySelector(".pagenumbers")
    const groceryItem = document.querySelector(".grocery-item")
    let current_page = 1;
    let rows = 9;

    function DisplayList (items, wrapper, rows_per_page, page) {
        wrapper.innerHTML = "";
        page--;

        let start = rows_per_page * page;
        let end = start + rows_per_page;
        let paginatedItems = items.slice(start, end);
        console.log(paginatedItems)
        for (let i = start; i < paginatedItems.length + rows_per_page; i++) {
            renderItem(paginatedItems[i])
        }
    }

    

    //cart item Url
    const cartItemURL = "http://localhost:3000/cart_items/"
    //fetch baseUrl
    const itemFetchAdapter = new FetchAdapter("http://localhost:3000/")
    // itemFetchAdapter.get("items", action)

    // Fetch all items
    const action = items => {
        DisplayList(items, categoryItems, rows, current_page);
    }

    // const action = items => items.forEach(item => renderItem(item))

    // Fetch all items from cart
    const fetchCart = carts => carts.forEach(cart => {
            renderCartItem(cart.id, cart.item)
            cartInfo()
    })

    // sub-category lists
    const subCategory = (item) => {
        const subCategoryP = document.createElement('p')
        subCategoryP.innerText = item.sub_category
        subCategoryP.className = "sub-category-nav"
        
        if(sideNav.innerText.includes(item.sub_category)){
            subCategoryP.innerText = ""
        } else {
            sideNav.append(subCategoryP)
        }
    }

    // // main page images by category
    const mainBakery = () => {
        // bakeryContainer.append
        itemFetchAdapter.get("items", bakeryMain)
    //     bakery_items=[]
    //     console.log(bakery_items)
    // }
    
    // const bakeryMain = items => items.forEach(item => {
    //     if (item.category === "Bakery") {
    //         bakery_items.push(item)
    //     }
    }

    const bakeryMain = items => items.forEach(item => {
        if (item.category === "Bakery") {
            renderItem(item)
         }
    })
    

    // Fetch items and subcategories by category
    const bakery = items => items.forEach(item => { 
        if (item.category === "Bakery") {
            renderItem(item)
            subCategory(item)
        }
    })

    const cheese = items => items.forEach(item => { 
        if (item.category === "Cheese") {
            renderItem(item)
            subCategory(item)
        }
    })

    const meat = items => items.forEach(item => { 
        if (item.category === "Meat") {
            renderItem(item)
            subCategory(item)
        }
    })

    const seafood = items => items.forEach(item => { 
        if (item.category === "Seafood") {
            renderItem(item)
            subCategory(item)
        }
    })

    // sideNav listener
    sideNav.addEventListener("click", (e) => {
        if (e.target.className === "sub-category-nav") {
            categoryItems.innerHTML = ""
            itemSubCategory = e.target.innerText
            itemFetchAdapter.get("items", subCategoryItems)
        }
    })

    const subCategoryItems = items => items.forEach(item => {
        if (itemSubCategory === item.sub_category) {
            renderItem(item)
        }
    })

    // render items to cart
    const renderCartItem = (cart_id, item) => {
        const cartItem = document.createElement("div")
        cartItem.className = "cart-item"
        cartItem.draggable = "true"
        cartItem.dataset.price = item.sales_price
        cartItem.dataset.cart_id = cart_id
        cartItem.dataset.description = item.description
        cartItem.dataset.nutrition = item.nutrition
        cartList.append(cartItem)

        const cartImage = document.createElement("img")
        cartImage.className = "cart-image"
        cartImage.src = item.image
        cartImage.alt = item.name
        cartItem.append(cartImage)

        const cartName = document.createElement("div")
        cartName.className = "cart-name"
        cartName.innerHTML = item.name
        cartItem.append(cartName)

        const cartPrice = document.createElement("div")
        cartPrice.className = "cart-price"
        cartPrice.innerHTML = `$ ${item.sales_price}`
        cartItem.append(cartPrice)

        const removeItemBtn = document.createElement("button")
        removeItemBtn.className = "remove-item-btn"
        removeItemBtn.innerText = "X"
        cartItem.append(removeItemBtn)

        cartItem.addEventListener("dragstart", () => {
            cartItem.classList.add("dragging")
        })

        cartItem.addEventListener("dragend", () => {
            cartItem.classList.remove("dragging")
        })
    }

    cartList.addEventListener("dragover", () => {
        const draggable = document.querySelector(".dragging")
        draggable.style.borderBottom = "dotted"
        draggable.style.height="85px"
        cartList.appendChild(draggable)
    })

    wishContainer.addEventListener("dragover", () => {
        const draggable = document.querySelector(".dragging")
        draggable.style.borderBottom = "none"
        draggable.style.height="40px"
        wishContainer.append(draggable)
    })

    const renderItem = (item) => {
        const itemDiv = document.createElement("div")
        itemDiv.className = "grocery-item"
        
        
        //item name
        const apiItemName = document.createElement("div")
        apiItemName.className = "api-item-name"
        apiItemName.innerHTML = `${item.name}`
        itemDiv.append(apiItemName)

        //item image
        const itemImg = document.createElement('img')
        itemImg.className = "grocery-image"
        itemImg.src = item.image
        itemImg.alt = item.name
        itemDiv.append(itemImg)

        //Add to cart button
        const itemToCart = document.createElement('button')
        itemToCart.className = "add-to-cart"
        itemToCart.innerText = "Add to Cart"
        itemDiv.append(itemToCart)

        //view item button
        const itemButton = document.createElement('button')
        itemButton.dataset.id = item.id
        itemButton.className = "grocery-show-button"
        itemButton.innerText = "View"
        itemDiv.append(itemButton)

        categoryItems.append(itemDiv)

        // dataset database
        itemDiv.id = item.id
        itemDiv.dataset.category = item.category
        itemDiv.dataset.sub_category = item.sub_category
        itemDiv.dataset.name = item.name
        itemDiv.dataset.sku = item.item_id
        itemDiv.dataset.price = item.sales_price
        itemDiv.dataset.inventory_quantity = item.inventory_quantity
        itemDiv.dataset.description = item.description
        itemDiv.dataset.image = item.image
        itemDiv.dataset.receipt_info = item.receipt_info
        itemDiv.dataset.nutrition = item.nutrition
    }

    // Flatiron click => page reload
    navLeft.addEventListener("click", (e) => {
        location.reload()
    })
    
    // hide & seek with the cart
    navCart.addEventListener("click", (e) => {
        cartContainer.style.display = "block"
        navCart.disabled = true;
        navBar.style.opacity = 0.3
        blank.style.opacity = 0.3
        sideNav.style.opacity = 0.3
        containers.style.opacity = 0.3
        document.body.style.overflow = "hidden"
        itemFetchAdapter.get("cart_items", fetchCart)
    })

    // cart Info
    const cartInfo = () => {
        let num = 0;
        let taxAmount = 0;
        let total = 0;
        for (let price of cartPrices){
            amount = parseFloat(price.innerText.split(" ")[1])
            num += amount
            num.toFixed(2)
            subtotal = parseFloat(num.toFixed(2))
            cartSubtotal.lastChild.innerText = `$ ${num.toFixed(2)}`
            
            // tax
            taxAmount += subtotal * .08625
            cartTax.lastChild.innerText = `$ ${taxAmount.toFixed(2)}`
            
            // estimated total
            total = subtotal + taxAmount
            estimatedTotal.lastChild.innerText = `$ ${total.toFixed(2)}`
        }
    }
    
    // clickhandler
    document.addEventListener("click", (e) => {
        if (e.target.className === "cart-btn") {
            cartContainer.style.display = "none"
            compareContainer.style.display = "none"
            cartList.innerHTML = ""
            wishContainer.innerHTML = ""
            wishlistMiddle.innerHTML = ""
            navBar.style.opacity = 1
            blank.style.opacity = 1
            sideNav.style.opacity = 1
            containers.style.opacity = 1
            document.body.style.overflow = "scroll"
        // }   else if (e.target === navWishlist) {
        //     compareContainer.style.display = "block"
        //     navBar.style.opacity = 0.3
        //     blank.style.opacity = 0.3
        //     sideNav.style.opacity = 0.3
        //     containers.style.opacity = 0.3
        //     document.body.style.overflow = "hidden"
        } else if (e.target === goCartBtn) {
            wishlistMiddle.innerHTML = ""
            compareContainer.style.display = "none"
            cartContainer.style.display = "block"
        } else if (e.target.className === "grocery-show-button" ){
            groceryIndex.style.display = "block"
            document.body.style.overflow = "hidden"
            navBar.style.opacity = 0.3
            blank.style.opacity = 0.3
            sideNav.style.opacity = 0.3
            containers.style.opacity = 0.3

            // console.dir(e.target)
            /// e.target = grocery show button
            let image = document.querySelector('.index-image')
            let name = document.querySelector('.index-name')
            let category = document.querySelector('.index-category')
            let subCategory = document.querySelector('.index-sub-category')
            let description = document.querySelector('.index-description')
            let sku = document.querySelector('.index-sku')
            let price = document.querySelector('.index-price')
            

            item = e.target.parentElement
            
            //item info
            category.innerText = item.dataset.category
            subCategory.innerText = item.dataset.sub_category
            name.innerText = item.dataset.name
            sku.innerText = item.dataset.sku
            price.innerText = item.dataset.price
            description.innerText = item.dataset.description
            image.src = item.dataset.image
            image.alt = item.dataset.name
        } else if (e.target.className === "close-btn") {
            groceryIndex.style.display = "none"
            document.body.style.overflow = "scroll"
            navBar.style.opacity = 1
            blank.style.opacity = 1
            sideNav.style.opacity = 1
            containers.style.opacity = 1
        } else if (e.target.className === "add-to-cart") {
            parentItem = e.target.parentElement
            
            let item = {
                "id": parentItem.id,
                "item_id": parentItem.dataset.sku, 
                "name": parentItem.dataset.name, 
                "sales_price": parentItem.dataset.price, 
                "description": parentItem.dataset.description, 
                "inventory_quantity": parentItem.dataset.inventory_quantity, 
                "image": parentItem.dataset.image, 
                "nutrition": parentItem.dataset.nutrition,
                "receipt_info": parentItem.dataset.nutrition,
                "category": parentItem.dataset.receipt_info,
                "sub_category": parentItem.dataset.sub_category
            }

            postItemtoCart(item)
        } else if (e.target.className === "remove-item-btn") {
            item = e.target.parentElement
            
            // let htmlTotal = 
            let subtotal = parseFloat(item.parentElement.nextElementSibling.children[0].children[0].children[1].lastChild.innerText.split(" ")[1])
            let tax = parseFloat(item.parentElement.nextElementSibling.children[0].children[0].children[1].lastChild.innerText.split(" ")[2])
            let estimatedTotal = parseFloat(item.parentElement.nextElementSibling.children[0].children[1].lastChild.innerText.split(" ")[1])

            let price = parseFloat(item.dataset.price)

            let newSubTotal = parseFloat(subtotal - price)
            let newTax = parseFloat(newSubTotal * .08625)
            let newTotal = parseFloat(newSubTotal + newTax)
            
            item.parentElement.nextElementSibling.children[0].children[0].children[1].lastChild.innerText = `$ ${newSubTotal.toFixed(2)}`
            item.parentElement.nextElementSibling.children[0].children[0].children[2].lastChild.innerText = `$ ${newTax.toFixed(2)}`
            item.parentElement.nextElementSibling.children[0].children[1].lastChild.innerText = `$ ${newTotal.toFixed(2)}`
            
            deleteItemfromCart(item, item.dataset.cart_id)
            
        } else if (e.target.className === "wishlist-remove-btn") {
            item = e.target.parentElement
            deleteItemfromCart(item, item.dataset.cart_id)
        } else if (e.target.className === "empty-btn"){
            
            let items = cartList.children // HTML collection
            
            for(let i = 0; i < items.length; i++){
                deleteAllItemsfromCart(items[i].dataset.cart_id)
                function deleteAllItemsfromCart(cartId) {
                    const options = {
                        method: "DELETE"
                    }
                    fetch(cartItemURL + cartId, options)
                    .then(resp => resp.json())
                    .then(data => {
                        cartList.innerHTML = ""
                        cartSubtotal.innerHTML = "Subtotal <span>0.00</span>"
                        cartTax.innerHTML = "Estimated tax <span>0.00</span>"
                        estimatedTotal.innerHTML = "<strong>Estimated total </strong><span>0.00</span>"
                    })
                }
            }
        }
    })
    
    // delete item from cart_item url
    const deleteItemfromCart = (item, cartId) => {
        const options = {
            method: "DELETE"
        }
        fetch(cartItemURL + cartId, options)
        .then(resp => resp.json())
        .then(item.remove()) 
    }

    // add item to cart_item url
    function postItemtoCart(item) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({
                cart_id: 57,
                item_id: item.id
            })
        }
        fetch("http://localhost:3000/cart_items", options)
        // .then(res => res.json())
    }

    // click the items in dropdown list to fetch the category api

    ddAisle.addEventListener("click", (e) => {
        let categoryId = e.target.dataset.num
        let itemCategory = e.target.innerText 

        blank.innerText = itemCategory

        // category different colors
        switch (blank.innerText){
            case "Bakery":
                categoryItems.innerHTML = "";
                blank.style.backgroundColor = "BurlyWood";
                blank.style.height = "50px";
                categoryItems.style.display = "block";
                itemFetchAdapter.get("items", bakery)
                // bakery_items=[]
                // console.log(bakery_items)
                // DisplayList(groceryItem, categoryItems, rows, current_page);
                break;
            case "Produce":
                blank.style.backgroundColor = "LightGreen";
                blank.style.height = "50px";
                break;
            case "Cheese":
                categoryItems.innerHTML = "";
                blank.style.backgroundColor = "GoldenRod";
                blank.style.height = "50px";
                categoryItems.style.display = "block"
                itemFetchAdapter.get("items", cheese)
                break;
            case "Prepared Foods":
                blank.style.backgroundColor = "LightSlateGrey";
                blank.style.height = "50px";
            break;
            case "Meat":
                categoryItems.innerHTML = "";
                blank.style.backgroundColor = "FireBrick";
                blank.style.height = "50px";
                categoryItems.style.display = "block"
                itemFetchAdapter.get("items", meat)
            break;
            case "Seafood":
                categoryItems.innerHTML = "";
                blank.style.backgroundColor = "DodgerBlue";
                blank.style.height = "50px";
                categoryItems.style.display = "block"
                itemFetchAdapter.get("items", seafood)
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
                categoryItems.innerHTML = "";
                blank.style.backgroundColor = "DimGrey";
                blank.style.height = "50px";
                categoryItems.style.display = "block"
                itemFetchAdapter.get("items", action)
            break;
        }

        //dataset.num ( category ID )
        
        const newDiv = document.createElement("div")
        newDiv.dataset.num = categoryId
        newDiv.classList.add("item-categories")
        mainContainers.innerHTML = ""
        
        //Side Navigation Bar
        sideNav.style.display = "block"       
        sideNav.innerHTML = `
            <em>${itemCategory}</em>
        `
        sideNav.dataset.num = categoryId
    })

    //compare click button
    compareBtn.addEventListener("click", (e) => {
        if (e.target.previousElementSibling.childElementCount <= 1) {
            alert("You need to choose two or more items to compare!")
        } else {
            compareContainer.style.display = "block"
            navBar.style.opacity = 0.3
            blank.style.opacity = 0.3
            sideNav.style.opacity = 0.3
            containers.style.opacity = 0.3
            document.body.style.overflow = "hidden"
            cartContainer.style.display = "none"
            
            wishContainer.childNodes.forEach(item => {
                //create div for each item
                const itemDiv = document.createElement("div")
                itemDiv.className = "wishlist-middle-item"
                itemDiv.dataset.cart_id = item.dataset.cart_id
                wishlistMiddle.append(itemDiv)

                //create item image
                const itemImage = document.createElement("img")
                itemImage.className = "wishlist-item-image"
                itemImage.src = item.children[0].src
                itemImage.alt = item.innerText
                itemDiv.append(itemImage)
                
                //create item title
                const itemTitle = document.createElement("div")
                itemTitle.className = "wishlist-item-title"
                itemTitle.innerHTML = item.innerText
                itemDiv.append(itemTitle)
                
                //create item price
                const itemPrice = document.createElement("div")
                itemPrice.className = "wishlist-item-price"
                itemPrice.innerText = `price: $ ${item.dataset.price}`
                itemDiv.append(itemPrice)

                const itemDescription = document.createElement("div")
                itemDescription.className = "wishlist-item-description"
                itemDescription.innerHTML = item.dataset.description
                itemDiv.append(itemDescription)
                
                //create item nutrition
                const itemNutrition = document.createElement("div")
                itemNutrition.className = "wishlist-item-nutrition"
                itemNutrition.innerHTML = item.dataset.nutrition
                itemDiv.append(itemNutrition)

                //create remove button
                const wishlistRemoveBtn = document.createElement("button")
                wishlistRemoveBtn.className = "wishlist-remove-btn"
                wishlistRemoveBtn.innerText = "Remove Item"
                itemDiv.append(wishlistRemoveBtn)
                //clickhandler => DELETE item from cart 
            }) 
        }
    })



    // mainBakery()
})

