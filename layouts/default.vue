<script setup>
</script>
<template>

	<div id="viewport">
		<TheBurger />
		<TheNav />

		<slot />
	</div>

</template>
<style lang='scss'>
@font-face {
  font-family: 'RF Dewi';
  src: url('/fonts/Grotesk-Medium.woff2') format('woff2');
}

*, *:after, *:before {
	box-sizing: border-box;
	outline: none;
	margin: 0;
	padding: 0;
	user-select: none;
}

body {
	height: 100vh;
	overflow: hidden;
	background: #000000;
	font-family: 'RF Dewi';
	color: #222;
}



</style>