import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getCertificates } from "../Utils/apiConnect";
import { connect } from 'react-redux'
import withStyles from "@material-ui/core/styles/withStyles";

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
    data: [],
    user: {}
  }

  componentDidMount() {
    const ownerId = this.props.user.id;
    this.setState({user: this.props.user});
    getCertificates(ownerId).then(data => {
      this.setState({ data: data });
      console.log('DATA recieved is ', data);
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (state.user != props.user){
      const ownerId = props.user.id;
      getCertificates(ownerId).then(data => {
        return { data: data, user:props.user };
      });
    }
  }



  render() {
    
    const styles = {
      root: {
        minWidth: 275
      },
      bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)"
      },
      title: {
        fontSize: 14
      },
      pos: {
        marginBottom: 12
      }
    };

    return (
      <div>
        <h1>List of Certificates</h1>
        {this.state.data !== undefined && this.state.data.map((val, idx) => (
          <div>
              <Card className={styles.root} variant="outlined">
              <CardContent>
                <Typography
                  className={styles.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {val.candidateName}
                </Typography>
                <Typography className={styles.pos} color="textSecondary">
                  {val.orgName}
                </Typography>
                <Typography variant="body2" component="p">
                  {val.courseName}
                  <br />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={`/display/certificate/${val.certificateId}`}>View</Button>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CertificatesList);
