import React  from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import DropFileInput from "../components/ui/dropFileInput/DropFileInput";

function Home() {
    function convertToBase64(file, onSuccess) {
        const reader = new FileReader();
        reader.onload = () => onSuccess(reader.result);
        reader.readAsDataURL(file);
    }

    const onFileChange = (files) => {
        console.log(files);
        convertToBase64(files[0], (base64) => console.log(base64));
    }

    return (
        <div>
            <center>Page Home</center>
            <div className="box">
                <h2 className="header">
                    React drop files input
                </h2>
                <DropFileInput
                    onFileChange={(files) => onFileChange(files)}
                />
            </div>
        </div>
    );
}

export default Home;