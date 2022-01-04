<template>
    <div class="message errorDiv">
      <h2>Access to this page is restricted</h2>
    </div>
</template>
<script>
export default {
  created() {
    setTimeout(() => this.$router.push('/'), 3000)
  }
}
</script>
