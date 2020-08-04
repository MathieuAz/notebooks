# Demo w/ chart

``` js
const today = new Date().toISOString().slice(0,10)
const data = await fetch(`https://api.exchangerate.host/timeseries?start_date=2020-01-01&end_date=${today}&base=USD`)

var jsonData = await data.json()
jsonData
```

``` js
await import('https://unpkg.com/chart.js@2.9.3/dist/Chart.bundle.min.js')

const canvas = document.createElement('canvas')
const currencyChart = new Chart(canvas.getContext('2d'),
    {
        type: 'line',
        data: {
            labels: Object.keys(jsonData.rates),
            datasets: [{
                label: 'USD - EUR',
                data: Object.values(jsonData.rates).map(({EUR}) => EUR),
                borderColor: '#5558FF',
                backgroundColor: '#5558FF80',
            }],
        },
    }
)

canvas
```