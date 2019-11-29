module.exports = theme => ({
  title: {
    fontWeight: 'normal',
    textAlign: 'center',
    padding: '0.8em 0',
    marginTop: -48
  },
  formSpacing: {
    margin: theme.spacing(1)
  },
  submitBtn: {
    backgroundColor: '#003580',
    color: 'white',
    width: '100%',
    marginTop: 10,
    padding: '16px 32px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .2)',
    '&:hover': {
      backgroundColor: '#0077CC',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .4)'
    }
  },
  submitDisabled: {
    backgroundColor: '#ccc !important',
    color: '#888 !important'
  },
  loadingSymbol: {
    color: '#4caf50',
    position: 'absolute',
    margin: '0 auto'
  },
  spacingIn: {
    paddingRight: 5,
    '@media (max-width: 600px)': {
      padding: '0 6px'
    }
  },
  spacingOut: {
    paddingLeft: 5,
    '@media (max-width: 600px)': {
      padding: '0 6px'
    }
  },
  root: {
    padding: '0 !important'
  },
  arrowWrapper: {
    display: 'flex',
    padding: '24px 0 0',
    '&:hover': {
      cursor: 'pointer'
    },
    '&:hover $arrow': {
      transition: '0.3s ease',
      transform: 'translateX(-3px) rotate(180deg)'
    }
  },
  arrow: {
    verticalAlign: 'middle',
    transform: 'rotate(180deg)',
    transition: '0.2s ease'
  },
  goBack: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 3
  }
});
