import { QUESTIONS } from '../../constants/questions'
import { Router } from '../../router'

import style from './TestStart.module.scss'

export class TestStart {
	constructor(currentTest) {
		this.questions = QUESTIONS
		this.currentTest = currentTest
		this.currentQuestions = null
	}

	findQuestions() {
		this.currentQuestions = this.questions.find(item => {
			return item.id === this.currentTest.id
		})

		if (this.currentQuestions) {
			this.#renderQuestions()
		} else {
			this.currentTest.isFinished = 'false'
			new Router()
			new Router()
			alert('Вопросов к этому тесту нет')
		}
	}

	#renderQuestions() {
		const text = this.currentQuestions.question
			.map((item, index) => {
				const questionText = item.map((item, indexValue) => {
					return `<input type="radio" name="question__${index + 1}" value="${indexValue}" /><span>${item}</span>`
				})

				return `<h3>${index + 1}. Вопрос</h3><div>${questionText.join('')}</div>`
			})
			.join('')

		document.querySelector('.form').innerHTML = `${text}<button class="${style.done}">Завершить</button>`

		this.#result()
		this.#timer()
	}

	#cancelTest() {
		const button = document.querySelector(`.${style.header__cancel}`)

		if (button) {
			button.addEventListener('click', () => {
				if (confirm('Вы уверены что хотите выйти ?')) {
					this.currentTest.isFinished = 'false'
					new Router()
				}
			})
		}
	}

	#timer() {
		const timer = document.querySelector(`.${style.timer}`)
		let countTimer
		const count = () => {
			let minutes = 4
			let sec = 60
			countTimer = setInterval(() => {
				timer.innerHTML = `00:${minutes}:${--sec}`
				if (minutes === 0 && sec === 0) {
					clearInterval(countTimer)
					this.currentTest.isFinished = 'false'
					new Router()
					alert('Время вышло!!!')
				}
				if (sec === 0) {
					--minutes
					sec = 60
				}
			}, 1000)
		}
		count()
	}

	#result() {
		const allQuestionsDisplay = document.querySelector(`.${style.result}`)
		allQuestionsDisplay.innerHTML = `0/${this.currentQuestions.allQuestion}`

		document.querySelector(`.${style.header__right}`).addEventListener('click', () => {
			const selected = document.querySelectorAll('input:checked')

			for (const element of selected) {
				element.checked = false
			}
		})

		const allInput = document.querySelectorAll('input')
		for (const element of allInput) {
			element.addEventListener('click', () => {
				const selected = document.querySelectorAll('input:checked')

				allQuestionsDisplay.innerHTML = `${selected.length}/${this.currentQuestions.allQuestion}`
			})
		}

		document.querySelector('.form').addEventListener('submit', event => {
			event.preventDefault()
			let allAnswered = true
			const selected = document.querySelectorAll('input:checked')
			const selectedValue = []

			for (const element of selected) {
				selectedValue.push(element.value)
			}

			if (!(selected.length === this.currentQuestions.allQuestion)) {
				allAnswered = false
			}

			if (!allAnswered) {
				alert('Вы не ответили на все вопросы!!!')
			} else {
				this.currentTest.isFinished = 'true'
				localStorage.setItem(this.currentTest.id, selectedValue)
				new Router()
			}
		})
	}

	render() {
		setTimeout(() => {
			this.findQuestions()
			this.#cancelTest()
		}, 0)

		return `
		<header class="${style.header}">
			<p class="${style.header__cancel}">Выход</p>
			<h1>${this.currentTest.name}</h1>
			<div class="${style.header__right}">
				<button class="${style.header__reset}">Сбросить все ответы</button>
				<p class="${style.result}">/</p>
				<p class="${style.timer}">00:5:00</p>
			</div>
		</header>
		<div class="${style.container}">
		<form class="form">
		</form>
		</div>
		
		`
	}
}
