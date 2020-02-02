import React from 'react';
import { observer } from 'mobx-react'

const Tag = ({ tag, selectTag }) => <><a className='tag' onClick={() => selectTag(tag)} key={tag} href='javascript:'>{tag}</a> </>

const TagList = ({ tags, selectTag }) =>
  <div className='tags'>{tags.split(' ').map(t => <Tag selectTag={selectTag} key={t} tag={t}></Tag>)}</div>

const FlickrPhoto = ({ id, selectTag, src, title, description, tags, owner, ownername }) =>
  <div className='flickr-photo'>
    <div className='flickr-image' style={{ backgroundImage: `url(${src})` }}></div>
    <div className='title-box'>
      <a className="title" target='flickr-photo' href={`https://www.flickr.com/photos/${owner}/${id}`}>{title || 'Untitled'}</a>
      <br /><span className="by">by</span><br />
      <a target='flickr-profile' href={`https://www.flickr.com/people/${owner}/`}>{ownername}</a>

      <p className="description">{description._content}</p>
      <TagList selectTag={selectTag} tags={tags}></TagList>

    </div>
  </div>
export default observer(FlickrPhoto)