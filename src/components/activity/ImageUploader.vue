<template>
  <label for="file-upload" class="custom-file-upload rounded-md">
    <div
      class="flex items-center justify-center"
      style="width: 334px; height: 334px"
    >
      <q-img
        v-if="imageUrl"
        class="rounded-md"
        :src="imageUrl"
        fit="cover"
        style="max-width: 334px; height: 334px"
      />
      <q-icon v-else size="8em" name="add" />
    </div>
  </label>
  <input
    id="file-upload"
    type="file"
    ref="file"
    accept="image/*"
    name="activity_photo"
    @change="uploadImageActivity"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useActivity } from '@/use/Activity';

export default defineComponent({
  name: 'ImageUploader',
  emits: ['imageUploaded'],
  setup(props, { emit }) {
    const imageUrl = ref<string>('');
    const { uploadImage } = useActivity();
    const uploadImageActivity = async (event: any): Promise<void> => {
      const activityImageId: string = await uploadImage(event.target.files[0]);
      imageUrl.value =
        'http://localhost:4566/booking/' + activityImageId + '.jpg';
      emit('imageUploaded', activityImageId);
    };
    return {
      uploadImageActivity,
      imageUrl
    };
  }
});
</script>

<style scoped>
input[type='file'] {
  display: none;
}
.custom-file-upload {
  display: inline-block;
  cursor: pointer;
  background-color: #e0e1e2;
}
</style>
