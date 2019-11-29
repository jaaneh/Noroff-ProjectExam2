module.exports = {
  arrowWrapper: {
    marginTop: 12,
    marginLeft: -3,
    '&:hover': {
      cursor: 'pointer'
    },
    '&:hover $arrow': {
      transition: '0.3s ease',
      transform: 'translateX(-3px) rotate(180deg)'
    }
  },
  arrow: {
    fontSize: 26,
    verticalAlign: 'middle',
    transform: 'rotate(180deg)',
    transition: '0.2s ease'
  },
  goBack: {
    fontSize: 16,
    verticalAlign: 'middle',
    paddingLeft: 3
  }
};
