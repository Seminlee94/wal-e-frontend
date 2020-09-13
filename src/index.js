document.addEventListener('DOMContentLoaded', () => {
    const welcomeToWalE = document.querySelector(".welcome-to-wale")
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
    const searchForm = document.getElementById('nav-form')
    const mainPagePicture = document.querySelector("#main-page-picture")

    let current_page = 1;
    let rows = 9;
    let num = 0;
    let cartItems = [];

    //cart item Url
    const cartItemURL = "http://localhost:3000/cart_items/"

    //fetch baseUrl
    const itemFetchAdapter = new FetchAdapter("http://localhost:3000/")

    // display list
    function DisplayList (items, wrapper, rows_per_page, page) {
        wrapper.innerHTML = "";
        // console.log(items)
        // page--;

        let start = rows_per_page * page;
        let end = start + rows_per_page;
        let paginatedItems = items.slice(start, end);
        paginatedItems.forEach(item => renderItem(item))
        // console.log(paginatedItems)
        // for (let i = start; i < paginatedItems.length + rows_per_page; i++) {
            // renderItem(paginatedItems[i])
            // console.log(paginatedItems[i])
        // }
    }

    const getItemByName = () => {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault()
            let form = e.target
            let queryText = e.target.search.value
            queryText.split(" ").join("%20")

            let heading = document.createElement('h2')
            heading.innerHTML = `Search Results for: ${queryText}`

            categoryItems.innerHTML = ""
            categoryItems.append(heading)

            createItem(queryText)
            form.reset()
        })
    }

    const createItem = (itemName) => {

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({
                name: itemName
            })
        }
        fetch("http://localhost:3000/items/", options)
        .then(res => res.json())
        .then(data => {
            for(let item of data){
                // console.log(item)
                renderItem(item)
            }
        })
    }

    // front page && index
    const frontpage = () => {
        categoryItems.style.display = "block"
        itemFetchAdapter.get("items", frontIndex)
    }
    
    const frontIndex = items => {
        DisplayList(items, categoryItems, rows, current_page);
    }
    
    // Fetch all items
    const action = items => items.forEach(item => renderItem(item))

    // Fetch all items from cart
    const fetchCart = carts => carts.forEach(cart => {
            renderCartItem(cart.id, cart.item, cart.quantity)
            cartInfo(cart)
    })

    // // Fetch cart_items to check presence of an item
    // const checkItemInCart = carts => carts.forEach(cart => {
    //     cartItems.push(cart)
    //     debugger
    //     // for(const cart of carts) {

    //     // }

    // })

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
    const renderCartItem = (cart_id, item, quantity) => {
        const cartItem = document.createElement("div")
        cartItem.className = "cart-item"
        cartItem.draggable = "true"
        cartItem.dataset.price = item.sales_price
        cartItem.dataset.cart_id = cart_id
        cartItem.dataset.description = item.description
        cartItem.dataset.nutrition = item.nutrition
        cartItem.dataset.item_id = item.id

        const cartImage = document.createElement("img")
        cartImage.className = "cart-image"
        cartImage.src = item.image
        cartImage.alt = item.name
        cartItem.append(cartImage)

        const cartName = document.createElement("div")
        cartName.className = "cart-name"
        cartName.innerHTML = item.name
        cartItem.append(cartName)

        const cartQuantityBox = document.createElement("div")
        cartQuantityBox.className = "cart-quantity-box"
        const quantityDown = document.createElement("img")
        const quantityUp = document.createElement("img")
        const cartQuantity = document.createElement("div")
        quantityDown.className = "quantity-down"
        quantityDown.src = "https://t3.ftcdn.net/jpg/03/08/33/44/240_F_308334444_a03jdKtCxp1RbqvMQsz6zdaCNTTxhaK7.jpg"
        
        quantityUp.className = "quantity-up"
        quantityUp.src = "https://t3.ftcdn.net/jpg/02/93/94/42/240_F_293944233_9v9vpVR4eiMO6lYZ5V83zmpLens7MLHL.jpg"

        cartQuantity.className = "cart-quantity"
        cartQuantityBox.append(quantityDown)
        cartQuantityBox.append(cartQuantity)
        cartQuantityBox.append(quantityUp)

        cartQuantity.innerText = quantity
        // debugger
        
        cartItem.append(cartQuantityBox)

        const cartPrice = document.createElement("div")
        cartPrice.className = "cart-price"
        priceXQuantity = (quantity * item.sales_price)
        cartPrice.innerHTML = `$ ${priceXQuantity}`
        cartItem.append(cartPrice)

        cartList.append(cartItem)
        // if(cartList.childElementCount === 0) {
        // } else {
        //     for(const item of cartList.children ) {
        //         console.log( item.dataset.item_id )
        //         if(item.dataset.item_id) {
        //             console.log(item)
        //             // debugger
        //         } else {
        //             cartList.append(cartItem)
        //         }
                    
        //     }
        // }
        


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
    
        //item image
        const itemImg = document.createElement('img')
        itemImg.className = "grocery-image"
        itemImg.src = item.image
        itemImg.alt = item.name
        itemDiv.append(itemImg)

        //item price
        const itemPrice = document.createElement("div")
        itemPrice.className = "item-price"
        itemPrice.innerHTML = `$ ${item.sales_price}`
        itemDiv.append(itemPrice)

        //item name
        const apiItemName = document.createElement("div")
        apiItemName.className = "api-item-name"
        apiItemName.innerHTML = `${item.name}`
        itemDiv.append(apiItemName)

        //Add to cart button
        const itemToCart = document.createElement('button')
        itemToCart.className = "add-to-cart"
        itemToCart.innerText = "Add to Cart"
        // itemDiv.append(itemToCart)

        //view item button
        const itemButton = document.createElement('button')
        itemButton.dataset.id = item.id
        itemButton.className = "grocery-show-button"
        itemButton.innerText = "View"
        // itemDiv.append(itemButton)

        const overlay = document.createElement("div")
        overlay.className = "overlay"
        const groceryText = document.createElement("div")
        groceryText.className = "grocery-text"
        groceryText.append(itemToCart)
        groceryText.append(itemButton)
        overlay.append(groceryText)
        
        itemDiv.append(overlay)

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
    const cartInfo = (cart) => {
        let taxAmount = 0;
        let total = 0;
        
        let multiplier = (cart["item"].sales_price * cart.quantity)
    
        num += multiplier
        // debugger
        
        cartSubtotal.lastChild.innerText = `$ ${num.toFixed(2)}`
        // tax
        taxAmount = num * .08625
        cartTax.lastChild.innerText = `$ ${taxAmount.toFixed(2)}`
        
        // estimated total
        total = num + taxAmount
        estimatedTotal.lastChild.innerText = `$ ${total.toFixed(2)}`
    }
    
    // clickhandler
    document.addEventListener("click", (e) => {
        if (e.target.className === "cart-btn") {
            // cart X button
            num = 0;
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
        } else if (e.target === goCartBtn) {
            //cart button
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

            /// e.target = grocery show button
            let image = document.querySelector('.index-image')
            let name = document.querySelector('.index-name')
            let category = document.querySelector('.index-category')
            let subCategory = document.querySelector('.index-sub-category')
            let description = document.querySelector('.index-description')
            let sku = document.querySelector('.index-sku')
            let price = document.querySelector('.index-price')
            
            item = e.target.parentElement.parentElement.parentElement
            
            //item info
            name.innerText = item.dataset.name
            price.innerText = `Price: ${item.dataset.price}`
            category.innerText = `Category: ${item.dataset.category}`
            subCategory.innerText = `Sub-category: ${item.dataset.sub_category}`
            if (category.innerText === "null" && subCategory.innerText === "null") {
                category.innerText = "category not found"
                subCategory.innerText = "sub category not found"
            } 
            sku.innerText = `SKU#: ${item.dataset.sku}`
            description.innerText = `Description: ${item.dataset.description}`
            image.src = item.dataset.image
            image.alt = item.dataset.name
        } else if (e.target.className === "close-btn") {
            //View X btn
            groceryIndex.style.display = "none"
            document.body.style.overflow = "scroll"
            navBar.style.opacity = 1
            blank.style.opacity = 1
            sideNav.style.opacity = 1
            containers.style.opacity = 1
        } else if (e.target.className === "add-to-cart") {
            parentItem = e.target.parentElement.parentElement.parentElement
            
            
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

            // itemFetchAdapter.get("cart_items", checkItemInCart)
            postItemtoCart(item)

        } else if (e.target.className === "remove-item-btn") {
            item = e.target.parentElement
            
            let subtotal = parseFloat(item.parentElement.nextElementSibling.children[0].children[0].children[1].lastChild.innerText.split(" ")[1])
            // let tax = parseFloat(item.parentElement.nextElementSibling.children[0].children[0].children[1].lastChild.innerText.split(" ")[2])
            // let estimatedTotal = parseFloat(item.parentElement.nextElementSibling.children[0].children[1].lastChild.innerText.split(" ")[1])

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
        } else if (e.target.className === "quantity-down") {
            let item_quantity = parseInt(e.target.nextElementSibling.innerText)
            let total = 0;
            let subtotal = 0;
            let taxAmount = 0;
            if (item_quantity === 0 ) {
                e.target.style.display = "none"
            } else {
                //new_quantity && price
                let new_item_quantity = item_quantity - 1
                let item_price = parseFloat(e.target.parentElement.parentElement.children[3].innerText.split(" ")[1])
                priceXQuantity = (item_price - parseFloat(parseFloat(e.target.parentElement.parentElement.dataset.price).toFixed(2)))
                e.target.parentElement.parentElement.children[3].innerText = `$ ${priceXQuantity.toFixed(2)}`
    
                e.target.nextElementSibling.innerText = new_item_quantity
                let item_cart_id = e.target.parentElement.parentElement.dataset.cart_id

                //adding the totals
                for(const child of e.target.parentElement.parentElement.parentElement.children) {
                    total += parseFloat(child.children[3].lastChild.textContent.split(" ")[1])
                }

                cartSubtotal.lastChild.innerText = `$ ${total.toFixed(2)}`

                taxAmount = total * .08625
                cartTax.lastChild.innerText = `$ ${taxAmount.toFixed(2)}`
                
                // estimated total
                subtotal = total + taxAmount
                estimatedTotal.lastChild.innerText = `$ ${subtotal.toFixed(2)}`

                updateItemQuantity(new_item_quantity, item_cart_id)
            }

        } else if (e.target.className === "quantity-up") {
            let item_quantity = parseInt(e.target.previousElementSibling.innerText)
            let total = 0;
            let subtotal = 0;
            let taxAmount = 0;
            e.target.previousElementSibling.previousElementSibling.style.display = "block"

            //new_quantity && price
            let new_item_quantity = item_quantity + 1
            let item_price = parseFloat(e.target.parentElement.parentElement.children[3].innerText.split(" ")[1])
            priceXQuantity = (item_price + parseFloat(parseFloat(e.target.parentElement.parentElement.dataset.price).toFixed(2)))
            e.target.parentElement.parentElement.children[3].innerText = `$ ${priceXQuantity.toFixed(2)}`            
            e.target.previousElementSibling.innerText = new_item_quantity

            //item_cart_id
            let item_cart_id = e.target.parentElement.parentElement.dataset.cart_id 

            //adding the total    
            for(const child of e.target.parentElement.parentElement.parentElement.children) {
                total += parseFloat(child.children[3].lastChild.textContent.split(" ")[1])
            }

            cartSubtotal.lastChild.innerText = `$ ${total.toFixed(2)}`

            taxAmount = total * .08625
            cartTax.lastChild.innerText = `$ ${taxAmount.toFixed(2)}`
            
            // estimated total
            subtotal = total + taxAmount
            estimatedTotal.lastChild.innerText = `$ ${subtotal.toFixed(2)}`

            updateItemQuantity(new_item_quantity, item_cart_id)
        }
    })

    // update item_quantity to cart_item url
    const updateItemQuantity = (new_item_quantity, item_cart_id) => {
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({
                quantity: new_item_quantity
            })
        }
        fetch(cartItemURL + item_cart_id, options)        
        .then(res => res.json())
    }
    
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
        fetch(cartItemURL, options)
            .then(resp => resp.json())
    }

    // click the items in dropdown list to fetch the category api

    ddAisle.addEventListener("click", (e) => {
        let categoryId = e.target.dataset.num
        let itemCategory = e.target.innerText 

        blank.innerText = itemCategory

        // category different colors
        switch (blank.innerText){
            case "Bakery":
                welcomeToWalE.style.display = "none"
                categoryItems.innerHTML = "";
                blank.style.backgroundColor = "BurlyWood";
                blank.style.height = "50px";
                categoryItems.style.display = "block";
                mainPagePicture.children[0].src = ("images/bakery.png")
                itemFetchAdapter.get("items", bakery)
                
                break;
            case "Produce":
                welcomeToWalE.style.display = "none"
                blank.style.backgroundColor = "LightGreen";
                blank.style.height = "50px";
                break;
            case "Cheese":
                welcomeToWalE.style.display = "none"
                categoryItems.innerHTML = "";
                blank.style.backgroundColor = "GoldenRod";
                blank.style.height = "50px";
                categoryItems.style.display = "block"
                mainPagePicture.children[0].src ="images/cheese.png"
                itemFetchAdapter.get("items", cheese)
                break;
            case "Prepared Foods":
                welcomeToWalE.style.display = "none"
                blank.style.backgroundColor = "LightSlateGrey";
                blank.style.height = "50px";
            break;
            case "Meat":
                welcomeToWalE.style.display = "none"
                categoryItems.innerHTML = "";
                blank.style.backgroundColor = "FireBrick";
                blank.style.height = "50px";
                categoryItems.style.display = "block"
                mainPagePicture.children[0].src = ("images/meat.png")
                itemFetchAdapter.get("items", meat)
            break;
            case "Seafood":
                welcomeToWalE.style.display = "none"
                categoryItems.innerHTML = "";
                blank.style.backgroundColor = "DodgerBlue";
                blank.style.height = "50px";
                categoryItems.style.display = "block"
                mainPagePicture.children[0].src = "images/seafood.png"
                itemFetchAdapter.get("items", seafood)
            break;
            case "Wine, Beer & Spirits":
                welcomeToWalE.style.display = "none"
                blank.style.backgroundColor = "Crimson";
                blank.style.height = "50px";
            break;
            case "Other Departments":
                welcomeToWalE.style.display = "none"
                blank.style.backgroundColor = "BlueViolet";
                blank.style.height = "50px";
            break;
            case "View All":
                welcomeToWalE.style.display = "none"
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
                // debugger
                itemTitle.innerHTML = item.children[1].innerText
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
                itemNutrition.innerText.split("type").forEach(type => console.log(type))
                // debugger

                //create remove button
                const wishlistRemoveBtn = document.createElement("button")
                wishlistRemoveBtn.className = "wishlist-remove-btn"
                wishlistRemoveBtn.innerText = "Remove Item"
                itemDiv.append(wishlistRemoveBtn)
                //clickhandler => DELETE item from cart 
            }) 
        }
    })



    frontpage()
    getItemByName()
})

