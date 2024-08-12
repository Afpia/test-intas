import { TestFinished } from '../../components/test-finished/TestFinished'
import { TestStart } from '../../components/test-start/TestStart'
import { ROUTES } from '../../constants/routes'
import { Router } from '../../router'

import style from './Test.module.scss'

export class Test {
	#Routes = ROUTES

	constructor() {
		this.currentTest = null
		this.findTest()
	}

	findTest() {
		this.currentTest = this.#Routes.find(item => item.path === window.location.pathname)
	}

	#cancelHome() {
		const buttonCancel = document.querySelector(`.${style.cancel}`)
		if (buttonCancel) {
			buttonCancel.addEventListener('click', () => {
				new Router(0, '/')
			})
		}
	}

	#startTest() {
		const buttonStart = document.querySelector(`.${style.start}`)

		if (buttonStart) {
			buttonStart.addEventListener('click', () => {
				this.currentTest.isFinished = 'pending'
				new Router()
			})
		}
	}

	render() {
		setTimeout(() => {
			this.#startTest()
			this.#cancelHome()
		}, 0)

		if (this.currentTest.isFinished === 'false') {
			return `<header class="${style.header}"><h2>Описание</h2></header>
				<div class="${style.container}">
				<p class="${style.about}">${this.currentTest.about}<p>
				<button class="${style.start}">Начать</button>
				<button class="${style.cancel}">Отмена</button></div>
				`
		} else if (this.currentTest.isFinished === 'pending') {
			return new TestStart(this.currentTest).render()
		} else {
			return new TestFinished(this.currentTest).render()
		}
	}
}
