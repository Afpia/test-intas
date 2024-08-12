import { ListAllTest } from './components/list-all-test/ListAllTest'
import { Layout } from './components/layout/Layout'
import { ROUTES } from './constants/routes'
import { NotFound } from './page/not-found/NotFound'

export class Router {
	#routes = ROUTES
	#currentRoute = null
	#layout = null

	constructor(once, nav) {
		if (once) {
			window.addEventListener('popstate', () => {
				this.#handleRouteChange()
			})
			this.#dynamicURL()
			this.#handleClick()
			this.#handleRouteChange()
		} else if (nav) {
			this.navigate(nav)
		} else {
			this.#handleRouteChange()
		}
	}

	getCurrentPath() {
		return window.location.pathname
	}

	#dynamicURL() {
		new ListAllTest().dynamicURL()
	}

	#handleClick() {
		document.addEventListener('click', event => {
			const target = event.target.closest('a')

			if (target) {
				event.preventDefault()
				this.navigate(target.href)
			}
		})
	}

	navigate(path) {
		if (path !== this.getCurrentPath()) {
			window.history.pushState({}, '', path)
			this.#handleRouteChange()
		}
	}

	#handleRouteChange() {
		const path = this.getCurrentPath() || '/'
		let route = this.#routes.find(route => route.path === path)

		if (!route) {
			route = {
				component: NotFound
			}
		}
		this.#currentRoute = route
		this.render()
	}

	render() {
		const component = new this.#currentRoute.component()
		if (!this.#layout) {
			this.#layout = new Layout({
				router: this,
				children: component.render()
			})
			document.getElementById('app').innerHTML = this.#layout.render()
		} else {
			document.querySelector('main').innerHTML = component.render()
		}
	}
}
