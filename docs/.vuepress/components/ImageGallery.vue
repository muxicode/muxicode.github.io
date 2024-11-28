<!-- ImageGallery.vue -->
<template>
    <div class="gallery-container">
      <div class="image-grid">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="image-item"
          @click="openModal(index)"
        >
          <img 
            :src="image" 
            :alt="`Image ${index + 1}`" 
            loading="lazy"
            class="nozoom"
          />
        </div>
      </div>
  
      <div v-if="isModalOpen" 
           class="gallery-modal" 
           :class="{ 'modal-closing': isClosing }"
           @click="handleModalClick"
           role="dialog"
           aria-modal="true">
        <div class="modal-controls">
          <button class="gallery-btn prev-btn" 
                  @click.stop="prevImage" 
                  aria-label="Previous image"
                  :disabled="isClosing">
            <span>‹</span>
          </button>
          <button class="gallery-btn next-btn" 
                  @click.stop="nextImage" 
                  aria-label="Next image"
                  :disabled="isClosing">
            <span>›</span>
          </button>
          <button class="gallery-btn zoom-in-btn" 
                  @click.stop="zoomIn" 
                  aria-label="Zoom in"
                  :disabled="isClosing">
            <span>+</span>
          </button>
          <button class="gallery-btn zoom-out-btn" 
                  @click.stop="zoomOut" 
                  aria-label="Zoom out"
                  :disabled="isClosing">
            <span>−</span>
          </button>
          <button class="gallery-btn close-btn" 
                  @click.stop="startCloseModal" 
                  aria-label="Close gallery"
                  :disabled="isClosing">
            <span>×</span>
          </button>
        </div>
        <div class="modal-content" 
             :style="modalContentStyle" 
             :class="{ 'closing': isClosing }">
          <img
            :src="currentImage"
            :alt="`Image ${currentIndex + 1}`"
            :style="imageStyle"
            class="nozoom"
            @mousedown="startDrag"
            @mousemove="onDrag"
            @mouseup="stopDrag"
            @mouseleave="stopDrag"
          />
        </div>
      </div>
    </div>
</template>
  
<script>
export default {
  name: 'ImageGallery',
  props: {
    images: {
      type: Array,
      required: true,
      validator: value => value.every(item => typeof item === 'string')
    }
  },
  data() {
    return {
      isModalOpen: false,
      isClosing: false,
      currentIndex: 0,
      scale: 1,
      minScale: 0.5,
      maxScale: 3,
      scaleStep: 0.2,
      isDragging: false,
      translateX: 0,
      translateY: 0,
      dragStartX: 0,
      dragStartY: 0
    }
  },
  computed: {
    currentImage() {
      return this.images[this.currentIndex]
    },
    modalContentStyle() {
      return {
        cursor: this.isDragging ? 'grabbing' : 'grab'
      }
    },
    imageStyle() {
      if (this.isClosing) {
        return {
          transform: 'scale(1)',
          transition: 'transform 0.3s ease-out'
        }
      }
      return {
        transform: `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`,
        transition: this.isDragging ? 'none' : 'transform 0.3s ease-out'
      }
    }
  },
  methods: {
    handleModalClick(event) {
      if (event.target.classList.contains('gallery-modal') && !this.isClosing) {
        this.startCloseModal()
      }
    },
    startCloseModal() {
      if (this.isDragging || this.isClosing) return
      
      this.isClosing = true
      this.scale = 1
      this.translateX = 0
      this.translateY = 0
      
      setTimeout(() => {
        this.isModalOpen = false
        this.isClosing = false
        document.body.style.overflow = ''
        this.isDragging = false
        document.removeEventListener('keydown', this.handleKeydown)
      }, 300)
    },
    openModal(index) {
      if (this.isClosing) return
      
      if (window.mediumZoom) {
        const zoom = window.mediumZoom('.medium-zoom-image')
        zoom.close()
      }
      
      this.currentIndex = index
      this.isModalOpen = true
      this.isClosing = false
      document.body.style.overflow = 'hidden'
      this.scale = 1
      this.translateX = 0
      this.translateY = 0
      this.isDragging = false
      
      this.$nextTick(() => {
        document.addEventListener('keydown', this.handleKeydown)
      })
    },
    prevImage() {
      if (this.isClosing) return
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length
      this.scale = 1
      this.translateX = 0
      this.translateY = 0
    },
    nextImage() {
      if (this.isClosing) return
      this.currentIndex = (this.currentIndex + 1) % this.images.length
      this.scale = 1
      this.translateX = 0
      this.translateY = 0
    },
    zoomIn() {
      if (this.isClosing) return
      this.scale = Math.min(this.scale + this.scaleStep, this.maxScale)
    },
    zoomOut() {
      if (this.isClosing) return
      this.scale = Math.max(this.scale - this.scaleStep, this.minScale)
    },
    startDrag(event) {
      if (event.button !== 0 || this.isClosing) return
      this.isDragging = true
      this.dragStartX = event.clientX - this.translateX
      this.dragStartY = event.clientY - this.translateY
    },
    onDrag(event) {
      if (!this.isDragging || this.isClosing) return
      event.preventDefault()
      this.translateX = event.clientX - this.dragStartX
      this.translateY = event.clientY - this.dragStartY
    },
    stopDrag() {
      this.isDragging = false
    },
    handleKeydown(event) {
      if (this.isClosing) return
      
      switch (event.key) {
        case 'ArrowLeft':
          this.prevImage()
          break
        case 'ArrowRight':
          this.nextImage()
          break
        case 'Escape':
          this.startCloseModal()
          break
        case '+':
          this.zoomIn()
          break
        case '-':
          this.zoomOut()
          break
      }
    }
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.handleKeydown)
    document.body.style.overflow = ''
  }
}
</script>
  
<style>
.gallery-container {
  width: 100%;
  max-width: 90% !important;
  margin: 0 auto !important;
  padding: 1rem;
  background: white;
  font-family: 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  justify-content: center;
}

.image-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(127, 83, 172, 0.2);
  background: linear-gradient(135deg, rgba(127, 83, 172, 0.1) 0%, rgba(100, 125, 238, 0.1) 100%);
  padding: 0.5rem;
}

.image-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(127, 83, 172, 0.3);
}

.image-item img {
  width: 100%;
  height: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
  display: block;
}

.image-item:hover img {
  transform: scale(1.05);
}

@media (max-width: 1024px) {
  .image-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .image-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .gallery-container {
    padding: 0.5rem;
  }
}

.gallery-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 100000;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: opacity 0.3s ease-out;
}

.gallery-modal.modal-closing {
  opacity: 0;
  pointer-events: none;
}

.modal-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content.closing {
  pointer-events: none;
}

.modal-content img {
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
  user-select: none;
}

.modal-controls {
  position: fixed;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 100001;
}

.gallery-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(127, 83, 172, 0.9) 0%, rgba(100, 125, 238, 0.9) 100%);
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.gallery-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.gallery-btn:hover:not(:disabled) {
  transform: scale(1.1);
  background: linear-gradient(135deg, rgba(127, 83, 172, 1) 0%, rgba(100, 125, 238, 1) 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.gallery-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.prev-btn, .next-btn {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
}

.prev-btn {
  left: 1rem;
}

.next-btn {
  right: 1rem;
}

.gallery-btn span {
  line-height: 1;
  user-select: none;
}

@media (max-width: 768px) {
  .prev-btn, .next-btn {
    width: 36px;
    height: 36px;
    font-size: 20px;
  }
  
  .modal-controls {
    top: auto;
    bottom: 1rem;
    right: 50%;
    transform: translateX(50%);
  }
}
</style>