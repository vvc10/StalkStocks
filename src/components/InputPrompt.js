import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
import './styles.css'
import { useRef, useState } from 'react';
import FormField from './Formfield';
import getRandomPrompt from '../utils/index.js'
import { Auth, db, storage } from '../firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth"
import { API_TOKEN } from "../firebase-config";
import { surpriseMePrompts } from '../utils/promptcollection';

function InputPrompt() {

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);
  const [prompt, setPrompt] = useState("")
  const [imageFile, setImageFile] = useState(null);

  const [user] = useAuthState(Auth)
  const postRef = collection(db, "posts")

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });



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

  // const handleDownload = () => {
  //   const link = document.createElement("a");
  //   link.href = output;
  //   link.download = "art.png";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };
  return (

    <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
      <div className='InputPrompt_ar'>


        <label >Describe Prompt  <p onClick={handleSurpriseMe}>Random</p> </label><br />
        <input

          type="text"
          name="input"
          placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
          value={form.prompt}
          handleChange={handleChange}
          className='InputPrompt_ar_textarea' />

        {/* <FormField
                    labelName="Prompt"
                    type="text"
                    name="prompt"
                    placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
                    value={form.prompt}
                    handleChange={handleChange}
                    isSurpriseMe
                    handleSurpriseMe={handleSurpriseMe}
                /> */}

        <label>Style <a href=''>+ more styles</a></label>
        <div className='styles_grid'>
          <button><img src='https://hotpot.ai/images/site/ai/art_maker/style_catalog/hotpot_art_9.jpg' /> <p>Cartoon</p></button>
          <button><img src='https://hotpot.ai/images/site/ai/art_maker/style_catalog/illustration_general_2.jpg' /><p>Vector</p></button>
          <button><img src='https://hotpot.ai/images/site/ai/art_maker/style_catalog/concept_art_7.jpg' /><p>Anime II</p></button>
          <button><img src='https://hotpot.ai/images/site/ai/art_maker/style_catalog/animation_2.jpg' /><p>Illustration</p></button>
          <button><img src='https://hotpot.ai/images/site/ai/art_maker/style_catalog/illustration_art_2.jpg' /> <p>Sketch</p></button>
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
        <label>Negative Prompt</label><br />
        <textarea className='InputPrompt_ar_textarea' placeholder="what not to include?">
        </textarea>
        <div className='more_settings'>
          <label> <a href=''>  + more settings</a></label>

        </div>

      </div>


      <div className='promptsubmit'>
        <button type='button' className='Sketchsubmit_btn'> {loading ? 'Generating...' : 'Sketchit'}  </button>
      </div>
    </form>




  );
}

export default InputPrompt;