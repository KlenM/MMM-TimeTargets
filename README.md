# MMM-TimeTargets
![Main screenshot](screenshot.png)

## Installation
```shell
cd ~/MagicMirror/modules/
git clone https://github.com/NYurin/MMM-TimeTargets
```

## Configuration
### Format
```javascript
{
  module: "MMM-TimeTargets",
  position: "bottom_left",
  config: {
    url: 'http://127.0.0.1:5500/data.json',
    width: "25vw",
    interval: 60000
  }
}
```
