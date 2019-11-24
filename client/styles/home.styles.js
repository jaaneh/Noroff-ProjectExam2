module.exports = theme => ({
  hero: {
    backgroundSize: 'cover',
    objectFit: 'cover',
    transform: 'translate(0, -20px)',
    minHeight: 700,
    height: 'auto',
    width: '100%',
    color: '#fff'
  },
  heroWrapper: {
    position: 'absolute',
    color: 'white',
    top: '14%',
    left: '50%',
    width: '100%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    '@media (max-width: 1600px)': {
      top: '15%'
    },
    '@media (max-width: 960px)': {
      top: '12%'
    },
    '@media (max-width: 500px)': {
      top: '10%'
    },
    '@media (max-width: 400px)': {
      top: '9%'
    }
  },
  discover: {
    letterSpacing: 4,
    fontSize: '16px',
    '@media (max-width: 800px)': {
      fontSize: '14px'
    }
  },
  title: {
    transform: 'translate(0, -50px)',
    margin: '-15px 0 -5px',
    fontSize: '12rem',
    fontFamily: '"Lakeshore", "Helvetica", "Arial", sans-serif',
    '@media (max-width: 1600px)': {
      fontSize: '11rem'
    },
    '@media (max-width: 800px)': {
      fontSize: '10rem',
      margin: '10px 0 -10px'
    },
    '@media (max-width: 700px)': {
      fontSize: '9rem'
    },
    '@media (max-width: 600px)': {
      fontSize: '8rem'
    },
    '@media (max-width: 550px)': {
      fontSize: '7rem',
      margin: '20px 0 -15px',
      textShadow: '0 0 10px #00000080'
    },
    '@media (max-width: 450px)': {
      fontSize: '5.5rem'
    },
    '@media (max-width: 350px)': {
      fontSize: '4.5rem',
      margin: '30px 0 -15px'
    }
  },
  handpicked: {
    letterSpacing: 3,
    fontSize: '2rem',
    textAlign: 'center',
    margin: '5px 0 30px',
    color: theme.palette.primary.main,
    textDecoration: 'underline #FEBA02',
    textUnderlinePosition: 'under',
    '@media (max-width: 650px)': {
      fontSize: '1.75rem'
    }
  },
  search: {
    position: 'relative',
    borderRadius: '5px',
    backgroundColor: 'white',
    width: '40%',
    margin: '0 auto',
    border: '3px solid #FEBA02',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: '#fbfbfb'
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'gray'
  },
  textField: {
    marginTop: 0,
    marginBottom: 0
  },
  noBorder: {
    border: 0
  },
  autocomplete: {
    position: 'relative',
    borderRadius: '5px',
    backgroundColor: 'white',
    width: '40%',
    margin: '0 auto',
    border: '3px solid #FEBA02',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: '#fbfbfb'
    },
    '@media (max-width: 1600px)': {
      width: '45%'
    },
    '@media (max-width: 1400px)': {
      width: '52%'
    },
    '@media (max-width: 1200px)': {
      width: '60%'
    },
    '@media (max-width: 1000px)': {
      width: '70%'
    },
    '@media (max-width: 800px)': {
      width: '80%'
    }
  },
  positionStart: {
    marginLeft: 8
  }
});
