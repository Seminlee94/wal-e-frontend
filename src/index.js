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
    const searchForm = document.getElementById('nav-form')
    const mainPagePicture = document.querySelector("#main-page-picture")

    let current_page = 1;
    let rows = 9;

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



    //cart item Url
    const cartItemURL = "http://localhost:3000/cart_items/"

    //fetch baseUrl
    const itemFetchAdapter = new FetchAdapter("http://localhost:3000/")


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
        if (item.quantity === null) {
            item.quantity = 1
        } 
        cartQuantity.innerHTML = item.quantity
        
        cartItem.append(cartQuantityBox)
        // debugger



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
            if (category.innerText === "null" && subCategory.innerText === "null") {
                category.innerText = "category not found"
                subCategory.innerText = "sub category not found"
            } 
            name.innerText = item.dataset.name
            sku.innerText = item.dataset.sku
            price.innerText = item.dataset.price
            description.innerText = item.dataset.description
            image.src = item.dataset.image
            image.alt = item.dataset.name
            // debugger
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
        } else if (e.target.className === "quantity-down") {
            item_quantity = parseInt(e.target.nextElementSibling.innerText)
            if (item_quantity === 1 ) {
                e.target.style.display = "none"
            }
            new_item_quantity = item_quantity - 1
            e.target.nextElementSibling.innerText = new_item_quantity
            // debugger
        } else if (e.target.className === "quantity-up") {
            item_quantity = parseInt(e.target.previousElementSibling.innerText)
            if (item_quantity === 0 ) {
                e.target.previousElementSibling.previousElementSibling.style.display = "block"
            }
            new_item_quantity = item_quantity + 1
            e.target.previousElementSibling.innerText = new_item_quantity
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
                mainPagePicture.children[0].src = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRwZS2qmTcyHuI3H_5hcASwJiGTLb34XhTVuw&usqp=CAU"
                itemFetchAdapter.get("items", bakery)
                
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
                mainPagePicture.children[0].src ="data:image/jpeg;base64,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"
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
                mainPagePicture.children[0].src = "https://media.istockphoto.com/photos/variety-of-raw-black-angus-prime-meat-steaks-picture-id923692030?k=6&m=923692030&s=612x612&w=0&h=l4zOisv1id7AbouEaOln3Wt_8k7bPGR8ILlNMoNsHxU="
                itemFetchAdapter.get("items", meat)
            break;
            case "Seafood":
                categoryItems.innerHTML = "";
                blank.style.backgroundColor = "DodgerBlue";
                blank.style.height = "50px";
                categoryItems.style.display = "block"
                mainPagePicture.children[0].src = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTmkxtFIixap-GpApyOT_fIcYh2LRZ_kwIyiA&usqp=CAU"
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



    frontpage()
    getItemByName()
})

