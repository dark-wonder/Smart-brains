import React from 'react';
import 'tachyons';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return (
		<div>
            <p className='f3'>{'This magic face will detect faces'}
            </p>
            <div className='center' >
                <div className='form center pa4 br3 shadow-5 grow'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit} >Detect</button>
                </div>
            </div>
        </div>
		);
}

export default ImageLinkForm;