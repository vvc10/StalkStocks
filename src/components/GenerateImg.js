import React, { useState } from "react";
// import ShareIcon from '@mui/icons-material/Share';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import { CircularIndeterminate } from "../loadanimation";
import { Auth, db, storage } from '../firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid'; // for creating different character for credentials
import { collection, addDoc } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth"
import { API_TOKEN } from "../firebase-config";
import Loader from "./Loader";
import './main.css'
import catLogo from '../assets/images/catlogo.png';
import getRandomPrompt from "../utils";
import Download from '../assets/images/downloads.png';
import Share from '../assets/images/share.png'

const GenerateImg = () => {
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState(null);
    const [prompt, setPrompt] = useState("")
    const [imageFile, setImageFile] = useState(null);

    const [user] = useAuthState(Auth)
    const postRef = collection(db, "posts")

    const uploadImage = async () => {
        if (imageFile !== null) {
            const imageRef = ref(storage, `images/${imageFile.name + v4()}`)
            uploadBytes(imageRef, imageFile)
                .then(() => {
                    getDownloadURL(imageRef)
                        .then((url) => {
                            if (prompt !== "") {
                                addDoc(postRef, {
                                    prompt: prompt,
                                    image: url,
                                    user: user.displayName,
                                    logo: user.photoURL,
                                })
                                    .then(res => alert("posted"))
                                    .catch(err => console.log(err))
                            }
                        })
                })
                .catch(err => console.log(err))
        }

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const input = event.target.elements.input.value;
        setPrompt(input)
        const response = await fetch(
            "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_TOKEN}`,
                },
                body: JSON.stringify({ inputs: input }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to generate image");
        }

        const blob = await response.blob();
        setOutput(URL.createObjectURL(blob));
        setImageFile(new File([blob], "art.png", { type: "image/png" }));
        setLoading(false);
    };

    const handleDownload = () => {
        const link = document.createElement("a");
        link.href = output;
        link.download = "art.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlesurpise = () => {
        const getpromptinput = document.getElementById("Inputprompt");
        getpromptinput.value = getRandomPrompt();

    }
 
    const OpenMoreSettings = () => {
 
        const gotmoresetting = document.getElementsByClassName("OpenMoreSettings");
        
    }
    return (<div className="imageGen">
        <div className="GI_left">
            {
                !loading && !output && (
                    <div className="before_sketching"><img src={catLogo}/><br/>Your Sketch will appear here..</div>
                )

            }
            {loading && <div className="loading_gen"><Loader/><br/><label>wait, sketching it..</label></div>}
            {!loading && output && (
                <div className="result-image">

                    <img src={output} alt="art" />
                    <div className="action">
                        <button className="download_btn" onClick={handleDownload}><img src={Download}/></button>
                        {user && <button className="share_btn" onClick={uploadImage}><img src={Share}/></button>}
                    </div>
                </div>
            )}
        </div>
        <div className="GI_right_input">
            <form className="generate-form" onSubmit={handleSubmit}>
                <div className="generate-form-div">
                    <label >Describe your Sketch  <p onClick={handlesurpise}>Surprise me ⚡ </p> </label><br />
                    <textarea type="text" id="Inputprompt" name="input" placeholder="type your prompt here..." />

                    {/* <button type="submit" className="button">Generate</button> */}
                    {/* <label>Style <a href=''>+ more styles</a></label>
                    <div className='styles_grid'>
                        <span><img src='https://hotpot.ai/images/site/ai/art_maker/style_catalog/hotpot_art_9.jpg' /> <p>Cartoon</p></span>
                        <span><img src='https://hotpot.ai/images/site/ai/art_maker/style_catalog/illustration_general_2.jpg' /><p>Vector</p></span>
                        <span><img src='https://hotpot.ai/images/site/ai/art_maker/style_catalog/concept_art_7.jpg' /><p>Anime II</p></span>
                        <span><img src='https://hotpot.ai/images/site/ai/art_maker/style_catalog/animation_2.jpg' /><p>Illustration</p></span>
                        <span><img src='https://hotpot.ai/images/site/ai/art_maker/style_catalog/illustration_art_2.jpg' /> <p>Sketch</p></span>
                    </div>

                    <div className='styles_grid_selectsize'>
                        <label>Aspect Ratio <a href=''></a></label>
                        <select>
                            <option> <button className='ratio_11'> <p>Square   1:1</p></button></option>
                            <option>  <button className='ratio_43'><p>Landscape 4:3</p></button></option>
                            <option><button className='ratio_34'><p> Potrait 3:4</p></button></option>
                            <option> <button className='ratio_169'><p>wide  16:9</p></button></option>
                            <option> <button className='ratio_916'><p>Tall  9:16</p></button></option>
                        </select>

                    </div>

                    <div className='styles_grid_selectimgcount'>
                        <label>Image count <a href=''></a></label>
                        <select>
                            <option> <button className='ratio_11'> <p>1 Frame</p></button></option>
                            <option>  <button className='ratio_43'><p>2 Frames</p></button></option>
                            <option><button className='ratio_34'><p> 3 Frames</p></button></option>
                            <option> <button className='ratio_169'><p>4 Frames</p></button></option>
                            <option> <button className='ratio_916'><p>6 Frames</p></button></option>
                        </select>

                    </div>
                    <label style={{marginBottom: "10px"}}>Negative Prompt</label><br />
                    <textarea className='InputPrompt_ar_textarea' placeholder="what not to include?">
                    </textarea> */}
                    <div className='more_settings' onClick={OpenMoreSettings()}>
                        + Show more

                    </div>
                    <div  className="inmoresetting">More settings arriving soon..</div>
                </div>
                <div className='promptsubmit'>
                    <button type='submit' className='Sketchsubmit_btn'> {loading ? 'Sketching...' : 'Sketchit'}  </button>
                </div>

            </form>

        </div>
    </div>
    );

};

export default GenerateImg;