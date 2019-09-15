const React = require("react");

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            uploading: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    async handleChange(event) {
        if (this.state.file !== null) {
            URL.revokeObjectURL(this.state.file);
        }
        
        // Uncomment this if you wish to preview the image right after selection
        // this.setState({
        //     file: URL.createObjectURL(event.target.files[0]),
        //     uploading: true
        // });

        // Create a FormData to POST to backend
        const files = Array.from(event.target.files);
        const formData = new FormData();
        formData.append("file", files[0]); // key - value

        // Send to Flask
        const response = await fetch(`http://localhost:5000/`, {
            method: 'POST',
            body: formData,
            contentType: false,
            processData: false
        });
        const data = await response.json();
        this.setState({
            file: `data:image/jpeg;base64, ${data['data']}`,
            uploading: true
        });

        // Alternatively, if using send_file(), you can use a FileReader instance to read the blob image
        // .then(blob => {
        //     let reader = new FileReader();
        //     reader.onload = (event) => {
        //         this.setState({
        //             file: event.target.result,
        //             uploading: true
        //         });
        //     }
        //     reader.readAsDataURL(blob);
        // });
        // .then(images => {
        //     this.setState({ 
        //         uploading: false,
        //         images
        //     })
        // })
    }

    render() {
        return (
            <div>
                <input type="file" onChange={this.handleChange} />
                <br />
                { this.state.file && <img src={this.state.file} alt="jeye"/> }
            </div>
        );
    }
}

module.exports = Upload;