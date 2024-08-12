import { QUESTIONS } from '../../constants/questions'
import { Router } from '../../router'

import style from './TestFinished.module.scss'

export class TestFinished {
	constructor(currentTest) {
		this.currentTest = currentTest
		this.questions = QUESTIONS

		this.currentQuestions = this.currentQuestions()
		this.currentAnswers = this.currentAnswers()
		this.correctAnswers = this.correctAnswers()
	}

	currentQuestions() {
		return this.questions.find(item => {
			return item.id === this.currentTest.id
		})
	}

	currentAnswers() {
		return localStorage.getItem(`${this.currentTest.id}`).split(',')
	}

	correctAnswers() {
		const numberArrayCurrentAnswers = this.currentAnswers.map(Number)
		return numberArrayCurrentAnswers
			.map((value, index) => (value === this.currentQuestions.answers[index] ? value : null))
			.filter(value => value !== null)
	}

	renderAnswers() {
		const text = []
		for (let index = 0; index < this.currentQuestions.allQuestion; index++) {
			text.push(`<h4>${index + 1}. Вопрос </h4>
				<p>Правильный ответ: ${this.currentQuestions.answers[index]}
				<p>Ваш ответ: ${this.currentAnswers[index]}</p>
				<hr>`)
		}

		document.querySelector(`.${style.container}`).innerHTML = `${text.join('')} <button class="${
			style.button
		}">Пройти ещё раз</button>`
	}

	repeatTest() {
		document.querySelector(`.${style.button}`).addEventListener('click', () => {
			localStorage.removeItem(this.currentTest.id)
			this.currentTest.isFinished = 'false'

			new Router()
		})
	}

	render() {
		setTimeout(() => {
			this.renderAnswers()
			this.repeatTest()
		}, 0)

		return `<header class="${style.header}"><h2>${this.currentTest.name}</h2></header>
		<h1 class="${style.title}">Результаты</h1>
		<h3 class="${style.answer}"> Вы ответили на ${this.correctAnswers.length} из ${this.currentQuestions.allQuestion}</h3>
		<p class="${style.subtitle}">Ваши ответы</p>
		<div class="${style.container}"></div>
		
		`
	}
}
