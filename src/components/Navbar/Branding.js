import React from 'react';
import './Branding.css';
import { Text } from '@happystack/kit';
import { Link } from 'react-router-dom';

const Branding = props => {
  return (
    <div className='branding'>
      <a href={props.url}><img src='./images/logo@2x.png'/></a>
      <Link to='/'><Text element='h1' weight='bold' size='regular'>Auth</Text></Link>
      <Text color='purple'>| <a href={props.url}><Text color='purple'>Repo</Text></a></Text>
    </div>
  );
}

export default Branding;
