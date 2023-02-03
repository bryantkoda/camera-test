import { useEffect, useRef, useState } from 'react'
import Webcam from "react-webcam";
import { BrowserQRCodeReader } from '@zxing/browser';


const videoConstraints = {
  facingMode: "environment"
};

  const codeReader = new BrowserQRCodeReader();
function App() {
  const [image, setImage] = useState(() => localStorage.getItem('barcode'))
  const [result, setResult] = useState(null)
  const imgRef = useRef(null)


  const onReset = () => {

  }

  const onScan = async (getScreenshot) => {
    setImage(getScreenshot())

javascriptBarcodeReader({
  /* Image file Path || {data: Uint8ClampedArray, width, height} || HTML5 Canvas ImageData */
  image: document.querySelector('#img'),
  barcode: 'ean-13',
  // barcodeType: 'industrial',
  options: {    
    // useAdaptiveThreshold: true // for images with sahded portions
    // singlePass: true
  }
})
  .then(code => {
    alert(`success ${code}`)
    console.log(code)
  })
  .catch(err => {
    alert(`failed ${JSON.stringify(err)}`)
    console.log(err)
  })
    // const el = document.querySelector('#img')
    // const code = await codeReader.decodeFromImageElement(el)
    // console.log(code)
  }

  return (
    <div id="app">
      <Webcam
        audio={false}
        height={500}
        screenshotFormat="image/jpeg"
        width="100%"
        videoConstraints={videoConstraints}
      >
        {({ getScreenshot }) => (
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px auto'}}>

          <button onClick={() => onScan(getScreenshot)} >
            Capture photo
          </button>
          <button onClick={onReset}>Reset</button>
          </div>
        )}
      </Webcam>   
    {image && 

      <img id="img" src={image} alt="" />
    }
    </div>
  );}

export default App
