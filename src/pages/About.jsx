import React, {useState, useRef}  from 'react';
import Upload from "../components/ui/upload/Upload";
import { render } from "react-dom";
import { Rnd } from "react-rnd";

function About() {
    const [url, setUrl] = useState();
    const uploadRef = useRef();

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};

    return (
        <div>
            <center>Page About</center>
            <Rnd
                style={style}
                default={{
                  x: 0,
                  y: 0,
                  width: 320,
                  height: 200
                }}
              >
                Rnd
              </Rnd>
            <Upload ref={uploadRef} onUpload={setUrl}>
               <img src={url} alt="" />
            </Upload>
             <button onClick={() => uploadRef.current.upload()}>
               Отправить файл
             </button>
        </div>
    );
}

export default About;