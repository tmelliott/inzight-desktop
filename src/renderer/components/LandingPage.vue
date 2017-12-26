<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/inzight.png" alt="electron-vue">
    <main>
      <div class="left-side">
        <span class="title">
          Data visualization made easy.
        </span>
        <system-information></system-information>
        <p>For technical support, please contact:</p>
        <p class="center" style="padding: 0.5em 0">
          <a href="mailto:tom.elliott@auckland.ac.nz">
            Tom Elliott &lt;tom.elliott@auckland.ac.nz&gt;
          </a>
        </p>
        <p>Include the above diagnostic information.</p>
      </div>

      <div class="right-side">
        <div class="doc">
          <div class="title">Getting Started</div>
          <p>
            Before you can use the software, you'll need to 
            load a dataset. There are a few ways of doing this:
          </p>
          <ul>
            <li><strong>Drag-and-drop</strong> a file from your computer anywhere into this window.</li>
            <li>Use the <strong>Data</strong> menu and choose 
              <strong>Import Data</strong>.</li>
            <li>Use one of our example data sets by choosing 
              the <strong>Example Data</strong> option from the
              <strong>Data</strong> menu.</li>
          </ul>
          
          <p class="center">
            <button @click="open('https://inzightvit.github.io/inzight-desktop')">Read the Docs</button>
          </p>
        </div>

      </div>
    </main>
    <p class="center">
      <button @click="loadData('iris')">Load Iris Data</button>
    </p>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      loadData (data) {
        console.log(this.$electron.remote.app)
        // this.$router.push('/main')
      }
    }
  }
</script>

<style lang="scss">
  #logo {
    height: auto;
    margin-left: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
    margin-top: 100px;

    div { flex-basis: 50%; }
  }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .center {
    text-align: center;
  }

  .doc {
    p, ul {
      color: black;
      margin-bottom: 10px;
    }
  }
</style>
