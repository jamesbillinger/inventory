import { white, darkBlack, fullBlack } from "material-ui/styles/colors";
import { fade } from "material-ui/utils/colorManipulator";
import * as Spacing from "material-ui/styles/spacing";

export default {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  fontWeight: '300',
  palette: {
    primary1Color: '#8BC34A',//'#FF4081',
    primary2Color: '#689F38',
    primary3Color: '#DCEDC8',
    accent1Color: '#795548',//'#00305C',
    accent2Color: '#857e6b',
    accent3Color: '#857e6b',
    textColor: '#212121',
    alternateTextColor: '#757575',
    canvasColor: white,
    borderColor: '#BDBDBD',
    disabledColor: '#ddd',
    pickerHeaderColor:'#E9FAD5',
    clockCircleColor:fade(darkBlack,0.07),
    shadowColor:fullBlack
  }
};