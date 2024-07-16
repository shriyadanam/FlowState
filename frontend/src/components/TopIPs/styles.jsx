import { height } from "@mui/system";

export const styles = {
    container: {
      maxWidth: '400px',
      minWidth: '200px',
      height: '355px',
      margin: 'auto',
      backgroundColor: '#2B2B2B',
      borderRadius: '8px',
      padding: '20px',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    header: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '20px',
      marginBottom: '20px',
      width: '140px'
    },
    listsContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
    listSection: {
      flex: 1,
      margin: '0 10px',
    },
    list: {
      listStyleType: 'none',  // Removed list numbers
      paddingLeft: '0',  // No padding needed
    },
    listItem: {
      color: '#8AD8FF',
      marginBottom: '5px',
      padding: '10px',
      backgroundColor: '#1C1C1C',
      borderRadius: '4px',
    },
    listItemEven: {
      backgroundColor: '#2B2B2B',
    },
  };