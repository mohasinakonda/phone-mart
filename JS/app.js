const inputValue = document.getElementById("search-value")
const productsContainer = document.getElementById("products-container")

const ProductsDetailsModal = document.getElementById("products-details")
document.getElementById("search-btn").addEventListener("click", () => {
	const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue.value}`
	fetch(url)
		.then((res) => res.json())
		.then((data) => getPhones(data.data))
	inputValue.value = ""
	productsContainer.innerHTML = ""
})
const getPhones = (phones) => {
	const twentyPhones = phones.slice(0, 20)
	twentyPhones.forEach((phone) => {
		// console.log(phone)
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
	ProductsDetailsModal.textContent = ""
}

const list = document.getElementById("products-div")
const getPhonesById = (phone) => {
	ProductsDetailsModal.innerHTML = ""

	const mainFeatures = phone.mainFeatures
	const releaseDate = phone.releaseDate
		? phone.releaseDate
		: "Release date not available"
	ProductsDetailsModal.innerHTML = `
	<div class=" col-6 ">
					<img class="img-fluid" src="${phone.image}" class="card-img-top" alt="..." />
					<div class="card-body">
						<h5 class="card-title">${phone.name}</h5>
						<p class="card-text">
						${releaseDate}
						</p>
					
						
						
					</div>
	`
	features(mainFeatures)
}
const features = (mainFeatures) => {
	const div = document.createElement("div")
	div.classList.add("col-md-6")
	for (const [key, value] of Object.entries(mainFeatures)) {
		const p = document.createElement("p")
		p.innerHTML = `<span class="fw-bold">${key}</span> &rarr; ${value}`

		div.appendChild(p)
		ProductsDetailsModal.appendChild(div)
	}
}
