const inputValue = document.getElementById("search-value")
document.getElementById("search-btn").addEventListener("click", () => {
	const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue.value}`
	fetch(url)
		.then((res) => res.json())
		.then((data) => getPhones(data.data))
})
const getPhones = (phones) => {
	const productsContainer = document.getElementById("products-container")
	phones.forEach((phone) => {
		console.log(phone)
		const div = document.createElement("div")
		div.classList.add("card", "col-md-6", "m-2")
		div.style.width = "18rem"
		div.innerHTML = `
        
						<img src="${phone.image}" class="card-img-top" alt="..." />
						<div class="card-body">
							<h5 class="card-title">${phone.phone_name}</h5>
							<p class="card-text">${phone.brand}</p>
							<button  class="btn btn-primary">show details</button>
						</div>
					
        `
		productsContainer.appendChild(div)
	})
}
