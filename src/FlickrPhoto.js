import React from 'react';
import { observer } from 'mobx-react'

const FlickrPhoto = ({ src, title, media, description, tags, author }) =>
  <div className='flickr-photo' style={{ backgroundImage: `url(${src})` }}>
    <div className='title-box'>
      {title}
    </div>
  </div>

{
/* 
  NB: description, author and tags have been omitted as the search API does not return any of these.
  - see notes in readme
  
<i>by {author}</i>
<p dangerouslySetInnerHTML={{ __html: description }} ></p>
<h2>Tags:</h2>
{tags} 

*/
}

export default observer(FlickrPhoto)