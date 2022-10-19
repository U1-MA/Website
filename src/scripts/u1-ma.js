;(function () {
	if (window.customElements === undefined) {
		return
	}

	class U1_MA extends HTMLElement {
		constructor() {
			super()

			this.blur = 100
			this.scale = 1

			this.shadow = this.attachShadow({ mode: 'open' })
			this.shadow.appendChild(this.template.content.cloneNode(true))
		}

		connectedCallback() {
			this.cancellable = [
				setInterval(this.setScale.bind(this), 3000),
				setInterval(this.setColors.bind(this), 5000),
			]
		}

		disconnectedCallback() {
			this.cancellable.forEach(clearInterval)
		}

		get colors() {
			return [
				'#FECF0F', // yellow
				'#30D33B', // green
				'#56E2DB', // mint
				'#4CBCF2', // cyan
				'#4B40E0', // indigo
				'#106BFF', // blue
				'#9B7C55', // brown
				'#FD8D0E', // orange
				'#AF39EE', // purple
				'#FC2B2D', // red
				'#FC1A4D', // pink
				'black', // black
				'white', // white
			]
		}

		get randomColor() {
			return this.colors[Math.floor(Math.random() * this.colors.length)]
		}

		setColors() {
			let rects = [...this.shadow.querySelectorAll('.preview__screen > div')]
			rects.forEach((rect) => {
				rect.style.backgroundColor = this.randomColor
			})
		}

		setScale() {
			this.blur = this.blur === 100 ? 60 : 100
			this.scale = this.scale == 1 ? 0.75 : 1

			let screen = this.shadow.querySelector('.preview__screen')
			screen.style.transform = `scale(${this.scale}) saturate(180px)`
			screen.style.filter = `blur(${this.blur}px)`
		}

		isSupportsWebP() {
			var elem = document.createElement('canvas')

			if (!!(elem.getContext && elem.getContext('2d'))) {
				return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0
			} else {
				return false
			}
		}

		get template() {
			let template = document.createElement('template')
			let isSupportsWebp = this.isSupportsWebP()
			template.className = 'preview__template'
			template.innerHTML = `
				<style>
					.preview__wrapper {
						position: relative;
						width: 100%;
						height: 100%;

						-webkit-mask-image: url(/images/iphone-screen.${isSupportsWebp ? 'webp' : 'png'});
						-webkit-mask-size: 100% 100%;
						-webkit-mask-mode: alpha;
						-webkit-mask-repeat: no-repeat;
						mask-image: url(/images/iphone-screen.${isSupportsWebp ? 'webp' : 'png'});
						mask-size: 100% 100%;
						mask-mode: alpha;
						mask-repeat: no-repeat;

						background-color: whitesmoke;
					}

					.preview__wrapper::before {
						float: left;
						padding-top: 192.9%;
						content: ""
					}

					.preview__wrapper::after {
						display: block;
						content: "";
						clear: both
					}

					.preview__screen {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;

						width: 100%;
						height: 100%;

						transform: scale(1) saturate(180px);
						filter: blur(100px);

						-webkit-transition: all 5s ease-in-out;
						transition: all 5s ease-in-out;
					}

					.preview__rectangle1 {
						width: 100%;
						height: 100%;

						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);

						background-color: transparent;
						-webkit-transition: background-color 5s ease-in-out;
						transition: background-color 5s ease-in-out;
					}

					.preview__rectangle2 {
						width: calc(100% / 1.5);
						height: calc(100% / 1.15);

						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);

						background-color: transparent;
						-webkit-transition: background-color 5s ease-in-out;
						transition: background-color 5s ease-in-out;
					}

					.preview__rectangle3 {
						width: calc(100% / 3);
						height: calc(100% / 2.2);

						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);

						background-color: transparent;
						-webkit-transition: background-color 5s ease-in-out;
						transition: background-color 5s ease-in-out;
					}

					.preview__phone {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;

						width: 100%;
						height: 100%;

						display: block;
						z-index: 1;
					}
				</style>
				<div class="preview__wrapper">
					<picture>
						<source srcset="/images/iphone.webp" type="image/webp" />
						<img draggable="false" class="preview__phone" src="/images/iphone.png" width="100%" />
					</picture>
					<div class="preview__screen">
						<div class="preview__rectangle1"></div>
						<div class="preview__rectangle2"></div>
						<div class="preview__rectangle3"></div>
					</div>
				</div>
			`
			return template
		}
	}

	customElements.define('u1-ma', U1_MA)
})()
