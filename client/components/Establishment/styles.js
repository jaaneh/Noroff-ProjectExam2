module.exports = {
  card: {
    display: 'flex',
    height: 300
  },
  cardContent: {
    position: 'relative',
    paddingBottom: '16px !important',
    width: '100%'
  },
  cardActions: {
    position: 'absolute',
    padding: 16,
    width: '100%',
    bottom: 0,
    left: 0
  },
  cover: {
    minWidth: '35%'
  },
  button: {
    backgroundColor: '#003580',
    color: 'white',
    width: '50%',
    marginLeft: 'auto',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .2)',
    '&:hover': {
      backgroundColor: '#0077CC',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .4)'
    }
  }
};
