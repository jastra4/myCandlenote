import React from 'react';
import Dropzone from 'react-dropzone';
import { Button } from 'semantic-ui-react';

const styles = {
  dropzoneDefault: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red !important',
  },
  dropzoneActive: { border: '2px dashed grey' },
};

class FlashcardImageUploader extends React.Component {
  constructor(props) {
    super(props);

    this.dropRef = null;

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

  onUploadButtonClick() {
    this.dropRef.open();
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone
            style={styles.dropzoneDefault}
            activeStyle={styles.dropzoneActive}
            disableClick={true}
            onDrop={this.onDrop.bind(this)}
            multiple={false}
            accept="image/*"
            ref={(dropRef) => { this.dropRef = dropRef; }}
          >
            {this.props.children}
          </Dropzone>
          <Button type="button" onClick={this.onUploadButtonClick.bind(this)}>Upload Image</Button>
        </div>
      </section>
    );
  }
}

export default FlashcardImageUploader;
