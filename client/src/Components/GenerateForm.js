import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SubmitAnimation from "./SubmitAnimation";
import { generateCertificate } from "../Utils/apiConnect";
// import { generateCertificate, getStudents } from "../Utils/apiConnect";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux'

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

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up("sm")]: { width: 250 },
    [theme.breakpoints.down("sm")]: { width: 200 }
  },
  dropdown: {
    marginLeft: theme.spacing.unit*15,
    marginRight: theme.spacing.unit*15,
    [theme.breakpoints.up("sm")]: { width: 250 },
    [theme.breakpoints.down("sm")]: { width: 200 }
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  paper: {
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing.unit,
      padding: `${theme.spacing.unit * 2}px`
    },
    minHeight: "75vh",
    maxWidth: "95%",
    margin: theme.spacing.unit * 5,
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 8}px ${theme
      .spacing.unit * 3}px`
  },
  rightpaper: {
    [theme.breakpoints.up("sm")]: {
      maxHeight: "75vh"
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "95%",
      margin: theme.spacing.unit * 2
    },
    maxWidth: "60%",
    minWidth: "60%",
    margin: theme.spacing.unit * 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  verificationBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
    height: "100%",
    marginTop: theme.spacing.unit * 3
  },
  courseField: {
    [theme.breakpoints.up("sm")]: {
      width: "60%"
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "80vw"
    }
  },
  submitBtn: {
    marginLeft: "50px"
  }
});

class GenerateForm extends React.Component {

  state = {
    firstname: "",
    lastname: "",
    organization: "FossAsia",
    orgLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/FOSSASIA_Logo.svg/600px-FOSSASIA_Logo.svg.png",
    coursename: "",
    assignedOn: null,
    duration: 0,
    currentState: "normal",
    emailId: "",
    user: {},
    student: {},
    students: [{name: 'Sumaid'}, {name: 'Rohan'}]
  };

  componentDidMount() {
    // getStudents().then(data => {
    //   this.setState({students: data})
    //   console.log('Students recieved is ', data);
    // });  
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  submitData = event => {
    event.preventDefault();
    if (this.state.currentState === "validate") {
      return;
    }
    this.setState({ currentState: "load" });
    const {
      student,
      organization,
      coursename,
      assignedOn,
      duration,
      emailId
    } = this.state;
    let candidateName = `${student.givenName} ${student.familyName}`;
    let assignDate = new Date(assignedOn).getTime();
    generateCertificate(
      this.props.user.id,
      student.id,
      candidateName,
      coursename,
      organization,
      assignDate,
      parseInt(duration),
      student.email
    )
      .then(data => {
        if (data.data !== undefined)
          this.setState({
            currentState: "validate",
            certificateId: data.data.certificateId
          });
      })
      .catch(err => console.log(err));
  };

  changeStudent = (event) => {
      this.setState({student: event.target.value});
  }

  render() {
    const { classes } = this.props;
    console.log('USER in generate form is', this.state.user);
    const {
      firstname,
      lastname,
      organization,
      coursename,
      duration,
      currentState,
      orgLogo,
      emailId,
      certificateId
    } = this.state;
    return (
      <Grid container>
        <Grid item xs={12} sm={8}>
          <Paper className={classes.paper}>
            <Typography variant="h3" color="inherit">
            Certificate Generation Form
            </Typography>
            <form
              className={classes.container}
              autoComplete="off"
              onSubmit={this.submitData}
            >
              <Grid item xs={16} m={16}>
                <br/>
                <FormControl className={(classes.dropdown)}>
                  <InputLabel id="demo-simple-select-helper-label">Student</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={this.state.student}
                    onChange={this.changeStudent}
                  >
                    {this.state.students.map((stud, index) =>
            <MenuItem key={stud.name} value={stud}>{stud.name}</MenuItem>
          )}
                  </Select>
                  <FormHelperText>Select student to certify</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="organization"
                  label="Organization"
                  className={classes.textField}
                  defaultValue={organization}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    readOnly: true
                  }}
                />
                <TextField
                  required
                  id="certified-for"
                  label="Certified For"
                  helperText="Any course name or skill for which the certificate is being given."
                  placeholder="Degree, skill or award.."
                  className={(classes.courseField, classes.textField)}
                  defaultValue={coursename}
                  onChange={this.handleChange("coursename")}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="assigned-date"
                  label="Assigned Date"
                  type="date"
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange("assignedOn")}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  required
                  id="duration"
                  label="Duration"
                  helperText="Duration to be provided in years"
                  value={duration}
                  onChange={this.handleChange("duration")}
                  type="number"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <SubmitAnimation
                  currentState={currentState}
                  className={classes.submitBtn}
                />
                {currentState === "validate" && (
                  <Typography
                    variant="caption"
                    color="inherit"
                    className={classes.submitBtn}
                  >
                    Certificate genrated with id {certificateId}
                  </Typography>
                )}
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.rightpaper}>
            <div style={{ maxWidth: "90%" }}>
              <img src={orgLogo} alt="org-logo" style={{ maxWidth: "100%" }} />
            </div>
            <div>
              <Typography variant="h5" color="inherit" noWrap>
                {organization}
              </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

GenerateForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(GenerateForm));
