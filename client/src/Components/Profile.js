import React from "react";
import { getUser } from "../Utils/apiConnect";
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
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    indicator: {
        color: theme.palette.text.secondary,
        fontSize: 12
    },
    namebox: {
        width: "200px",
        height: "50px"
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

    state = {
        user: {}
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const userId = params.userId;
        var user = {};
        getUser(userId).then(data => {
            user = data[0];
            user.id = user.userId;
            this.setState({ user: user });
            console.log('User recieved from ID is ', user);
        });
    }

    render() {
        const { classes } = this.props;
        const user = this.state.user;
        return (
            <div >
                <br />
                <Typography variant="h4" color="inherit" className={classes.head} noWrap>Profile Page</Typography>
                <br />
                {user.imageUrl && <Grid container justify="center" spacing={8}>
                    <Grid item >
                        <img alt="complex" src={user.imageUrl} />
                    </Grid>
                </Grid>}
                <Grid container justify="center" spacing={8}>
                    <Grid item>
                        <Paper className={classes.namebox}>
                            <Typography variant="body2" component="p" className={classes.indicator}>
                                Name
                        </Typography>
                            <Typography variant="body2" component="p" className={classes.head}>
                                {user.name}
                        </Typography>
                        </Paper>
                    </Grid>
                    {user.type === 'Student' && <Grid item >
                        <Paper className={classes.namebox}>
                            <Typography variant="body2" component="p" className={classes.indicator}>
                                Given Name
                        </Typography>
                            <Typography variant="body2" component="p" className={classes.head}>
                                {user.givenName}
                        </Typography>
                        </Paper>
                    </Grid>}
                    {user.type === 'Student' && <Grid item >
                        <Paper className={classes.namebox}>
                            <Typography variant="body2" component="p" className={classes.indicator}>
                                Family Name
                        </Typography>
                            <Typography variant="body2" component="p" className={classes.head}>
                            {user.familyName}
                        </Typography>
                        </Paper>
                    </Grid>}
                </Grid>
                <Grid container justify="center" spacing={8}>
                    <Grid item>
                        <Paper className={classes.namebox}>
                            <Typography variant="body2" component="p" className={classes.indicator}>
                                Email
                        </Typography>
                            <Typography variant="body2" component="p" className={classes.head}>
                            {user.email}
                        </Typography>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper className={classes.namebox}>
                            <Typography variant="body2" component="p" className={classes.indicator}>
                                Type
                        </Typography>
                            <Typography variant="body2" component="p" className={classes.head}>
                                {user.type}
                        </Typography>
                        </Paper>
                    </Grid>
                </Grid>



            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));
