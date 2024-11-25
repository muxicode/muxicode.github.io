<!-- Mindmap.vue -->
<template>
    <div class="mindmap-container">
      <!-- 添加缩放和刷新控制按钮 -->
      <div class="zoom-controls">
        <button class="zoom-btn" @click="zoomIn" title="放大">
          <span>+</span>
        </button>
        <button class="zoom-btn" @click="zoomOut" title="缩小">
          <span>−</span>
        </button>
        <button class="zoom-btn" @click="resetMindmap" title="重置">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
        </button>
      </div>
      
      <div
        class="mindmap"
        ref="mindmap"
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
        :style="mindmapStyle"
      >
        <template v-if="mindmapDataRef && mindmapDataRef.size > 0">
          <node-component
            node-id="root"
            :mindmap-data="mindmapDataRef"
            @toggle-node="toggleNode"
          />
        </template>
      </div>
    </div>
  </template>
  
  <script>
  const NodeComponent = {
    name: 'node-component',
    props: {
      nodeId: {
        type: String,
        required: true
      },
      mindmapData: {
        type: Map,
        required: true
      }
    },
    methods: {
      getNodeLevel(nodeId, level = 0) {
        if (nodeId === 'root') return level;
        let parentId = null;
        this.mindmapData.forEach((node, id) => {
          if (node.children.includes(nodeId)) {
            parentId = id;
          }
        });
        return parentId ? this.getNodeLevel(parentId, level + 1) : level;
      },
      handleExpand(e) {
        e.stopPropagation();
        this.$emit('toggle-node', this.nodeId);
      }
    },
    render(h) {
      const node = this.mindmapData.get(this.nodeId);
      if (!node) return null;
  
      const hasChildren = node.children && node.children.length > 0;
      const level = this.getNodeLevel(this.nodeId);
      
      const nodeClass = {
        'mindmap-node': true,
        [`mindmap-node-level-${level}`]: true,
        'mindmap-leaf': !hasChildren,
        'mindmap-collapsed': hasChildren && !node.expanded
      };
  
      const expander = hasChildren ? h('span', {
        class: 'mindmap-expander',
        on: {
          click: this.handleExpand
        }
      }) : null;
  
      const childNodes = hasChildren ? h('div', 
        { 
          class: 'mindmap-node-children' 
        },
        node.children.map(childId => h(NodeComponent, {
          key: childId,
          props: {
            nodeId: childId,
            mindmapData: this.mindmapData
          },
          on: {
            'toggle-node': (id) => this.$emit('toggle-node', id)
          }
        }))
      ) : null;
  
      return h('div', {
        class: nodeClass,
        attrs: {
          'data-id': this.nodeId
        }
      }, [
        h('div', { 
          class: 'mindmap-node-content',
        }, [
          node.text,
          expander
        ]),
        childNodes
      ]);
    }
  };
  
  export default {
    name: 'Mindmap',
    components: {
      'node-component': NodeComponent
    },
    props: {
      data: {
        type: Array,
        required: true,
        validator: value => {
          return value.every(item => 
            Array.isArray(item) && 
            item.length === 2 &&
            typeof item[0] === 'string' &&
            typeof item[1] === 'object' &&
            typeof item[1].text === 'string' &&
            Array.isArray(item[1].children)
          );
        }
      }
    },
    data() {
      return {
        mindmapDataRef: null,
        isDragging: false,
        startX: 0,
        startY: 0,
        offsetX: 0,
        offsetY: 0,
        currentX: 0,
        currentY: 0,
        scale: 1,
        minScale: 0.5,
        maxScale: 2,
        scaleStep: 0.1
      };
    },
    computed: {
      mindmapStyle() {
        if (!this.isDragging) {
          return {
            transform: `translate(${this.offsetX}px, ${this.offsetY}px) scale(${this.scale})`,
            transition: 'transform 0.3s ease-out'
          };
        }
        return {
          transform: `translate(${this.offsetX}px, ${this.offsetY}px) scale(${this.scale})`,
          transition: 'none',
          cursor: 'grabbing'
        };
      }
    },
    methods: {
      resetMindmap() {
        // 重置所有状态到初始值
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.isDragging = false;
        this.initializeMindmap();
      },
      zoomIn() {
        const newScale = Math.min(this.scale + this.scaleStep, this.maxScale);
        if (newScale !== this.scale) {
          this.scale = newScale;
        }
      },
      zoomOut() {
        const newScale = Math.max(this.scale - this.scaleStep, this.minScale);
        if (newScale !== this.scale) {
          this.scale = newScale;
        }
      },
      initializeMindmap() {
        const newMap = new Map(
          this.data.map(([id, node]) => [
            id,
            { 
              ...node, 
              expanded: false,
              children: [...node.children]
            }
          ])
        );
        this.mindmapDataRef = newMap;
      },
      toggleNode(nodeId) {
        const node = this.mindmapDataRef.get(nodeId);
        if (node && node.children.length > 0) {
          const newNode = {
            ...node,
            expanded: !node.expanded
          };
          
          const newMap = new Map(this.mindmapDataRef);
          newMap.set(nodeId, newNode);
          
          this.mindmapDataRef = newMap;
        }
      },
      startDrag(event) {
        if (event.button !== 0) return;
        if (event.target.classList.contains('mindmap-expander')) return;
        
        this.isDragging = true;
        this.startX = event.clientX - this.offsetX;
        this.startY = event.clientY - this.offsetY;
        
        event.target.style.cursor = 'grabbing';
      },
      onDrag(event) {
        if (!this.isDragging) return;
        
        event.preventDefault();
        
        this.offsetX = event.clientX - this.startX;
        this.offsetY = event.clientY - this.startY;
      },
      stopDrag(event) {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        event.target.style.cursor = 'grab';
      }
    },
    created() {
      this.initializeMindmap();
    },
    watch: {
      data: {
        handler() {
          this.initializeMindmap();
        },
        deep: true
      }
    }
  };
  </script>
  
  <style>
  .mindmap-container {
    background: white;
    max-width: 90% !important;
    margin: 0 auto !important;
    padding: 2rem 2.5rem;
    min-height: 200px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    font-family: 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
    position: relative;
  }
  
  .zoom-controls {
    position: absolute;
    top: 1rem;
    left: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 100;
  }
  
  .zoom-btn {
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(127, 83, 172, 0.9) 0%, rgba(100, 125, 238, 0.9) 100%);
    color: white;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }
  
  .zoom-btn:hover {
    transform: scale(1.1);
    background: linear-gradient(135deg, rgba(127, 83, 172, 1) 0%, rgba(100, 125, 238, 1) 100%);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .zoom-btn:active {
    transform: scale(0.95);
  }
  
  .zoom-btn span {
    line-height: 1;
    font-weight: bold;
    user-select: none;
  }

  .zoom-btn svg {
    width: 20px;
    height: 20px;
  }
  
  .mindmap {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    user-select: none;
    cursor: grab;
    will-change: transform;
    transform-origin: center center;
    background: white;
  }
  
  .mindmap-node {
    display: flex;
    align-items: center;
    position: relative;
    padding: 2rem 0;
    transform-origin: left center;
  }
  
  .mindmap-node-content {
    color: white !important;
    padding: 0.8rem 1.5rem !important;
    border-radius: 8px !important;
    box-shadow: 0 4px 15px rgba(127, 83, 172, 0.2) !important;
    cursor: pointer;
    position: relative;
    min-width: 120px;
    text-align: center;
    transition: all 0.3s ease;
    z-index: 2;
    transform-origin: center center;
  }
  
  .mindmap-node-content:hover {
    transform: scale(1.02);
    box-shadow: 0 6px 20px rgba(127, 83, 172, 0.3) !important;
  }
  
  .mindmap-node-children {
    display: flex;
    flex-direction: column;
    margin-left: 2rem;
    position: relative;
    transition: all 0.3s ease;
    padding: 1rem 0 1rem 2rem;
  }
  
  .mindmap-node > .mindmap-node-content::before {
    content: '';
    position: absolute;
    right: calc(100% + 1px);
    top: 50%;
    width: 2rem;
    height: 2px;
    background-color: rgba(127, 83, 172, 0.3) !important;
    transform: translateY(-50%);
    z-index: 1;
  }
  
  .mindmap-node-level-0 > .mindmap-node-content::before {
    display: none;
  }
  
  .mindmap-node-children::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: rgba(127, 83, 172, 0.3) !important;
    z-index: 1;
  }
  
  .mindmap-node:first-child::before {
    content: '';
    position: absolute;
    left: -2rem;
    top: -2rem;
    width: 2px;
    height: calc(50% + 2rem);
    background: white;
    z-index: 3;
    transform-origin: top center;
  }
  
  .mindmap-node:last-child::after {
    content: '';
    position: absolute;
    left: -2rem;
    bottom: -2rem;
    width: 2px;
    height: calc(50% + 2rem);
    background: white;
    z-index: 3;
    transform-origin: bottom center;
  }
  
  .mindmap-collapsed > .mindmap-node-children {
    display: none;
  }
  
  .mindmap-expander {
    position: absolute !important;
    right: -1.5rem !important;
    top: 50% !important;
    transform: translateY(-50%) !important;
    width: 24px !important;
    height: 24px !important;
    background: white !important;
    color: #7F53AC !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 50% !important;
    font-size: 20px !important;
    cursor: pointer !important;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1) !important;
    transition: all 0.3s ease !important;
    z-index: 4 !important;
    font-weight: bold !important;
    line-height: 1 !important;
  }
  
  .mindmap-expander:hover {
    background: #f0f0f0 !important;
    transform: translateY(-50%) scale(1.1) !important;
  }
  
  .mindmap-collapsed > .mindmap-node-content .mindmap-expander::before {
    content: '+';
  }
  
  .mindmap-node-content .mindmap-expander::before {
    content: '−';
  }
  
  .mindmap-leaf > .mindmap-node-content .mindmap-expander {
    display: none;
  }
  
  /* 七层渐变配色方案 */
  .mindmap-node-level-0 > .mindmap-node-content {
    background: linear-gradient(135deg, #7F53AC 0%, #647DEE 100%) !important;
  }
  
  .mindmap-node-level-1 > .mindmap-node-content {
    background: linear-gradient(135deg, #647DEE 0%, #7F53AC 100%) !important;
  }
  
  .mindmap-node-level-2 > .mindmap-node-content {
    background: linear-gradient(135deg, #9796f0 0%, #fbc7d4 100%) !important;
  }
  
  .mindmap-node-level-3 > .mindmap-node-content {
    background: linear-gradient(135deg, #B06AB3 0%, #4568DC 100%) !important;
  }
  
  .mindmap-node-level-4 > .mindmap-node-content {
    background: linear-gradient(135deg, #834d9b 0%, #d04ed6 100%) !important;
  }
  
  .mindmap-node-level-5 > .mindmap-node-content {
    background: linear-gradient(135deg, #4568DC 0%, #B06AB3 100%) !important;
  }
  
  .mindmap-node-level-6 > .mindmap-node-content {
    background: linear-gradient(135deg, #6a3093 0%, #a044ff 100%) !important;
  }
  
  .mindmap-node-level-7 > .mindmap-node-content {
    background: linear-gradient(135deg, #a044ff 0%, #6a3093 100%) !important;
  }
  </style>