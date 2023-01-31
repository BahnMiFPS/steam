const BASE_URL = "https://steam-api-dot-cs-platform-306304.et.r.appspot.com"
const genre = document.querySelector("#game-genre-tag")
const price = document.querySelector("#price")

async function getFeaturedGames() {
	try {
		const response = await fetch(`${BASE_URL}/features`)
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

async function getGenresList() {
	try {
		const response = await fetch(`${BASE_URL}/genres`)
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

async function applyGenreToMenu() {
	const data = await getGenresList()
	//genreMenu
	data.data.forEach((genre) => {
		const option = document.createElement("option")
		option.value = genre.name
		option.textContent =
			genre.name.charAt(0).toUpperCase() + genre.name.slice(1)
		genreMenu.appendChild(option)
	})
}

async function getTagsList() {
	try {
		const response = await fetch(`${BASE_URL}/steamspy-tags`)
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

async function applyTagsToMenu() {
	const data = await getTagsList()
	data.data.forEach((tags) => {
		const option = document.createElement("option")
		option.value = tags.name
		option.textContent = tags.name.charAt(0).toUpperCase() + tags.name.slice(1)
		tagsMenu.appendChild(option)
	})
}

const searchMenu = document.querySelector("#search")

searchMenu.addEventListener("search", () => {
	renderGamesBySearch(searchMenu.value)
})

async function searchGames(appName) {
	try {
		const response = await fetch(
			`https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?q=${appName}`
		)
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

async function renderGamesBySearch(keyword) {
	const data = await searchGames(keyword)
	genre.textContent = `Keyword: ${keyword}`
	const container = document.querySelector(".home-content-cards")
	container.innerHTML = ""
	data.data.forEach((game) => {
		if (game.price === 0) {
			game.price = "Free"
		} else {
			game.price = `${game.price}$`
		}
		const div = document.createElement("div")
		div.classList.add("game-wrapper")
		div.onclick = function () {
			appDetail(game.appid)
		}
		div.innerHTML = `						<img src="${game.header_image}" alt="" />
						<div class="game-info">
							<div class="game-info-contents">
								<span id="title">${game.name}</span>
								<span id="price">${game.price}</span>
							</div>
							<div class="favorite">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									stroke="#838ca3"
								>
									<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
									<g
										id="SVGRepo_tracerCarrier"
										stroke-linecap="round"
										stroke-linejoin="round"
									></g>
									<g id="SVGRepo_iconCarrier">
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M1 8.5C1 5.21475 3.31333 2 7 2C8.70883 2 9.92877 2.48125 10.8649 3.2079C11.3091 3.55266 11.6802 3.94929 11.9974 4.33639C12.311 3.95011 12.6785 3.55357 13.1186 3.20977C14.0531 2.47979 15.275 2 17 2C20.7289 2 23 5.22013 23 8.5C23 11.8412 21.3259 14.6994 19.2285 16.9297C17.1279 19.1634 14.523 20.8565 12.4472 21.8944C12.1657 22.0352 11.8343 22.0352 11.5528 21.8944C9.47698 20.8565 6.8721 19.1634 4.77151 16.9297C2.67415 14.6994 1 11.8412 1 8.5ZM7 4C4.68667 4 3 6.02986 3 8.5C3 11.1445 4.32585 13.5363 6.22849 15.5596C7.9833 17.4256 10.1612 18.9027 12 19.8754C13.8388 18.9027 16.0167 17.4256 17.7715 15.5596C19.6741 13.5363 21 11.1445 21 8.5C21 6.02448 19.3463 4 17 4C15.6874 4 14.907 4.35067 14.3497 4.78592C13.8333 5.18934 13.4736 5.68102 13.045 6.26703C12.9669 6.37374 12.8866 6.48357 12.8026 6.59656C12.6139 6.85039 12.3163 7 12 7C11.6837 7 11.3861 6.85039 11.1974 6.59656C11.1256 6.49997 11.0562 6.4055 10.9884 6.31318C10.5465 5.71179 10.1717 5.20159 9.63856 4.78779C9.07355 4.34922 8.29117 4 7 4Z"
											fill="#838ca3"
										></path>
									</g>
								</svg>
							</div>
						</div>`
		container.appendChild(div)
	})
}

// filter game by genre

const genreMenu = document.querySelector("#genre")
const actionNav = document.querySelector("#action")

const adventureNav = document.querySelector("#adventure")
const casualNav = document.querySelector("#casual")
const indieNav = document.querySelector("#indie")
const rpgNav = document.querySelector("#rpg")
const strategyNav = document.querySelector("#strategy")

actionNav.addEventListener("click", function () {
	renderGamesByGenres("action")
})
adventureNav.addEventListener("click", function () {
	renderGamesByGenres("adventure")
})
casualNav.addEventListener("click", function () {
	renderGamesByGenres("casual")
})
indieNav.addEventListener("click", function () {
	renderGamesByGenres("indie")
})
rpgNav.addEventListener("click", function () {
	renderGamesByGenres("rpg")
})
strategyNav.addEventListener("click", function () {
	renderGamesByGenres("strategy")
})

async function getGamesByGenres(gen) {
	if (!gen) {
		gen = genreMenu.value
	}
	try {
		const response = await fetch(`${BASE_URL}/games?genres=${gen}`)
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}

async function renderGamesByGenres(gen) {
	const data = await getGamesByGenres(gen)
	console.log(data)
	const genreTitle =
		genreMenu.value.charAt(0).toUpperCase() + genreMenu.value.slice(1)
	genre.textContent = `Genre: ${genreTitle}`
	if (gen) {
		genre.textContent = `Genre: ${gen}`
	} else {
		const genreTitle =
			genreMenu.value.charAt(0).toUpperCase() + genreMenu.value.slice(1)
		genre.textContent = `Genre: ${genreTitle}`
	}
	const container = document.querySelector(".home-content-cards")
	container.innerHTML = ""
	data.data.forEach((game) => {
		if (game.price === 0) {
			game.price = "Free"
		} else {
			game.price = `${game.price}$`
		}
		const div = document.createElement("div")
		div.classList.add("game-wrapper")
		div.onclick = function () {
			appDetail(game.appid)
		}
		div.innerHTML = `						<img src="${game.header_image}" alt="" />
						<div class="game-info">
							<div class="game-info-contents">
								<span id="title">${game.name}</span>
								<span id="price">${game.price}</span>
							</div>
							<div class="favorite">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									stroke="#838ca3"
								>
									<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
									<g
										id="SVGRepo_tracerCarrier"
										stroke-linecap="round"
										stroke-linejoin="round"
									></g>
									<g id="SVGRepo_iconCarrier">
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M1 8.5C1 5.21475 3.31333 2 7 2C8.70883 2 9.92877 2.48125 10.8649 3.2079C11.3091 3.55266 11.6802 3.94929 11.9974 4.33639C12.311 3.95011 12.6785 3.55357 13.1186 3.20977C14.0531 2.47979 15.275 2 17 2C20.7289 2 23 5.22013 23 8.5C23 11.8412 21.3259 14.6994 19.2285 16.9297C17.1279 19.1634 14.523 20.8565 12.4472 21.8944C12.1657 22.0352 11.8343 22.0352 11.5528 21.8944C9.47698 20.8565 6.8721 19.1634 4.77151 16.9297C2.67415 14.6994 1 11.8412 1 8.5ZM7 4C4.68667 4 3 6.02986 3 8.5C3 11.1445 4.32585 13.5363 6.22849 15.5596C7.9833 17.4256 10.1612 18.9027 12 19.8754C13.8388 18.9027 16.0167 17.4256 17.7715 15.5596C19.6741 13.5363 21 11.1445 21 8.5C21 6.02448 19.3463 4 17 4C15.6874 4 14.907 4.35067 14.3497 4.78592C13.8333 5.18934 13.4736 5.68102 13.045 6.26703C12.9669 6.37374 12.8866 6.48357 12.8026 6.59656C12.6139 6.85039 12.3163 7 12 7C11.6837 7 11.3861 6.85039 11.1974 6.59656C11.1256 6.49997 11.0562 6.4055 10.9884 6.31318C10.5465 5.71179 10.1717 5.20159 9.63856 4.78779C9.07355 4.34922 8.29117 4 7 4Z"
											fill="#838ca3"
										></path>
									</g>
								</svg>
							</div>
						</div>`
		container.appendChild(div)
	})
}
genreMenu.addEventListener("change", function () {
	renderGamesByGenres()
})

const tagsMenu = document.querySelector("#tags")

async function getGamesByTags() {
	try {
		const response = await fetch(
			`${BASE_URL}/games?steamspy_tags=${tagsMenu.value}`
		)
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}
async function renderGamesByTags() {
	const data = await getGamesByTags()
	const tagsTitle =
		tagsMenu.value.charAt(0).toUpperCase() + tagsMenu.value.slice(1)
	genre.textContent = `Tags: ${tagsTitle}`
	const container = document.querySelector(".home-content-cards")
	container.innerHTML = ""
	data.data.forEach((game) => {
		if (game.price === 0) {
			game.price = "Free"
		} else {
			game.price = `${game.price}$`
		}
		const div = document.createElement("div")
		div.classList.add("game-wrapper")
		div.onclick = function () {
			appDetail(game.appid)
		}
		div.innerHTML = `						<img src="${game.header_image}" alt="" />
						<div class="game-info">
							<div class="game-info-contents">
								<span id="title">${game.name}</span>
								<span id="price">${game.price}</span>
							</div>
							<div class="favorite">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									stroke="#838ca3"
								>
									<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
									<g
										id="SVGRepo_tracerCarrier"
										stroke-linecap="round"
										stroke-linejoin="round"
									></g>
									<g id="SVGRepo_iconCarrier">
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M1 8.5C1 5.21475 3.31333 2 7 2C8.70883 2 9.92877 2.48125 10.8649 3.2079C11.3091 3.55266 11.6802 3.94929 11.9974 4.33639C12.311 3.95011 12.6785 3.55357 13.1186 3.20977C14.0531 2.47979 15.275 2 17 2C20.7289 2 23 5.22013 23 8.5C23 11.8412 21.3259 14.6994 19.2285 16.9297C17.1279 19.1634 14.523 20.8565 12.4472 21.8944C12.1657 22.0352 11.8343 22.0352 11.5528 21.8944C9.47698 20.8565 6.8721 19.1634 4.77151 16.9297C2.67415 14.6994 1 11.8412 1 8.5ZM7 4C4.68667 4 3 6.02986 3 8.5C3 11.1445 4.32585 13.5363 6.22849 15.5596C7.9833 17.4256 10.1612 18.9027 12 19.8754C13.8388 18.9027 16.0167 17.4256 17.7715 15.5596C19.6741 13.5363 21 11.1445 21 8.5C21 6.02448 19.3463 4 17 4C15.6874 4 14.907 4.35067 14.3497 4.78592C13.8333 5.18934 13.4736 5.68102 13.045 6.26703C12.9669 6.37374 12.8866 6.48357 12.8026 6.59656C12.6139 6.85039 12.3163 7 12 7C11.6837 7 11.3861 6.85039 11.1974 6.59656C11.1256 6.49997 11.0562 6.4055 10.9884 6.31318C10.5465 5.71179 10.1717 5.20159 9.63856 4.78779C9.07355 4.34922 8.29117 4 7 4Z"
											fill="#838ca3"
										></path>
									</g>
								</svg>
							</div>
						</div>`
		container.appendChild(div)
	})
}

tagsMenu.addEventListener("change", function () {
	renderGamesByTags()
})

async function init() {
	applyTagsToMenu()
	applyGenreToMenu()
	genre.textContent = "Featured"
	const data = await getFeaturedGames()
	const container = document.querySelector(".home-content-cards")
	container.innerHTML = ""
	data.data.forEach((game) => {
		if (game.price === 0) {
			game.price = "Free"
		} else {
			game.price = `${game.price}$`
		}
		const div = document.createElement("div")
		div.classList.add(`game-wrapper`)
		div.onclick = function () {
			appDetail(game.appid)
		}
		div.innerHTML = `						<img src="${game.header_image}" alt="" />
						<div class="game-info">
							<div class="game-info-contents">
								<span id="title">${game.name}</span>
								<span id="price">${game.price}</span>
							</div>
							<div class="favorite">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									stroke="#838ca3"
								>
									<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
									<g
										id="SVGRepo_tracerCarrier"
										stroke-linecap="round"
										stroke-linejoin="round"
									></g>
									<g id="SVGRepo_iconCarrier">
										<path
											fill-rule="evenodd"
											clip-rule="evenodd"
											d="M1 8.5C1 5.21475 3.31333 2 7 2C8.70883 2 9.92877 2.48125 10.8649 3.2079C11.3091 3.55266 11.6802 3.94929 11.9974 4.33639C12.311 3.95011 12.6785 3.55357 13.1186 3.20977C14.0531 2.47979 15.275 2 17 2C20.7289 2 23 5.22013 23 8.5C23 11.8412 21.3259 14.6994 19.2285 16.9297C17.1279 19.1634 14.523 20.8565 12.4472 21.8944C12.1657 22.0352 11.8343 22.0352 11.5528 21.8944C9.47698 20.8565 6.8721 19.1634 4.77151 16.9297C2.67415 14.6994 1 11.8412 1 8.5ZM7 4C4.68667 4 3 6.02986 3 8.5C3 11.1445 4.32585 13.5363 6.22849 15.5596C7.9833 17.4256 10.1612 18.9027 12 19.8754C13.8388 18.9027 16.0167 17.4256 17.7715 15.5596C19.6741 13.5363 21 11.1445 21 8.5C21 6.02448 19.3463 4 17 4C15.6874 4 14.907 4.35067 14.3497 4.78592C13.8333 5.18934 13.4736 5.68102 13.045 6.26703C12.9669 6.37374 12.8866 6.48357 12.8026 6.59656C12.6139 6.85039 12.3163 7 12 7C11.6837 7 11.3861 6.85039 11.1974 6.59656C11.1256 6.49997 11.0562 6.4055 10.9884 6.31318C10.5465 5.71179 10.1717 5.20159 9.63856 4.78779C9.07355 4.34922 8.29117 4 7 4Z"
											fill="#838ca3"
										></path>
									</g>
								</svg>
							</div>
						</div>`
		container.appendChild(div)
	})
}

init()

async function appDetail(id) {
	const response = await fetch(
		`https://steam-api-dot-cs-platform-306304.et.r.appspot.com/single-game/${id}`
	)
	const data = await response.json()
	const container = document.querySelector(".home-content-cards")

	container.innerHTML = ""
	const game = data.data
	genre.textContent = `${game.name}`
	if (game.price === 0) {
		game.price = "Free"
	} else {
		game.price = `${game.price}$`
	}
	const div = document.createElement("div")
	div.classList.add("main-game-wrapper")
	div.onclick = function () {
		appDetail(game.appid)
	}
	div.innerHTML = `<img
							src="${game.header_image}"
							alt=""
						/>
						<div class="main-content">
							<h1>${game.name}</h1>
							<h2>${game.price}</h2>
							<h3>Release date: ${game.release_date}</h3>
							<div class="description">
								${game.description}
							</div>
							<p>Good Ratings: ${game.positive_ratings}</p>
							<p>DEVELOPER: ${game.developer}</p>`
	// 	<div class="tag-container">
	// 		<div class="tag">Free To Play</div>
	// 		<div class="tag">Free To Play</div>
	// 		<div class="tag">Free To Play</div>
	// 		<div class="tag">Free To Play</div>
	// 		<div class="tag">Free To Play</div>
	// 		<div class="tag">Free To Play</div>
	// 	</div>
	// </div>`
	container.appendChild(div)
	const main = document.querySelector(".main-content")
	const tagContainer = document.createElement("div")
	tagContainer.classList.add("tag-container")
	console.log(game.steamspy_tags)
	game.steamspy_tags.forEach((tag) => {
		const tagDiv = document.createElement("div")
		tagDiv.classList.add("tag")
		tagDiv.textContent = tag
		tagContainer.appendChild(tagDiv)
	})
	main.appendChild(tagContainer)
}
