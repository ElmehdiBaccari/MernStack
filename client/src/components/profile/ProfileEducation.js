import React from 'react';
import Moment from 'react-moment';


const ProfileEducation = ({
    education : {school , degree , fieldofstudy , to , from , description} ,
}) => {
    return (
      <div>
          <h3 className='text-dark' > {school} </h3>
          <p>
            {' '}
            <Moment format='DD/MM/YYYY'></Moment> -{' '}
            {!to ? 'Now' : <Moment  format='DD/MM/YYYY'>{to}</Moment> }
          </p>
          <b> Degree :  </b> {degree}
          <p>
             <stong>Field of study : </stong> {fieldofstudy}
          </p>
          {description && (
              <p>
                 <strong>Description : </strong> {description}
              </p>
          )}
      </div>

    );
};

export default ProfileEducation ;