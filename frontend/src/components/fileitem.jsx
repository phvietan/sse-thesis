import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import '../css/fileitem.css';

export default class FileItem extends Component {
    clickView() {
        this.props.history.push(`/view/${this.props.fileHash}`);
    }

    clickDelete() {
        this.props.clickDelete(this.props.fileId);
    }

    render() {
        const { fileHash, fileId } = this.props;

        return (
            <Grid item xs={2} className="file-item">
                <div className="container">
                    <img src="/file-icon.png" className="file-icon">
                        
                    </img>
                    <div className="image-button">
                        <Button className="delete-button" onClick={this.clickDelete.bind(this)}>Delete</Button>
                        <br/>
                        <Button className="view-button" onClick={this.clickView.bind(this)}>View</Button>
                    </div>
                </div>
                <p className="file-id">{`id = ${fileId}`}</p>
                <p>{fileHash}</p>
            </Grid>
        );
    }
}
