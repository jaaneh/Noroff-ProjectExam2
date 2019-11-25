module.exports = {
  card: {
    display: 'flex'
  },
  cardContent: {
    paddingBottom: '16px !important',
    width: '100%'
  },
  cardActions: {
    padding: '32px 0 0'
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
    },
    '@media (max-width: 420px)': {
      width: '100%'
    }
  }
};
