<template>
  <student-detail :is-edit="true" />
</template>

<script>
  import StudentDetail from "@/views/graduateinformation/components/StudentDetail";

  // 编辑学生
  export default {
    name: "edit-student",
    components: {
      StudentDetail
    }
  }
</script>

<style scoped>

</style>
