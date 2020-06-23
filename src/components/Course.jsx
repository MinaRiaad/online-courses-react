import React from 'react';
import NotFound from './common/notFound'

const Course = (props) => {
    const course = props.location.state;
    const createdAt=new Date(course.createdAt).toLocaleDateString();
    if(!course)
        return(<NotFound></NotFound>)
    return ( 
    <div class="container">
      <div class="row">
        <div class="col-lg-8">
          <h1 class="mt-4">Post Title</h1>
          <h5>Points <span class="badge badge-info">{course.points}</span></h5>
          <hr />
          <p>{`Uploaded on ${createdAt}`}</p>
          <hr />
          {course.media.map(img=>
            <React.Fragment>
            {img.split('.').pop()==="mp4" &&
            <div>
                <video width="800" controls>
                    <source src={`media/${img}`} type="video/mp4"/>
                </video>
                <hr/>
            </div>
            }
            {img.split('.').pop()==="jpg"&&
            <div>
                <img className="img-fluid rounded" width="80%" src={img ? `media/${img}`:"http://placehold.it/700x400"} alt="First slide"/>
                <hr/>
            </div>}
            {img.split('.').pop()==="png"&&
            <div>
                <img className="img-fluid rounded" width="80%" src={img ? `media/${img}`:"http://placehold.it/700x400"} alt="First slide"/>
                <hr/>
            </div>}
            {img.split('.').pop()==="jpeg"&&
            <div>
                <img className="img-fluid rounded" width="80%" src={img ? `media/${img}`:"http://placehold.it/700x400"} alt="First slide"/>
                <hr/>
            </div>}
            </React.Fragment>
          )}
          <blockquote class="blockquote">
            <p class="mb-0">
              {course.description}
            </p>
          </blockquote>
          <hr />
        </div>
        <div class="col-md-4">
          <div class="card my-4">
            <h5 class="card-header">Categories</h5>
            <div class="card-body">
              <div class="row">
                <div class="col-lg-6">
                  <ul class="list-unstyled mb-0">
                    <li>
                        {course.categories.map(category=>
                            <h5><span class="badge badge-warning">{category.name}</span></h5>
                        )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}
 
export default Course;