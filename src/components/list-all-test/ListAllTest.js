import { DATA } from '../../constants/data'
import { ROUTES } from '../../constants/routes'
import { Test } from '../../page/test/Test'

import style from './ListAllTest.module.scss'

export class ListAllTest {
	#DATA = DATA
	#Routes = ROUTES

	constructor(element) {
		this.element = element
		this.baseUrl = '/'
	}

	changeLink() {
		const links = document.querySelectorAll(`.${style.item}`)

		for (const elementLink of links) {
			elementLink.addEventListener('click', () => {
				for (const removeActive of links) {
					removeActive.classList.remove(`${style.active}`)
				}
				elementLink.classList.add(`${style.active}`)
			})
		}
	}

	generateUrl(id) {
		return `${this.baseUrl}${id}`
	}

	dynamicURL() {
		this.#DATA.map(item => {
			if (localStorage.getItem(`${item.id}`)) {
				this.#Routes.push({
					path: `${this.baseUrl}${item.id}`,
					id: `${item.id}`,
					name: `${item.name}`,
					isFinished: 'true',
					about: `${item.about}`,
					component: Test
				})
			} else {
				this.#Routes.push({
					path: `${this.baseUrl}${item.id}`,
					id: `${item.id}`,
					name: `${item.name}`,
					isFinished: `${item.isFinished}`,
					about: `${item.about}`,
					component: Test
				})
			}
		})
	}

	render() {
		setTimeout(() => {
			this.changeLink()
		}, 0)

		return this.#DATA
			.map(item => {
				return `<a href="${this.generateUrl(item.id)}">
					<li class="${style.item}">
						<span class=${style.circle}></span>
						${item.name}
					</li>
				</a>`
			})
			.join('')
	}
}
