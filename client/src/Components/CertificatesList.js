import React from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getCertificates } from "../Utils/apiConnect";
import { connect } from 'react-redux'
import withStyles from "@material-ui/core/styles/withStyles";
import BookIcon from '@material-ui/icons/Book';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
  root: {
    minWidth: 120,
    width: "25%",
    margin: "10px",
    marginLeft: "700px",
    marginRight: "50px"
  },
  full: {
    justifyContent: "center"
  },
  org: {
    marginRight: "50px"
  },
  avatar: {
    marginRight: "5px"
  },
  toprow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  candidate: {
    display: "flex",
    fontSize: 30,
    marginTop: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  heading: {
    margin: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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

class CertificatesList extends React.Component {

  state = {
    // data: [{ candidateName: "Sumaid Syed", certificateId: "12312a", orgName: "GNOME", courseName: "GSoC" },
    // { candidateName: "Rohan Chako", certificateId: "12312a", orgName: "IIITH", courseName: "MS" }],
    data: [],
    user: {}
  }

  componentDidMount() {
    const ownerId = this.props.user.id;
    console.log('User in view certificates is ', this.props.user);
    if (this.props.user.id === undefined){
      return;
    }
    this.setState({ user: this.props.user });
    if (this.props.user.type == 'Org') {
      getCertificates(ownerId, "None").then(data => {
        this.setState({ data: data });
        console.log('DATA recieved is ', data);
      });
    } else {
      getCertificates("None", ownerId).then(data => {
        this.setState({ data: data });
        console.log('STUDENT : owner id is', ownerId);
        console.log('STUDENT : DATA recieved is ', data);
      });
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (state.user !== props.user) {
      if (props.user === {}){
        return;
      }  
      const ownerId = props.user.id;
      if (props.user.type == 'Org'){
        getCertificates(ownerId, null).then(data => {
          return { data: data, user: props.user };
        });  
      } else {
        getCertificates(null, ownerId).then(data => {
          return { data: data, user: props.user };
        });  
      }
    }
  }



  render() {
    const { classes } = this.props;
    return (
      <div className={classes.full}>
        <Typography variant="h4" color="inherit" className={classes.heading} noWrap>List of Certificates</Typography>
        {this.state.data !== undefined && this.state.data.map((val, idx) => (
          <div>
            <Card className={classes.root} variant="outlined" m={5}>
              <CardContent>
                <div className={classes.toprow}>
                  <Avatar className={classes.avatar}><AccountBalanceIcon /></Avatar>
                  <Typography className={classes.org}>                    
                    {val.orgName}
                  </Typography>
                    <Avatar className={classes.avatar}><BookIcon /></Avatar>
                    <Typography
                  >                    {val.courseName}
                  </Typography>
                </div>
                <Typography variant="body2" component="p"  className={classes.candidate}>
                  {val.candidateName}
                  <br />
                </Typography>
              </CardContent>
              <CardActions className={classes.button}>
                <Button size="small" href={`/display/certificate/${val.certificateId}`} target="_blank" >View</Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CertificatesList));

