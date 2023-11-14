<script setup>
	import gsap from 'gsap'

	watch(() => general.isNavOpen, (val) => {
		if(val) {
			scrollY -=5000

			setTimeout(() => {
				scrollY += 5000
			}, 250);
		}
	})

	const links = [
		{href: '/', text: 'home'},
		{href: '/', text: 'about us'},
		{href: '/', text: 'projects'},
		{href: '/', text: 'gallery'},
		{href: '/', text: 'contact'},
		{href: '/', text: 'sign in'},
	]

	// REFS
	const navbar = ref()
	const navLink = ref([])
	const isDragging = ref(false)


	// VARS
	let menuHeight,
			itemHeight,
			wrapHeight

	let scrollSpeed = 0,
			oldScrollY = 0,
			scrollY = 0,
			y = 0

	let touchStart = 0,
			touchY = 0


	function getHeight() {
		menuHeight = navbar.value.clientHeight
		itemHeight = navLink.value[0].clientHeight
		wrapHeight = navLink.value.length * itemHeight
	}

	function dispose(scroll) {
		gsap.set(navLink.value, {
			y: (i) => i * itemHeight + scroll,
			modifiers: {
				y: (y) => {
					const s = gsap.utils.wrap(
						-itemHeight,
						wrapHeight - itemHeight,
						parseInt(y)
					)
					return `${s}px`
				}
			}
		})
	}

	function lerp(number0, number1, time) {
		return number0 * (1 - time) + number1 * time
	}

	const render = () => {
		requestAnimationFrame(render)

		y = lerp(y * 0.9, scrollY, 0.05)

		dispose(y)

		scrollSpeed = y - oldScrollY
		oldScrollY = y

		gsap.to(navLink.value, {
			scale: 1 - Math.min(100, Math.abs(scrollSpeed)) * 0.002,
			rotate: scrollSpeed * 0.1
		})

	}

	onMounted(() => {
		getHeight()
		dispose(0)

		window.addEventListener('resize', () => {
			getHeight()
		})

		render()

	})

	const handleMouseWheel = (e) => {
		scrollY -= e.deltaY
	}

	const handleTouchStart = (e) => {
		touchStart = e.clientY || e.touches[0].clientY
		isDragging.value = true
	}

	const handleTouchMove = (e) => {
		if(!isDragging.value) return
		touchY = e.clientY || e.touches[0].clientY
		scrollY += (touchY - touchStart) * 8
		touchStart = touchY
	}

	const handleTouchEnd = () => {
		isDragging.value = false
	}

</script>
<template>


	<nav class="nav__wrap">
		<ul
			class="nav"
			ref="navbar"
			:class="{'is-dragging': isDragging}"
			@mousewheel="handleMouseWheel"
			@touchstart="handleTouchStart"
			@touchmove="handleTouchMove"
			@touchend="handleTouchEnd"
			@mousedown="handleTouchStart"
			@mousemove="handleTouchMove"
			@mouseleave="handleTouchEnd"
			@mouseup="handleTouchEnd"
			@selectstart="() => false"
		>
			<li
				v-for="link in links"
				class="nav__item"
				ref="navLink"
			>
				<nuxt-link
					class="nav__link"
					:to="link.href"
					@dragstart.prevent
				>
					{{ link.text }}
				</nuxt-link>

			</li>
		</ul>
	</nav>


</template>
<style lang='scss' scoped>

.nav__wrap {
	background: #fff;
	position: fixed;
	inset: 0;
	z-index: 5;
	opacity: 0;
	visibility: hidden;
	pointer-events: none;
}

.nav {
	height: 100vh;
	overflow: hidden;
	list-style-type: none;
}

.nav.is-dragging {
	cursor: grab;
}

.nav__link {
	color: inherit;
	text-decoration: none;
	cursor: pointer;
	font-size: 10vw;
	line-height: 1.2;
	text-transform: capitalize;
	display: inline-flex;
}

.nav__item {
	padding: 2vw 0;
	text-align: center;
	position: absolute;
	z-index: 1;
	top: 0;
	left: 0;
	width: 100%;
}


</style>