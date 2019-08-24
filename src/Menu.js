import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUpdateSearch } from './actions/simpleAction';
import { searchFilterData } from './selector'

import { styled } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
//import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';

const StyledPaper = styled(Paper)({
    position: 'absolute',
    top: '50px',
    padding: '0 10px',
    width: '250px',
    maxHeight: 'calc(100vh - 50px)',
    right: '0px',
    zIndex: 1,
    overflow: 'scroll'
});

const StyledTextField = styled(TextField)({
  width: '100%'
});

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  };

  simpleAction = (event) => {
    this.props.simpleAction();
  }

  handleSearchText = (e) => {
    this.props.setUpdateSearch(e.target.value);
  }

  // Jump to location on map
  handelJumpToMap = (d) => {
    let map = this.props.app.map
    map.flyTo({ center: d.geometry.coordinates });
  }

  render() {
    
    return(
      <Slide direction="top" in={this.props.app.showMenu} mountOnEnter unmountOnExit>
        <StyledPaper position="fixed">
          <StyledTextField
              id="search-field"
              label="Landmark Name"
              value={this.props.app.search}
              onChange={(e) => {this.handleSearchText(e)}}
              margin="normal"
          />
          <Divider />
          { this.props.filteredData &&
          <List component="nav">
            { this.props.filteredData.map((d, idx) => 
            <ListItem button key={d.properties.name} onClick={ (() => this.handelJumpToMap(d)) }>
              <ListItemText primary={d.properties.name} />
            </ListItem>
            )}
            { this.props.filteredData.length === 0 &&
            <ListItem>
              <ListItemText primary="Could not find landmark." style={{ color: 'grey'}} />
            </ListItem>
            }
          </List>
          
          }

          
        </StyledPaper>
      </Slide>
    )
  }

}

//value={this.state.search}
//https://github.com/uber/react-map-gl/blob/5.0-release/examples/viewport-animation/src/app.js

const mapStateToProps = state => ({
  ...state,
  filteredData: searchFilterData(state)
})

const mapDispatchToProps = dispatch => ({
  setUpdateSearch: (e) => dispatch(setUpdateSearch(e))
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu);