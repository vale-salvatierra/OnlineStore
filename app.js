let containerCards = document.querySelector('#containerCards')
const offCanvas = document.querySelector("#offcanvasRight")
const closeOffCanvas =  document.querySelector('.btn-close')
const offcanvasBody = document.querySelector(".offcanvas-body")

let url = "https://api.escuelajs.co/api/v1/products"
let productos = []
let loading = false;
let productosCarrito = []

const showOffCanvas = () =>{
    offCanvas.classList.remove('hide')
    offCanvas.classList.add('show')

}
const hideOffCanvas = () =>{
    offCanvas.classList.remove('show')
    offCanvas.classList.add('hide')
}

closeOffCanvas.addEventListener('click', ()=>{
    hideOffCanvas()
})



const isLoading = () => {
    if (loading) {
        containerCards.innerHTML = `
        <div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
        `
    }
}
const obtenerProductos = () => {
    loading = true
    isLoading()
    fetch(url)
        .then(response => {
            return response.json();

        })
        

        .then((data) => {
            const detalles = data.slice(0, 10)
            productos = detalles.map((product) => ({
                img: product.images,
                title: product.title,
                price: product.price

            }))
            console.log(productos)

            containerCards.innerHTML = ''
            crearCard(productos)
            
            
        })
        
        .catch((error) => {
            console.log('Hubo un Error', error)
        })
        loading = false
}

obtenerProductos()

const crearCarrito = (products) =>{
    products.forEach(product => {
        let cardSmall = document.createElement('div')
        
        cardSmall.classList.add("card")



        let imgSmall = document.createElement('img')
        imgSmall.classList.add('card-image-top')
        imgSmall.setAttribute('src', `${product.img}`)

        let cardBodySmall = document.createElement('div')
        cardBodySmall.classList.add('card-body')

        let titleSmall = document.createElement('h5')
        titleSmall.classList.add('card-text', 'fw-bold')
        titleSmall.textContent = `${product.title}`

        let priceSmall = document.createElement('h5')
        priceSmall.classList.add('card-title', 'fw-bold')
        priceSmall.setAttribute("style", "color: #6A0DAD;")
        priceSmall.textContent = `${product.price}`        

        offcanvasBody.appendChild(cardSmall)
        cardSmall.appendChild(imgSmall)
        cardSmall.appendChild(cardBodySmall)
        cardBodySmall.appendChild(titleSmall)
        cardBodySmall.appendChild(priceSmall)
        

        
        
        
    })
}

const crearCard = (products) => {
    
    products.forEach(product => {
        let divCol = document.createElement('div')
        divCol.classList.add('col', 'p-3')

        let card = document.createElement('div')
        card.classList.add("card", "card-e")
        card.setAttribute("style", "width: 18rem; height: 20rem;")


        
        let img = document.createElement('img')
        img.classList.add('card-image-top')
        img.setAttribute('src', `${product.img}`)

        let cardBody = document.createElement('div')
        cardBody.classList.add('card-body')

        let title = document.createElement('h5')
        title.classList.add('card-text', 'fw-bold')
        title.textContent = `${product.title}`

        let price = document.createElement('h5')
        price.classList.add('card-title', 'fw-bold')
        price.setAttribute("style", "color: #6A0DAD;")
        price.textContent = `${product.price}`

        let button = document.createElement('a')
        button.classList.add("btn", "w-100", "rounded", "text-light")
        button.setAttribute("style", "background-color: #6a11cb; border: none;")
        button.textContent = "añadir al carrito"

        containerCards.appendChild(divCol)
        divCol.appendChild(card)

        card.appendChild(img)
        card.appendChild(cardBody)
        cardBody.appendChild(title)
        cardBody.appendChild(price)
        cardBody.appendChild(button)

        
        button.addEventListener('click', ()=>{
            
            
            productosCarrito.push(product)
            localStorage.setItem("miKey2", JSON.stringify(productosCarrito))
            offcanvasBody.innerHTML = ''
            
            crearCarrito(productosCarrito)
            
            console.log(productosCarrito)
            showOffCanvas()
        })
    })

    
}

