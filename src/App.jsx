import {useEffect, useRef, useState} from 'react'
import * as ZXing from '@zxing/library'

const videoConstraints = {
  facingMode: 'environment',
}

const log = obj => alert(`${JSON.stringify(obj)}`)

const codeReader = new ZXing.BrowserBarcodeReader()
function App() {
  const [devices, setDevices] = useState([])
  const [result, setResult] = useState(null)
  const [selectedDevice, setSelectedDevice] = useState(null)

  useEffect(() => {
    const init = async () => {
      await navigator.mediaDevices.getUserMedia({video: true})
      codeReader
        .getVideoInputDevices()
        .then(devices => {
          return devices.map(({label, deviceId}) => ({label, value: deviceId}))
        })
        .then(items => {
          setDevices(items)
          setSelectedDevice(items[0]['value'])
        })
    }

    init()
  }, [])

  const onStart = () => {
    codeReader
      .decodeOnceFromVideoDevice(selectedDevice, 'video')
      .then(result => {
        alert(result)
        // setResult(result)
      })
      .catch(err => {
        alert(`error: ${JSON.stringify(err)}`)
      })
  }

  return (
    <div id="app">
      <select
        value={selectedDevice}
        onChange={event => setSelectedDevice(event.target.value)}
      >
        {devices.map(({label, value}) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <button onClick={onStart}>Start</button>

      <div>
        <video
          id="video"
          style={{width: '100vw', height: '300px', border: '1px solid #eee'}}
        ></video>
      {result && <p style={{color: '#fff'}}>{result}</p>}
      </div>

    </div>
  )
}

export default App
