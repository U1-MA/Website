document.addEventListener(
	'DOMContentLoaded',
	function () {
		let style = {
			transform: {
				initial: 'scale(0.98)',
				intersecting: 'scale(1.0)',
			},
			opacity: {
				initial: '0.5',
				intersecting: '1',
			},
			transition: 'transform 0.35s ease-in-out, opacity 0.35s ease-in-out',
			willChange:  'transform, opacity'
		}

		let observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				let feature = entry.target

				if (entry.isIntersecting) {
					feature.style.opacity = style.opacity.intersecting
					feature.style.transform = style.transform.intersecting
				} else {
					feature.style.opacity = style.opacity.initial
					feature.style.transform = style.transform.initial
				}
			})
		})

		function isInViewport(element) {
			const rect = element.getBoundingClientRect()
			return (
				rect.top >= 0 &&
				rect.left >= 0 &&
				rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
				rect.right <= (window.innerWidth || document.documentElement.clientWidth)
			)
		}

		Array.from(document.getElementsByClassName('scroll-animation')).forEach((feature) => {
			if (!isInViewport(feature)) {
				feature.style.opacity = style.opacity.initial
				feature.style.transform = style.transform.initial
			}

			feature.style.transition = style.transition
			feature.style.willChange = style.willChange
			observer.observe(feature)
		})
	},
	false
)
