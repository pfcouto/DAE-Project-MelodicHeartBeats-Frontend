<script>
import {Pie} from 'vue-chartjs'

export default {
  extends: Pie,
  props: {data: {type: Object, default: null}, options: {type: Object, default: null}}, watch: {
    data(to, from) {
      this.renderChart(this.data, this.options)
    }
  },
  mounted() {
    this.renderChart(this.data, this.options)
  }
}
</script>

