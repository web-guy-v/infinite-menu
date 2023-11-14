import gsap from 'gsap'

let tl

export function toggleMenu(params) {

	gsap.set('.burger', {
		pointerEvents: 'none',
		scaleY: 0.8
	})

	if(params) {
		tl = gsap.timeline({
			paused: true,
			onComplete: () => clearStyles(),
			onReverseComplete: () => clearStyles(),
		})

		tl.to(['.burger__line1', '.burger__line2'], {
			rotate: (i) => i ? -20 : 20,
			yPercent: -50,
			y: 0,
			duration: 0.2
		})

		tl.set('.nav__wrap', {
			autoAlpha: 1,
			pointerEvents: 'auto'
		})

		tl.fromTo('.nav__item', {
			opacity: 0
		}, {
			opacity: 1
		})

		tl.fromTo('.nav__wrap', {
			clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
		}, {
			clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
		}, '<')

		const clearStyles = () => {
			gsap.set('.burger', {
				clearProps: 'all'
			})
		}
	}

	params ? tl.play() : tl.reverse()

}