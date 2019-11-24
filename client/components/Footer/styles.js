module.exports = theme => ({
  footer: {
    background: theme.palette.primary.main,
    color: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  social: {
    margin: 3
  },
  logoWrapper: {
    flex: 1
  },
  logo: {
    width: 150,
    marginRight: 15,
    verticalAlign: 'middle'
  }
});
