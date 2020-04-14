<template>
  <student-detail :is-edit="true" />
</template>

<script>
  import StudentDetail from "@/views/graduateinformation/components/StudentDetail";

  export default {
    name: "edit-student",
    components: {
      StudentDetail
    }
  }
</script>

<style scoped>

</style>
