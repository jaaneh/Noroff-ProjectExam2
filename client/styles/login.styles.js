module.exports = {
  title: {
    fontWeight: 'normal',
    textAlign: 'center',
    padding: '0.8em 0 0.5em'
  },
  spacing: {
    margin: 8
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
  }
};
