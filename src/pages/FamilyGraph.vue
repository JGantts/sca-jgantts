<script setup lang="ts">
import { Nodes, Edges, Layouts } from 'v-network-graph'
import * as vNG from 'v-network-graph'
import { ref } from 'vue'

const nodeSize = 40

const configs = vNG.defineConfigs({
  view: {
    autoPanAndZoomOnLoad: 'fit-content',
    zoomEnabled: false,
  },
  node: {
    normal: { radius: nodeSize / 2 },
    label: { direction: 'center', color: '#fff' },
  },
  edge: {
    normal: {
      color: '#aaa',
      width: 3,
    },
    margin: 4,
    marker: {
      target: {
        type: 'none',
        width: 4,
        height: 4,
      },
    },
  },
  path: {
    visible: true,
    normal: {
      width: 10,
      color: (p: { color: unknown; }) => p.color,
    },
  },
})

const graph = ref<vNG.VNetworkGraphInstance>()

const nodes: Nodes = {
  node1: { name: 'Node 1' },
  node2: { name: 'Node 2' },
  node4: { name: 'Node 4' },
  node5: { name: 'Node 5' },
  node6: { name: 'Node 6' },
  node7: { name: 'Node 7' },
  node8: { name: 'Node 8' },
  node9: { name: 'Node 9' },
  node10: { name: 'Node 10' },
}

const edges: Edges = {
  edge1: { source: 'node1', target: 'node2' },
  edge3: { source: 'node2', target: 'node4' },
  edge4: { source: 'node2', target: 'node4' },
  edge5: { source: 'node4', target: 'node5' },
  edge6: { source: 'node4', target: 'node6' },
  edge7: { source: 'node5', target: 'node7' },
  edge8: { source: 'node5', target: 'node8' },
  edge9: { source: 'node6', target: 'node9' },
  edge10: { source: 'node6', target: 'node10' },
}

const layouts: Layouts = {
  nodes: {
    node1: { x: 0, y: 0 },
    node2: { x: 100, y: 60 },
    node4: { x: 250, y: 60 },
    node5: { x: 350, y: 10 },
    node6: { x: 350, y: 110 },
    node7: { x: 450, y: 10 },
    node8: { x: 450, y: 60 },
    node9: { x: 450, y: 110 },
    node10: { x: 450, y: 160 },
  },
}

const paths: vNG.Paths = {
  path1: {
    edges: ['edge1', 'edge3', 'edge5', 'edge7'],
    color: '#ff00ff66', // #rrggbbaa <- with alpha
  },
  path2: {
    edges: ['edge4', 'edge6', 'edge10'],
    color: '#00aa0066', // #rrggbbaa <- with alpha
  },
}

</script>

<template>
  <div style="display: grid;">
    <v-network-graph
      class="graph"
      :nodes="nodes"
      :edges="edges"
      :layouts="layouts"
      :paths="paths"
      :configs="configs"
    />
  </div>
</template>

<style>
.graph {
  width: 600px;
  height: 400px;
  border: 1px solid #000;
}
</style>
