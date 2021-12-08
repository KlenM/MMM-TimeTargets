Module.register("MMM-TimeTargets", {
  defaults: {
    url: 'http://127.0.0.1:5500/data.json',
    width: "25vw",
    interval: 60000,
  },
  start: function() {
    this.fetchData();
    setInterval(()=>{
      this.fetchData();
    }, this.config.interval)
  },
  targetsData: {},
  updateData: function(data) {
    this.targetsData = data;
    this.updateDom();
  },
  fetchData: function() {
    fetch(this.config.url)
      .then(response => response.json())
      .then(data => this.updateData(data));
  },
  getDom: function() {
    var element = document.createElement("div")
    element.id = "time-targets";
    element.style.width = this.config.width;

    let percValues = {}
    Object.keys(this.targetsData).forEach(key => {
      percValues[key] = this.targetsData[key]['current'] / this.targetsData[key]['target'];
    });
    let maxValue = Math.max(...Object.values(percValues));
    let scale = maxValue > 1 ? 1 / maxValue : 1;

    Object.keys(percValues).map(key => {
      let isDone = percValues[key] > 1;
      let item = document.createElement("div");
  
      let title = document.createElement("div");
      title.className = "title small bold"
      title.innerText = key;
  
      let bar = document.createElement("div");
      bar.className = "time-bar";
      bar.style.width = scale * percValues[key] * 100 + "%";
      
      if (isDone) {
        title.classList.add('done');
        bar.classList.add('done');
      }

      item.appendChild(title);
      item.appendChild(bar);
      element.appendChild(item);
    });

    let targetLine = document.createElement("div");
    targetLine.className = "target-line"
    targetLine.style.width = scale * 100 + "%";
    element.appendChild(targetLine);
    return element;
  },
  getStyles: function() {
    return [
      'style.css'
    ]
  }
})