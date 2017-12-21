<template>
  <div>
    <div class="title">Information</div>
    <div class="items">
      <div class="item">
        <div class="name">iNZight Desktop:</div>
        <div class="value">{{ inzight }}</div>
      </div>
      <div class="item">
        <div class="name">R:</div>
        <div class="value">{{ rapp }}</div>
      </div>
      <div class="item">
        <div class="name">Platform:</div>
        <div class="value">{{ platform }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  var remote = require('electron').remote

  export default {
    data () {
      const os = require('os')
      var platform = os.platform()
      var release = os.release()

      switch (platform) {
        case 'win32':
          platform = 'Windows'
          break
        case 'darwin':
          platform = 'macOS'
          break
      }

      return {
        inzight: remote.app.getVersion(),
        rapp: remote.getGlobal('Rversion'),
        platform: platform + ' ' + release
      }
    }
  }
</script>

<style scoped>
  .title {
    color: #888;
    font-size: 18px;
    font-weight: initial;
    letter-spacing: .25px;
    margin-top: 10px;
  }

  .items { margin-top: 8px; }

  .item {
    display: flex;
    margin-bottom: 6px;
  }

  .item .name {
    color: #6a6a6a;
    margin-right: 6px;
  }

  .item .value {
    color: #35495e;
    font-weight: bold;
  }
</style>
