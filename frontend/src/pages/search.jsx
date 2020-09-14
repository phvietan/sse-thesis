import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Menubar from '../components/menubar';
import FileItem from '../components/fileitem';

import '../css/search.css';
import { Button, Input } from '@material-ui/core';
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai";

const { getKeys } = require('../controller/controller_storage');
const { transformWordToNode, getRange } = require('../controller/transformer');
const { initProgram, requestFiles, requestSearch, deleteFile } = require('../controller/protocol');

// Check is node (i, j) left child
function isLeftChild(i, j) {
    return j % 2 === 1;
}

// Get parent of node (i, j)
function getParent(i, j) {
    return {
        px: i+1,
        py: 1 + Math.floor((j-1) / 2),
    };
}

function canMoveUp(i, j, R) {
    const { px, py } = getParent(i, j);
    const parentCover = getRange(px, py);
    return isLeftChild(i, j) && parentCover.R <= R;
}

function findQueryNodes(L, R) {
    let result = [];
    for (let i = L; i <= R; ) {
        let x = 1, y = i;
        while (canMoveUp(x, y, R)) {
            const parent = getParent(x, y);
            x = parent.px;
            y = parent.py;
        }
        result.push({ i: x, j: y });
        i += 1<<(x-1);
    }
    return result;
}

class Search extends Component {
    constructor(props) {
        super(props);
        initProgram();
        const { aesKey, rsaKey1, rsaKey2 } = getKeys();

        this.state = {
            tab: 0,
            files: [],
            error: '',
            status: -1,
            
            searchL: 0,
            searchR: 0,
            searchWord: '',

            aesKey,
            rsaKey1,
            rsaKey2,
        };
    }

    navigatorClick(dir) {
        if (this.state.tab + dir < 0) return;
        if ((this.state.tab+dir)*6 >= this.state.files.length) return;
        const tab = this.state.tab+dir;
        this.setState({ tab });
    }

    async search(w, L, R) {
        const arrNodes = findQueryNodes(L, R);
        const { rsaKey1, rsaKey2, aesKey } = this.state;
        const query = arrNodes.map(node => {
            return {
                ...node,
                t: transformWordToNode(w, node.i, node.j, rsaKey1, rsaKey2, aesKey),
            };
        });
        const response = await requestSearch({ query });
        this.setState({
            error: response.error,
            files: response.result,
            status: response.status,
        });
    }

    async updateFilesState() {
        const response = await requestFiles();
        const { result: files } = response; 
        this.setState({ files });
      }

    async componentDidMount() {
        await this.updateFilesState();
    }

    onChangeSearch(name, e) {
        this.setState({
            [name]: e.target.value,
        });
    }

    async submitSearch() {
        await this.search(this.state.searchWord, parseInt(this.state.searchL), parseInt(this.state.searchR));
    }

    async clickDelete(fileId) {
        await deleteFile({ file_id: fileId });
        await this.updateFilesState();
      }

    render() {
        const currentFiles = this.state.files.slice(this.state.tab*6, this.state.tab*6 + 6);
        console.log(this.state);

        return (
            <div>
                <Menubar
                    history={this.props.history}
                />

                <div id="main-content">
                    <div id="search-box">
                        {/* <h1 className="search-bar">
                            Search
                        </h1> */}

                        <h3 className="search-bar search-word">Word: </h3>
                        <Input className="search-bar" placeholder="search word" onChange={this.onChangeSearch.bind(this, 'searchWord')}></Input>

                        <h3 className="search-bar search-word">From: </h3>
                        <Input className="search-bar input-number" placeholder="2" type="number" onChange={this.onChangeSearch.bind(this, 'searchL')}></Input>

                        <h3 className="search-bar search-word">To: </h3>
                        <Input className="search-bar input-number" placeholder="8" type="number" onChange={this.onChangeSearch.bind(this, 'searchR')}></Input>

                        <Button className="search-bar search-button" onClick={this.submitSearch.bind(this)}>
                            Search
                        </Button>

                        <Button className="search-bar search-button" onClick={this.updateFilesState.bind(this)}>
                            Reset files
                        </Button>
                    </div>
                    
                    <div id="files-content">
                        <Grid container spacing={3}>
                        {currentFiles.map((f,index) => {
                            return (
                            <FileItem
                                history={this.props.history}
                                key={`item-${index}`}
                                fileHash={f.file_hash}
                                fileId={f.file_id}
                                clickDelete={this.clickDelete.bind(this)}
                            />
                            );
                        })}
                        </Grid>
                        <div className="navigator-field">
                            <Button className="navigator-button" onClick={this.navigatorClick.bind(this, -1)}> 
                                <AiFillCaretLeft/>
                            </Button>
                            <Button className="navigator-button" onClick={this.navigatorClick.bind(this, 1)}> 
                                <AiFillCaretRight/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
    );
    }
}

export default Search;