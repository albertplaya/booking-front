<template>
  <label for="file-upload" class="custom-file-upload bg-gray-200 rounded-md">
    <q-img
      v-if="imageUrl"
      class="rounded-md"
      :src="imageUrl"
      fit="cover"
      style="max-width: 320px; height: 320px"
    />
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
  height: 320px;
  width: 320px;
  display: inline-block;
  cursor: pointer;
}
</style>
