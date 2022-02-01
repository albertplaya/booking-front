<template>
  <q-btn no-caps flat color="primary" @click="openModal">
    <q-icon size="2em" name="ios_share" />
  </q-btn>

  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" :initial-focus="getActiveElement()" @close="closeModal">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-40"
            leave="duration-200 ease-in"
            leave-from="opacity-40"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 opacity-50 bg-black" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <div
              class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <div class="flex justify-between align-baseline">
                <DialogTitle
                  class="text-xl font-medium leading-6 text-gray-900 pt-2"
                >
                  Share your activity!
                </DialogTitle>
                <q-btn no-caps flat color="primary" @click="closeModal">
                  <q-icon size="2em" name="close" />
                </q-btn>
              </div>
              <div class="mt-4 flex justify-around">
                <q-btn no-caps flat rounded dense style="color: #0088cc">
                  <q-icon size="4em" name="facebook" />
                </q-btn>
                <q-btn no-caps flat rounded dense style="color: #25d366">
                  <q-icon size="4em" name="whatsapp" />
                </q-btn>
                <q-btn no-caps flat rounded dense style="color: #0088cc">
                  <q-icon size="4em" name="telegram" />
                </q-btn>
                <q-btn no-caps flat rounded dense color="grey">
                  <q-icon size="4em" name="email" />
                </q-btn>
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { ref } from 'vue';
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle
} from '@headlessui/vue';

export default {
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle
  },

  setup() {
    const isOpen = ref(false);

    return {
      isOpen,
      closeModal() {
        isOpen.value = false;
      },
      openModal() {
        isOpen.value = true;
      },
      getActiveElement() {
        return document.activeElement;
      }
    };
  }
};
</script>
