import {useEffect, useRef, useState} from 'react'
import * as ZXing from '@zxing/library'

const videoConstraints = {
  facingMode: 'environment',
}

const log = obj => alert(`${JSON.stringify(obj)}`)

const codeReader = new ZXing.BrowserQRCodeReader()
function App() {
  const [devices, setDevices] = useState([])
  const [selectedDevice, setSelectedDevice] = useState(null)

  useEffect(() => {
    codeReader
      .getVideoInputDevices()
      .then(devices => {
        log(devices)
        return devices.map(({label, deviceId}) => ({label, value: deviceId}))
      })
      .then(items => {
        setDevices(items)
        setSelectedDevice(items[0]['value'])
      })
  }, [])

  const onStart = () => {
    alert(selectedDevice)
    codeReader
      .decodeOnceFromVideoDevice(selectedDevice, 'video')
      .then(result => {
        alert(`result: ${result}`)
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
          width="600"
          height="400"
          style={{border: '1px solid #eee'}}
        ></video>
      </div>
    </div>
  )
}

export default App
