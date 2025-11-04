<template>
  <div class="modal-overlay" @click="handleOverlayClick">
    <div class="modal-content">
      <header class="modal-header">
        <h2><slot name="title"></slot></h2>
        <button class="close-btn" @click="closeModal">×</button>
      </header>
      <div class="modal-body">
        <slot name="body"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['close']); // Define 'close' event

const closeModal = () => {
  emit('close'); // Emit the 'close' event when the modal is closed
};

const handleOverlayClick = (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    closeModal(); // Close modal if clicking on the overlay
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content[data-v-0b5a066a] {
  background: rgba(43, 43, 43, 0.71);
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  border: 1px white solid;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #fff;
}
</style>
