import React from "react";
// import { getUser } from "../Utils/apiConnect";
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    head: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
});

// Map state to props
function mapStateToProps(state) {
    return {
        user: state.user
    }
  }
  // Map functions that use dispatch to props
  function mapDispatchToProps(dispatch) {
    return {
        logout: () => {
            dispatch({ type: 'LOGOUT', payload: {} })
        },
        login: (user) => {
          dispatch({ type: 'LOGIN', payload: user })
      }
    }
  }

class Profile extends React.Component {

    // const { match: { params } } = this.props;

    state = {
        user: {}
    }

    componentDidMount() {
        // const { match: { params } } = this.props;
        // const userId = params.userId;
        // getUser(userId).then(data => {
        //     this.setState({ user: data });
        //     console.log('User recieved from ID is ', data);
        // });
        // TODO: when backend getUser is implemented, uncomment above part
        this.setState({user: this.props.user})
    }

    render() {
        const { classes } = this.props;
        const user = this.state.user;
        return (
            <div >
                <div className={classes.head}>
                    <h2>Profile Page</h2>
                </div>
                {user.imageUrl && <Grid container justify="center" spacing={8}>
                    <Grid item >
                        <img alt="complex" src={user.imageUrl} />
                    </Grid>
                </Grid>}
                <Grid container justify="center" spacing={8}>
                    <Grid item >
                        <Paper>                <TextField
                            id="name-readme"
                            label="Name"
                            value={user.name}
                            defaultValue="Name"
                            InputProps={{
                                readOnly: true,
                                disableUnderline: true,
                            }}
                        />        </Paper>
                    </Grid>
                    <Grid item >
                        <Paper>                                <TextField
                            id="givenName"
                            label="Given Name"
                            value={user.givenName}
                            defaultValue="Given Name"
                            InputProps={{
                                readOnly: true,
                                disableUnderline: true,
                            }}
                        />    </Paper>
                    </Grid>
                    <Grid item >
                        <Paper>                <TextField
                            id="familyName"
                            label="Family Name"
                            value={user.familyName}
                            defaultValue="Family Name"
                            InputProps={{
                                readOnly: true,
                                disableUnderline: true,
                            }}
                        /></Paper>
                    </Grid>
                </Grid>
                <Grid container justify="center" spacing={8}>
                <Grid item xs={2}>
                        <Paper>                <TextField
                            id="emaild-readme"
                            label="Email"
                            value={user.email}
                            defaultValue="Email"
                            InputProps={{
                                readOnly: true,
                                disableUnderline: true,
                            }}
                        />        </Paper>
                    </Grid>
                </Grid>



            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));
