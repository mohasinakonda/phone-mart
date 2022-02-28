const inputValue = document.getElementById("search-value")
const productsContainer = document.getElementById("products-container")

const ProductsDetailsModal = document.getElementById("modal")
document.getElementById("search-btn").addEventListener("click", () => {
	const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue.value}`
	fetch(url)
		.then((res) => res.json())
		.then((data) => getPhones(data.data))
	inputValue.value = ""
	productsContainer.innerHTML = ""
})
const getPhones = (phones) => {
	phones.forEach((phone) => {
		const div = document.createElement("div")
		div.classList.add("card", "col-md-6", "m-2")
		div.style.width = "18rem"
		div.innerHTML = `
        
						<img src="${phone.image}" class="card-img-top" alt="..." />
						<div class="card-body">
							<h5 class="card-title">${phone.phone_name}</h5>
							<p class="card-text">${phone.brand}</p>
							<button onclick=getPhoneDetails('${phone.slug}')  class="btn btn-outline-info ">show details</button>
						</div>
					
        `
		productsContainer.appendChild(div)
	})
}

const getPhoneDetails = (id) => {
	const url = `https://openapi.programming-hero.com/api/phone/${id}`
	fetch(url)
		.then((res) => res.json())
		.then((phonesDetails) => getPhonesById(phonesDetails.data))
	ProductsDetailsModal.classList.remove("d-none")
}

const getPhonesById = (phone) => {
	const div = document.createElement("div")
	div.classList.add()
	div.innerHTML = `
        <img class="img-fluid" src="${phone.image}" class="card-img-top" alt="..." />
						<div class="card-body">
							<h5 class="card-title">${phone.phone_name}</h5>
							<p class="card-text">${phone.brand}</p>
							
						</div>
        `
	ProductsDetailsModal.appendChild(div)
}
