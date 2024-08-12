import style from './Home.module.scss'

export class Home {
	render() {
		return `
				<h1 class=${style.title}>Выберете текст из списка</h1>
		`
	}
}
