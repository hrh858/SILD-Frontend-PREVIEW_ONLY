import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, Theme } from '@material-ui/core/styles';


export const TooltipNAV = withStyles((theme: Theme) => ({
    arrow: {       
        // color: "#4A4A4A",
        "&::before": {
            backgroundColor: '#343a40',
        // border: "2px solid red"
        },
        transitionDuration: "0s !important",
    },
    tooltip: {
    //   backgroundColor: theme.palette.common.black,
    // backgroundColor: theme.palette.common.white,
    //   color: '#343a40',
    //   boxShadow: theme.shadows[1],
    backgroundColor: '#343a40',
    color: theme.palette.common.white,
    fontSize: '15px',
    paddingTop:'7px',
    paddingBottom:'7px',
    paddingRight:'10px',
    paddingLeft:'10px',
    maxWidth:"30rem",
    transitionDuration: "0s !important",
    //   margin:"5px",
    //   border:"2px solid #1d1e1f",
     
    },
    popper:{
        transitionDuration: "0s !important",
    }
  }))(Tooltip);
