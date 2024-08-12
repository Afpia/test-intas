import { Test } from '../../page/test/Test'
import { ListAllTest } from '../list-all-test/ListAllTest'
import style from './Layout.module.scss'

export class Layout extends Test {
	constructor({ router, children }) {
		super()
		this.router = router
		this.children = children
		this.list = new ListAllTest(`${style.list}`).render()
	}

	openSideBar() {
		const burger = document.querySelector(`.${style.burger}`)
		const sidebar = document.querySelector(`.${style.sidebar}`)

		if (this.currentTest?.isFinished === 'pending') {
			burger.removeEventListener('click', () => {
				sidebar.classList.toggle(`${style.close}`)
			})
		} else {
			burger.addEventListener('click', () => {
				sidebar.classList.toggle(`${style.close}`)
			})
		}
	}

	render() {
		setTimeout(() => {
			this.openSideBar()
		}, 0)

		return `
		<nav class="${style.sidebar} ${style.close}">
			<header class="${style.header}">
				<div class="${style.burger}">
					<span></span>
					<span></span>
					<span></span>
				</div>
				<h1>Тесты</h1>
			</header>
			<ul class="${style.list}">${this.list}</ul>
		</nav>
		<main class="${style.main}">
			${this.children}
		</main>
		`
	}
}
