import React from "react";
import { useState, useEffect, useRef } from 'react';
import * as mobilenet from "@tensorflow-models/mobilenet";
import '../styles/predictImage.css';
import { DataGrid,Paper,TableBody,TableCell,TableContainer,TableHead,TableRow,Table, Box  } from '@mui/material';


function PredictImage() {
    const [isModelLoading, setIsModelLoading] = useState(false)
    const [model, setModel] = useState(null)
    const [imageURL, setImageURL] = useState(null);
    const [results, setResults] = useState([])

    const imageRef = useRef()
    const textInputRef = useRef()
    const fileInputRef = useRef()

    const loadModel = async () => {
        setIsModelLoading(true)
        try {
            const model = await mobilenet.load()
            setModel(model)
            setIsModelLoading(false)
        } catch (error) {
            console.log(error)
            setIsModelLoading(false)
        }
    }

/**
 * `uploadImage` is a function that takes an event as an argument and sets the imageURL state to the
 * URL of the image that was uploaded
 * @param e - the event object
 */
    const uploadImage = (e) => {
        const { files } = e.target
        if (files.length > 0) {
            const url = URL.createObjectURL(files[0])
            setImageURL(url)
        } else {
            setImageURL(null)
        }
    }

/**
 * We're going to take the image that we've loaded into the `imageRef` and pass it to the
 * `model.classify()` function
 */
    const identify = async () => {
        textInputRef.current.value = ''
        const results = await model.classify(imageRef.current)
        setResults(results)
    }

    const handleOnChange = (e) => {
        setImageURL(e.target.value)
        setResults([])
    }

    const triggerUpload = () => {
        fileInputRef.current.click()
    }

    useEffect(() => {
        loadModel()
    }, [])

    if (isModelLoading) {
        return <h2>Model Loading...</h2>
    }

    /**
     * The function takes a string, splits it into an array of words, and then capitalizes the first
     * letter of each word and returns the string
     * @param str - The string to be converted.
     * @returns The first letter of each word is being capitalized.
     */
    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function(txt){
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }

    return (
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'}}>
          <Paper>
          <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 6 } }>          
            <div class="file-upload">
            <button class="file-upload-btn" onClick={triggerUpload}>Upload Image</button>
            <input class="file-upload-search" type="text" placeholder='Paster image URL' ref={textInputRef} onChange={handleOnChange} />
            <div class="image-upload-wrap">
              <input class="file-upload-input" type='file' onchange={uploadImage} accept="image/*" />
              <div class="drag-text"><h3>Drag and drop a file or select add Image</h3></div>
            </div>
            <div class="file-upload-content">
              <img class="file-upload-image" src="#" alt="your image" />
              <div class="image-title-wrap">
                <input type='file' accept='image/*' capture='camera' className='uploadInput' onChange={uploadImage} ref={fileInputRef} />
              </div>
            </div>
            <div className="mainWrapper">
                <div className="mainContent">
                    <div className="imageHolder">
                    <div class="card-logo">
                        {imageURL && <img height="100%" width="100%" src={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} />}
                        </div>
                    </div>
                    {results.length > 0 && <div className='resultsHolder'>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 550 }} size="small" aria-label="a dense table">
                        <TableHead>
                          <TableRow>
                            <TableCell><h4>Prediction</h4></TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {results.map((result, index) => (
                            <TableRow
                              key={result.className}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">
                                {toTitleCase(result.className)}
                              </TableCell>
                              <TableCell align="right">%{(result.probability * 100).toFixed(1)}</TableCell>
        
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    </div>}
                </div>
            </div>
            {imageURL && <button class="file-upload-btn"  onClick={identify}>Identify Image</button>}
          </div>
          </Box>
        </Paper> 

        </div>
    );
}

export default PredictImage;
