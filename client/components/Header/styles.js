module.exports = theme => ({
  headerLink: {
    fontSize: '0.85rem',
    padding: '5px 15px'
  },
  headerButton: {
    fontSize: '0.85rem',
    padding: '4px 20px',
    marginLeft: 10,
    backgroundColor: '#009fe3',
    '&:hover': {
      backgroundColor: '#0077cc'
    }
  },
  avatar: {
    margin: 10
  },
  name: {
    marginLeft: '15px',
    lineHeight: 1.5,
    '@media (max-width: 700px)': {
      display: 'none'
    }
  },
  logo: {
    width: 150,
    marginRight: 15,
    verticalAlign: 'middle',
    '@media (max-width: 600px)': {
      marginLeft: 5
    }
  },
  logoWrapper: {
    flex: 1
  },
  mobileIconButton: {
    padding: theme.spacing(2)
  },
  mobileMenuIcon: {
    fontSize: '2rem'
  },
  mobileListItem: {
    margin: '12px 16px'
  }
});
