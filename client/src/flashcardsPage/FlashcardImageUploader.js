import React from 'react';
import Dropzone from 'react-dropzone';

class FlashcardImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      url: '',
      newURL: '',
    };
  }

  onDrop(files) {
    this.setState({ files });

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileAsDataURL = reader.result;
        const newImage = new Image();
        newImage.src = fileAsDataURL;
        newImage.onload = () => {
          const canvas = document.createElement('canvas');

          // set defaults:
          const callback = this.props.onImageLoaded || (urlData => console.log(urlData));
          const MAX_WIDTH = this.props.maxWidth || 200;
          const MAX_HEIGHT = this.props.maxHeight || 250;

          let { width } = newImage;
          let { height } = newImage;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(newImage, 0, 0, width, height);

          const dataURL = canvas.toDataURL('image/png');
          this.setState({ newURL: dataURL });
          callback(dataURL);
        };
        // do whatever you want with the file content
        this.setState({ url: fileAsDataURL });
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsDataURL(file);
    });
  }

  // $(img).load(function() {

  //   canvas = $("#uploading_canvas").get(0);


  //   var MAX_WIDTH = 600;
  //   var MAX_HEIGHT = 450;
  //   var width = img.width;
  //   var height = img.height;

  //   if (width > height) {
  //     if (width > MAX_WIDTH) {
  //       height *= MAX_WIDTH / width;
  //       width = MAX_WIDTH;
  //     }
  //   } else {
  //     if (height > MAX_HEIGHT) {
  //       width *= MAX_HEIGHT / height;
  //       height = MAX_HEIGHT;
  //     }
  //   }

  //   canvas.width = width;
  //   canvas.height = height;
  //   var ctx = canvas.getContext("2d");
  //   ctx.drawImage(img, 0, 0, width, height);

  //   var dataurl = canvas.toDataURL("image/png");

  // });

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone
            onDrop={this.onDrop.bind(this)}
            multiple={false}
            accept="image/*"
          >
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside>
          {/* <div>
            {this.state.url ? <img src={this.state.url} /> : ''}
            <br></br>
            {this.state.newURL ? <img src={this.state.newURL} /> : ''}
          </div> */}
        </aside>
      </section>
    );
  }
}

export default FlashcardImageUploader;
