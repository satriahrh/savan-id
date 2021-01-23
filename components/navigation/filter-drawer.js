import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import getConfig from "next/dist/next-server/lib/runtime-config";
import {useRouter} from "next/router";
import SearchIcon from "@material-ui/icons/Search";
import {BRAND, CATEGORY, SORT_BY, stringify} from "../../utils/search-filter";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 280,
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  applyButton: {
    margin: theme.spacing(1),
  },
  navSearch: {
    textTransform: 'none',
    fontWeight: 400,
    maxWidth: "100%"
  }
}));

const DEFAULT_SORT_BY = 'popularity'
const DEFAULT_TOGGLE_TEXT = 'Boleh kakak, mau cari apa?'

export default function FilterDrawer({givenFilter}) {
  const classes = useStyles();
  const {publicRuntimeConfig} = getConfig();
  const router = useRouter();

  const [filter, setFilter] = useState({
    q: '',
    page: 1,
    brands: [],
    categories: [],
    sortBy: 'popularity',
    state: 0
  });
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [toggleText, setToggleText] = useState(DEFAULT_TOGGLE_TEXT);

  const handleDrawerToggle = () => {
    setDrawerIsOpen((prevState) => {
      return !prevState;
    })
  };

  const handleApply = () => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: 1,
      state: 1,
    }))
    setOpen(false)
  }

  const setOpen = (value) => {
    setDrawerIsOpen(value)
  }

  useEffect(() => {
    if (givenFilter && filter !== givenFilter) {
      setFilter(givenFilter)
    }
  }, [givenFilter, setFilter]);
  useEffect(() => {
    if (filter.state === 1) {
      router.push({
        pathname: `${publicRuntimeConfig.url.search}`,
        query: filter
      }).then(() => console.log("yes"));
    }

    if (router.pathname === "/search") {
      setToggleText(stringify(filter))
    }
  }, [filter.state]);

  return (
    <>
      <Button
        onClick={handleDrawerToggle}
        className={classes.navSearch}
        variant='outlined'
      >
        <SearchIcon/><Typography noWrap>{toggleText}</Typography>
      </Button>
      <SwipeableDrawer
        anchor='right'
        onClose={() => {
          setOpen(false)
        }}
        onOpen={() => {
          setOpen(true)
        }}
        open={drawerIsOpen}
      >
        <div className={classes.drawer}>
          <List className={classes.root}>
            <ListItem>
              <ListItemText>
                <Typography variant='h5'>
                  Mau cari apa kak?
                </Typography>
              </ListItemText>
            </ListItem>
            <ListOfCheckbox
              title='Brand'
              selections={BRAND}
              filter={filter}
              setFilter={setFilter}
              filterKey={'brands'}
            />
            <ListOfCheckbox
              title='Kategori'
              selections={CATEGORY}
              filter={filter}
              setFilter={setFilter}
              filterKey={'categories'}
            />
            <ListOfRadio
              title='Urutkan dari'
              selections={SORT_BY}
              filter={filter}
              setFilter={setFilter}
              filterKey={'sortBy'}
            />
            <Button
              className={classes.applyButton}
              variant='outlined'
              onClick={handleApply}
            >
              Cari dengan filter
            </Button>
          </List>
        </div>
      </SwipeableDrawer>
    </>
  );
}

function ListOfCheckbox({title, selections, filter, setFilter, filterKey}) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  }

  const selected = filter[filterKey]
  const handleToggle = (value) => () => {
    const currentIndex = selected.indexOf(value);
    const newSelected = [...selected];
    if (currentIndex === -1) {
      newSelected.push(value);
    } else {
      newSelected.splice(currentIndex, 1);
    }
    setFilter((prevFilter) => ({
      ...prevFilter,
      [filterKey]: newSelected,
    }))
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={title}/>
        {open ? <ExpandLess/> : <ExpandMore/>}
      </ListItem>
      <Collapse in={open} unmountOnExit>
        <List disablePadding>
          {Object.entries(selections).map(([key, value]) => {
            const labelId = `checkbox-list-${title}-label-${key}`;
            return (
              <ListItem
                className={classes.nested} key={key} role={undefined} dense button
                onClick={handleToggle(key)}
              >
                <Checkbox
                  edge="start" checked={selected.indexOf(key) !== -1}
                  tabIndex={-1} disableRipple inputProps={{'aria-labelledby': labelId}}
                />
                <ListItemText id={labelId} primary={value}/>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
      <Divider/>
    </>
  )
}

function ListOfRadio({title, selections, filter, setFilter, filterKey}) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  }

  const selected = filter[filterKey]
  const handleToggle = (value) => () => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [filterKey]: value,
    }))
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={title}/>
        {open ? <ExpandLess/> : <ExpandMore/>}
      </ListItem>
      <Collapse in={open} unmountOnExit>
        <List disablePadding>
          {Object.entries(selections).map(([key, value]) => {
            const labelId = `checkbox-list-${title}-label-${key}`;
            return (
              <ListItem
                className={classes.nested} key={key} role={undefined} dense button
                onClick={handleToggle(key)}
              >
                <Radio
                  edge="start" checked={selected === key}
                  tabIndex={-1} disableRipple inputProps={{'aria-labelledby': labelId}}
                />
                <ListItemText id={labelId} primary={value}/>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
      <Divider/>
    </>
  )
}