<template>
  <div>
    <div class="lock"></div>
    <div class="message">
      <h2>Access to this page is restricted</h2>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    setTimeout(() => this.$router.push('/'), 3000)
  }
}
</script>
