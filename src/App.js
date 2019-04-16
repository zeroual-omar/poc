import React ,{ Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import classnames from 'classnames';
import Collapse from '@material-ui/core/Collapse';


const styles = {
    card: {
        minWidth: 100,
        maxWidth: '50%',
        margin:'7% auto'
    },
    actions: {
        justifyContent:'flex-end'

    },
    cardContent : {
        display: 'flex',
        justifyContent: 'space-around'
    },
    title: {
        fontSize: 14,
    }
};



class App extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            startDate: '2019-05-24',
            endDate: '2019-05-24',
            diffDays:null,
            expanded:false

        }
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    handleChange(e) {
        switch (e.target.name){
            case 'startDate' : this.setState({ startDate : e.target.value }); break;

            case 'endDate' : this.setState({ endDate : e.target.value }); break;


        }
    }

    daysCalculation() {

        var diff = Math.abs(new Date(this.state.startDate).getTime() - new Date(this.state.endDate).getTime());
        var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
        this.setState(state => ({numberOfDays  : diffDays ,
                                  expanded: !state.expanded }));
        console.log(diffDays);
    }

    render() {
        return (
            <Card className={this.props.classes.card}>
              <CardContent  className={this.props.classes.cardContent} >
                <TextField
                    label="First day date"
                    name="startDate"
                    type="date"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.startDate}
                    className={this.props.classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    label="Second day date"
                    name="endDate"
                    onChange={(e) => this.handleChange(e)}
                    type="date"
                    value={this.state.endDate}
                    className={this.props.classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />


              </CardContent>
              <CardActions className={this.props.classes.actions}>
                <Button       className={classnames(this.props.classes.expand, {
                    [this.props.classes.expandOpen]: this.state.expanded,
                })}  aria-expanded={this.state.expanded} aria-label="Show more" size="small" color="primary" onClick={() => this.daysCalculation()} >find out days number between two dates</Button>
              </CardActions>
              <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  days number between the two filled dates : {this.state.numberOfDays}
                </CardContent>
              </Collapse>

            </Card>
        );
    }

}
App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);

